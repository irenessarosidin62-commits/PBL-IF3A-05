import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import LaboranLayout from '../../components/laboran/LaboranLayout';
import SarprasTable from '../../components/laboran/SarprasTable';
import SarprasFormDialog from '../../components/laboran/SarprasFormDialog';
import Toast from '../../components/common/Toast';
import { SARPRAS_FILTER_CATEGORIES } from '../../constants/sarprasConstants';
import { fetchRooms, createRoom, updateRoom } from '../../services/sarprasService';

const SarprasPage = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null);

  // Dialog & Toast states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' | 'edit'
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch {
      showToast('Gagal memuat data sarana dan prasarana.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Click outside category dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered rooms logic: searches code, name, building, floor; filters category
  const filteredRooms = rooms.filter((room) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      room.code.toLowerCase().includes(q) ||
      room.name.toLowerCase().includes(q) ||
      (room.building || '').toLowerCase().includes(q) ||
      `lantai ${room.floor}`.toLowerCase().includes(q) ||
      `${room.building || ''}, lantai ${room.floor}`.toLowerCase().includes(q);

    const matchesCategory =
      selectedCategory === 'Semua Kategori' || room.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setSelectedRoom(null);
    setDialogMode('add');
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (room) => {
    setSelectedRoom(room);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = async (formData, setErrors) => {
    setIsSubmitting(true);
    try {
      if (dialogMode === 'add') {
        await createRoom(formData);
        showToast('Data sarana dan prasarana berhasil ditambahkan.');
      } else {
        await updateRoom(selectedRoom.id, formData);
        showToast('Data sarana dan prasarana berhasil diperbarui.');
      }
      setIsDialogOpen(false);
      loadData();
    } catch (err) {
      if (err.message && err.message.includes('Kode ruang')) {
        setErrors((prev) => ({ ...prev, code: err.message }));
      } else {
        setErrors((prev) => ({ ...prev, general: err.message || 'Gagal menyimpan data.' }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LaboranLayout>
      {/* Title & Action Button Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[26px] sm:text-[28px] font-bold text-navy leading-tight">
            Sarana dan Prasarana
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate mt-1 font-normal">
            Kelola data ruang kelas, laboratorium, dan peralatan pendukung PBM.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="h-[44px] px-5 bg-royal-blue hover:bg-[#153eb5] active:scale-[0.98] text-white font-bold text-[14px] rounded-[10px] transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0 shadow-xs focus:outline-none focus:ring-2 focus:ring-royal-blue inline-flex items-center"
        >
          <span>+Tambah Data</span>
        </button>
      </div>

      {/* Filter Row: Pencarian + Dropdown Kategori (Gambar 1 & 2) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
        {/* Input Pencarian */}
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode, nama, atau lokasi ruang"
            className="w-full h-[44px] bg-white border border-line rounded-[10px] px-4 text-[13px] sm:text-[14px] text-ink placeholder:text-slate/60 focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 transition-all"
          />
        </div>

        {/* Dropdown Kategori */}
        <div className="relative min-w-[200px]" ref={categoryDropdownRef}>
          <button
            type="button"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className={`w-full h-[44px] bg-white border rounded-[10px] px-4 flex items-center justify-between text-[13px] sm:text-[14px] text-ink focus:outline-none focus:ring-2 transition-all cursor-pointer ${
              isCategoryDropdownOpen
                ? 'border-royal-blue ring-2 ring-royal-blue/20'
                : 'border-line hover:border-slate/40'
            }`}
            aria-haspopup="listbox"
            aria-expanded={isCategoryDropdownOpen}
          >
            <span className="font-semibold">{selectedCategory}</span>
            <ChevronDown
              size={18}
              className={`text-slate transition-transform duration-200 ${
                isCategoryDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isCategoryDropdownOpen && (
            <div
              className="absolute right-0 mt-1.5 w-full bg-white border border-line rounded-[12px] p-1.5 shadow-xl z-30 animate-fade-in space-y-1"
              role="listbox"
            >
              {SARPRAS_FILTER_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer ${
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
        </div>
      </div>

      {/* Table */}
      <SarprasTable
        rooms={filteredRooms}
        onEdit={handleOpenEdit}
        showActions={true}
        isLoading={isLoading}
      />

      {/* Modal Tambah / Ubah */}
      <SarprasFormDialog
        isOpen={isDialogOpen}
        mode={dialogMode}
        initialData={selectedRoom}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </LaboranLayout>
  );
};

export default SarprasPage;
