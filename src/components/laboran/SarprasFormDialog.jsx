import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { ROOM_CATEGORIES, STATUS_OPTIONS } from '../../constants/sarprasConstants';

const SarprasFormDialog = ({
  isOpen,
  mode = 'add', // 'add' | 'edit'
  initialData = null,
  onClose,
  onSubmit,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'Ruang kelas',
    facilities: '',
    building: 'Gedung Utama',
    floor: 7,
    capacity: 40,
    status: 'tersedia'
  });

  const [errors, setErrors] = useState({});

  // Dropdown open states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const categoryRef = useRef(null);
  const statusRef = useRef(null);
  const dialogRef = useRef(null);

  // Prevent background scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData({
          code: initialData.code || '',
          name: initialData.name || '',
          category: initialData.category || 'Ruang kelas',
          facilities: initialData.facilities || '',
          building: initialData.building || 'Gedung Utama',
          floor: initialData.floor ?? 7,
          capacity: initialData.capacity ?? 40,
          status: initialData.status || 'tersedia'
        });
      } else {
        setFormData({
          code: '',
          name: '',
          category: 'Ruang kelas',
          facilities: '',
          building: 'Gedung Utama',
          floor: '',
          capacity: '',
          status: 'tersedia'
        });
      }
      setErrors({});
      setIsCategoryOpen(false);
      setIsStatusOpen(false);
    }
  }, [isOpen, mode, initialData]);

  // Click outside to close dropdowns or dialog
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setIsStatusOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isCategoryOpen) {
          setIsCategoryOpen(false);
        } else if (isStatusOpen) {
          setIsStatusOpen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isCategoryOpen, isStatusOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.code || !formData.code.trim()) {
      newErrors.code = 'Kode ruang wajib diisi.';
    }

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Nama ruang wajib diisi.';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori wajib dipilih.';
    }

    if (!formData.building || !formData.building.trim()) {
      newErrors.building = 'Gedung wajib diisi.';
    }

    const floorNum = Number(formData.floor);
    if (formData.floor === '' || isNaN(floorNum) || floorNum <= 0 || !Number.isInteger(floorNum)) {
      newErrors.floor = 'Lantai harus berupa bilangan bulat positif.';
    }

    const capNum = Number(formData.capacity);
    if (formData.capacity === '' || isNaN(capNum) || capNum <= 0 || !Number.isInteger(capNum)) {
      newErrors.capacity = 'Kapasitas harus berupa bilangan bulat positif.';
    }

    if (!formData.status) {
      newErrors.status = 'Status ruang wajib dipilih.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData, setErrors);
  };

  const currentStatusObj = STATUS_OPTIONS.find((s) => s.value === formData.status) || STATUS_OPTIONS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-deep/60 backdrop-blur-[1px] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sarpras-dialog-title"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[480px] max-h-[92vh] bg-white rounded-[16px] shadow-2xl relative animate-scale-up text-ink flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-3.5 border-b border-line shrink-0">
          <h2 id="sarpras-dialog-title" className="text-[19px] font-bold text-navy leading-tight">
            {mode === 'edit' ? 'Ubah data' : 'Tambah data'}
          </h2>
        </div>

        {/* Scrollable Form Body */}
        <form
          id="sarpras-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5"
        >
          {/* Global submit error */}
          {errors.general && (
            <div className="p-3 bg-danger/10 border border-danger/30 rounded-[10px] text-danger text-[13px] font-semibold">
              {errors.general}
            </div>
          )}

          {/* 1. Kode ruang */}
          <div>
            <label htmlFor="code" className="block text-[12px] sm:text-[13px] font-bold text-ink mb-1">
              Kode ruang
            </label>
            <input
              id="code"
              name="code"
              type="text"
              value={formData.code}
              onChange={handleChange}
              placeholder="Contoh: GU 701"
              className={`w-full h-[40px] bg-white border rounded-[9px] px-3.5 text-[13px] sm:text-[14px] text-ink focus:outline-none focus:ring-2 transition-all ${
                errors.code
                  ? 'border-danger focus:ring-danger/20'
                  : 'border-line focus:border-royal-blue focus:ring-royal-blue/20'
              }`}
            />
            {errors.code && (
              <p className="mt-1 text-[11px] text-danger font-medium">{errors.code}</p>
            )}
          </div>

          {/* 2. Nama ruang */}
          <div>
            <label htmlFor="name" className="block text-[12px] sm:text-[13px] font-bold text-ink mb-1">
              Nama ruang
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Ruang GU 701"
              className={`w-full h-[40px] bg-white border rounded-[9px] px-3.5 text-[13px] sm:text-[14px] text-ink focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-danger focus:ring-danger/20'
                  : 'border-line focus:border-royal-blue focus:ring-royal-blue/20'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-[11px] text-danger font-medium">{errors.name}</p>
            )}
          </div>

          {/* 3. Kategori (Dropdown) */}
          <div className="relative" ref={categoryRef}>
            <label className="block text-[12px] sm:text-[13px] font-bold text-ink mb-1">
              Kategori
            </label>
            <button
              type="button"
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsStatusOpen(false);
              }}
              className={`w-full h-[40px] bg-white border rounded-[9px] px-3.5 flex items-center justify-between text-[13px] sm:text-[14px] text-ink focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                isCategoryOpen
                  ? 'border-royal-blue ring-2 ring-royal-blue/20'
                  : 'border-line hover:border-slate/40'
              }`}
              aria-haspopup="listbox"
              aria-expanded={isCategoryOpen}
            >
              <span className="font-medium">{formData.category}</span>
              <ChevronDown
                size={16}
                className={`text-slate transition-transform duration-200 ${
                  isCategoryOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isCategoryOpen && (
              <div
                className="absolute left-0 mt-1.5 w-full bg-white border border-line rounded-[12px] p-1.5 shadow-xl z-20 animate-fade-in space-y-1"
                role="listbox"
              >
                {ROOM_CATEGORIES.map((cat) => {
                  const isSelected = formData.category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, category: cat }));
                        setIsCategoryOpen(false);
                        if (errors.category) {
                          setErrors((prev) => ({ ...prev, category: '' }));
                        }
                      }}
                      className={`w-full text-left px-3.5 py-2 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-tint text-royal-blue border border-royal-blue/50'
                          : 'text-ink hover:bg-slate/5'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
            {errors.category && (
              <p className="mt-1 text-[11px] text-danger font-medium">{errors.category}</p>
            )}
          </div>

          {/* 4. Fasilitas (opsional) */}
          <div>
            <label htmlFor="facilities" className="block text-[12px] sm:text-[13px] font-bold text-ink mb-1">
              Fasilitas
            </label>
            <input
              id="facilities"
              name="facilities"
              type="text"
              value={formData.facilities}
              onChange={handleChange}
              placeholder="Contoh: Proyektor, AC, papan tulis"
              className="w-full h-[40px] bg-white border border-line rounded-[9px] px-3.5 text-[13px] sm:text-[14px] text-ink focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 transition-all"
            />
          </div>

          {/* 5. Gedung & Lantai (Satu Baris) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="building" className="block text-[12px] sm:text-[13px] font-bold text-ink mb-1">
                Gedung
              </label>
              <input
                id="building"
                name="building"
                type="text"
                value={formData.building}
                onChange={handleChange}
                placeholder="Contoh: Gedung Utama"
                className={`w-full h-[40px] bg-white border rounded-[9px] px-3.5 text-[13px] sm:text-[14px] text-ink focus:outline-none focus:ring-2 transition-all ${
                  errors.building
                    ? 'border-danger focus:ring-danger/20'
                    : 'border-line focus:border-royal-blue focus:ring-royal-blue/20'
                }`}
              />
              {errors.building && (
                <p className="mt-1 text-[11px] text-danger font-medium">{errors.building}</p>
              )}
            </div>

            <div>
              <label htmlFor="floor" className="block text-[12px] sm:text-[13px] font-bold text-ink mb-1">
                Lantai
              </label>
              <input
                id="floor"
                name="floor"
                type="number"
                min="1"
                step="1"
                value={formData.floor}
                onChange={handleChange}
                placeholder="7"
                className={`w-full h-[40px] bg-white border rounded-[9px] px-3.5 text-[13px] sm:text-[14px] text-ink focus:outline-none focus:ring-2 transition-all ${
                  errors.floor
                    ? 'border-danger focus:ring-danger/20'
                    : 'border-line focus:border-royal-blue focus:ring-royal-blue/20'
                }`}
              />
              {errors.floor && (
                <p className="mt-1 text-[11px] text-danger font-medium">{errors.floor}</p>
              )}
            </div>
          </div>

          {/* 6. Kapasitas */}
          <div>
            <label htmlFor="capacity" className="block text-[12px] sm:text-[13px] font-bold text-ink mb-1">
              Kapasitas
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              step="1"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="40"
              className={`w-full h-[40px] bg-white border rounded-[9px] px-3.5 text-[13px] sm:text-[14px] text-ink focus:outline-none focus:ring-2 transition-all ${
                errors.capacity
                  ? 'border-danger focus:ring-danger/20'
                  : 'border-line focus:border-royal-blue focus:ring-royal-blue/20'
              }`}
            />
            {errors.capacity && (
              <p className="mt-1 text-[11px] text-danger font-medium">{errors.capacity}</p>
            )}
          </div>

          {/* 7. Status (Dropdown dengan titik warna) */}
          <div className="relative" ref={statusRef}>
            <label className="block text-[12px] sm:text-[13px] font-bold text-ink mb-1">
              Status
            </label>
            <button
              type="button"
              onClick={() => {
                setIsStatusOpen(!isStatusOpen);
                setIsCategoryOpen(false);
              }}
              className={`w-full h-[40px] bg-white border rounded-[9px] px-3.5 flex items-center justify-between text-[13px] sm:text-[14px] text-ink focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                isStatusOpen
                  ? 'border-royal-blue ring-2 ring-royal-blue/20'
                  : 'border-line hover:border-slate/40'
              }`}
              aria-haspopup="listbox"
              aria-expanded={isStatusOpen}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: currentStatusObj.dotColor }}
                />
                <span className="font-medium">{currentStatusObj.label}</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate transition-transform duration-200 ${
                  isStatusOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isStatusOpen && (
              <div
                className="absolute left-0 mt-1.5 w-full bg-white border border-line rounded-[12px] p-1.5 shadow-xl z-20 animate-fade-in space-y-1"
                role="listbox"
              >
                {STATUS_OPTIONS.map((st) => {
                  const isSelected = formData.status === st.value;
                  return (
                    <button
                      key={st.value}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, status: st.value }));
                        setIsStatusOpen(false);
                        if (errors.status) {
                          setErrors((prev) => ({ ...prev, status: '' }));
                        }
                      }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-tint text-royal-blue border border-royal-blue/50'
                          : 'text-ink hover:bg-slate/5'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: st.dotColor }}
                      />
                      <span>{st.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {errors.status && (
              <p className="mt-1 text-[11px] text-danger font-medium">{errors.status}</p>
            )}
          </div>
        </form>

        {/* Modal Footer (Sticky at bottom of dialog) */}
        <div className="px-6 py-3.5 border-t border-line flex items-center justify-end gap-3 shrink-0 bg-white rounded-b-[16px]">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-[40px] px-5 border border-line rounded-[10px] text-ink font-semibold text-[13px] sm:text-[14px] bg-white hover:bg-slate/5 active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue"
          >
            Batal
          </button>
          <button
            type="submit"
            form="sarpras-form"
            disabled={isSubmitting}
            className="h-[40px] px-6 bg-amber hover:bg-[#FFBA3D] active:scale-[0.98] text-amber-ink font-bold text-[13px] sm:text-[14px] rounded-[10px] transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-amber disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin text-amber-ink" />}
            <span>Simpan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SarprasFormDialog;
