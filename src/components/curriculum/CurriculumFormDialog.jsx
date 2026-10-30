import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const SEMESTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const CurriculumFormDialog = ({
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
    semester: 3,
    sks: 2
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData({
          code: initialData.code || '',
          name: initialData.name || '',
          semester: Number(initialData.semester) || 1,
          sks: Number(initialData.sks) || 2
        });
      } else {
        setFormData({
          code: '',
          name: '',
          semester: 3,
          sks: 2
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, initialData]);

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
    if (!formData.code.trim()) {
      newErrors.code = 'Kode mata kuliah wajib diisi.';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Nama mata kuliah wajib diisi.';
    }
    const sem = Number(formData.semester);
    if (!formData.semester || isNaN(sem) || sem < 1 || sem > 8) {
      newErrors.semester = 'Semester harus antara 1 sampai 8.';
    }
    const sks = Number(formData.sks);
    if (!formData.sks || isNaN(sks) || sks < 1 || sks > 10) {
      newErrors.sks = 'SKS harus antara 1 sampai 10.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      semester: Number(formData.semester),
      sks: Number(formData.sks),
      prodi: initialData?.prodi || 'Teknik Informatika'
    });
  };

  const isEdit = mode === 'edit';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2352]/60 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="curriculum-form-dialog-title"
    >
      <div className="w-full max-w-[480px] bg-white rounded-[16px] p-7 shadow-2xl relative animate-scale-up">
        <h2 id="curriculum-form-dialog-title" className="text-[20px] font-bold text-navy mb-5">
          {isEdit ? 'Ubah Mata Kuliah' : 'Tambah Mata Kuliah'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Kode Mata Kuliah */}
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1.5">
              Kode Mata Kuliah <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Contoh: IF318"
              className={`w-full h-[44px] px-3.5 bg-white border rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring ${
                errors.code ? 'border-danger' : 'border-line'
              }`}
            />
            {errors.code && (
              <p className="text-danger text-[12px] mt-1 font-medium">{errors.code}</p>
            )}
          </div>

          {/* Nama Mata Kuliah */}
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1.5">
              Nama Mata Kuliah <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Statistika"
              className={`w-full h-[44px] px-3.5 bg-white border rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring ${
                errors.name ? 'border-danger' : 'border-line'
              }`}
            />
            {errors.name && (
              <p className="text-danger text-[12px] mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Semester & SKS in grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Semester */}
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">
                Semester <span className="text-danger">*</span>
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full h-[44px] px-3.5 bg-white border border-line rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring cursor-pointer"
              >
                {SEMESTER_OPTIONS.map((num) => (
                  <option key={num} value={num}>
                    Semester {num}
                  </option>
                ))}
              </select>
              {errors.semester && (
                <p className="text-danger text-[12px] mt-1 font-medium">{errors.semester}</p>
              )}
            </div>

            {/* SKS */}
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">
                SKS <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                name="sks"
                min="1"
                max="10"
                value={formData.sks}
                onChange={handleChange}
                className={`w-full h-[44px] px-3.5 bg-white border rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring ${
                  errors.sks ? 'border-danger' : 'border-line'
                }`}
              />
              {errors.sks && (
                <p className="text-danger text-[12px] mt-1 font-medium">{errors.sks}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-[44px] px-6 border border-line rounded-[10px] text-ink font-semibold text-[14px] hover:bg-slate/5 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[44px] px-6 bg-royal-blue hover:bg-[#153eb5] text-white font-bold text-[14px] rounded-[10px] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              <span>Simpan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurriculumFormDialog;
