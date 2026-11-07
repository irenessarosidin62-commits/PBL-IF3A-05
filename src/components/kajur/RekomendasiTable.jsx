import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, Info, Pencil, Check } from 'lucide-react';
import * as XLSX from 'xlsx';
import EditPenugasanDialog from './EditPenugasanDialog';
import CourseDetailDialog from './CourseDetailDialog';

const RekomendasiTable = ({
  courses = [],
  selectedTahun = '2026/2027',
  selectedSemester = 'Ganjil',
  selectedProdi = 'Teknik Informatika',
  onUpdateCourse,
  onToggleApprove,
  onNotify
}) => {
  // Search query & Semester filter (Card Level)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState('Semua Semester');
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dialog state
  const [editingCourse, setEditingCourse] = useState(null);
  const [detailCourse, setDetailCourse] = useState(null);

  // Reset internal card filters when top level filters (Tahun, Semester, Prodi) change during render
  const currentTopFiltersKey = `${selectedTahun}-${selectedSemester}-${selectedProdi}`;
  const [prevTopFiltersKey, setPrevTopFiltersKey] = useState(currentTopFiltersKey);

  if (currentTopFiltersKey !== prevTopFiltersKey) {
    setPrevTopFiltersKey(currentTopFiltersKey);
    setSelectedSemesterFilter('Semua Semester');
    setSearchQuery('');
  }

  // Dropdown semester options: kalau ganjil hanya semester ganjil (1, 3, 5, 7)
  const semesterFilterOptions = useMemo(() => {
    if (selectedSemester === 'Ganjil') {
      return [
        'Semua Semester',
        'Semester 1',
        'Semester 3',
        'Semester 5',
        'Semester 7'
      ];
    }
    return [
      'Semua Semester',
      'Semester 2',
      'Semester 4',
      'Semester 6',
      'Semester 8'
    ];
  }, [selectedSemester]);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSemesterDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSemesterDropdownOpen(false);
      }
    };
    if (isSemesterDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSemesterDropdownOpen]);

  // Real filtering based on both Semester and Search Input
  const filteredCourses = useMemo(() => {
    if (selectedSemester === 'Genap' || selectedTahun !== '2026/2027') {
      return [];
    }

    return courses.filter((item) => {
      // 1. Filter Semester
      if (selectedSemesterFilter !== 'Semua Semester') {
        const targetSemester = parseInt(
          selectedSemesterFilter.replace('Semester ', '').trim(),
          10
        );
        if (Number(item.semester) !== targetSemester) {
          return false;
        }
      }

      // 2. Filter Pencarian Nama Mata Kuliah, Kode MK, atau Nama Dosen (case-insensitive)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name ? item.name.toLowerCase().includes(query) : false;
        const matchCode = item.code ? item.code.toLowerCase().includes(query) : false;
        const matchKoor = item.koordinator ? item.koordinator.toLowerCase().includes(query) : false;
        const matchPengajar = item.pengajar ? item.pengajar.toLowerCase().includes(query) : false;
        if (!matchName && !matchCode && !matchKoor && !matchPengajar) {
          return false;
        }
      }

      return true;
    });
  }, [courses, searchQuery, selectedSemesterFilter, selectedSemester, selectedTahun]);

  // Dynamic empty message based on active filter context
  const emptyMessage = useMemo(() => {
    if (selectedTahun !== '2026/2027') {
      return `Belum ada data untuk Tahun Ajaran ${selectedTahun}.`;
    }
    if (selectedSemester === 'Genap') {
      return 'Belum ada data (Masa perkuliahan aktif saat ini adalah Semester Ganjil 2026/2027).';
    }
    if (!courses || courses.length === 0) {
      return `Belum ada data mata kuliah untuk program studi ${selectedProdi}.`;
    }
    return 'Mata kuliah tidak ditemukan';
  }, [selectedTahun, selectedSemester, courses, selectedProdi]);

  // Handle Export to Excel using XLSX
  const handleExportExcel = () => {
    try {
      if (filteredCourses.length === 0) {
        if (onNotify) onNotify('Tidak ada data yang dapat diekspor.', true);
        return;
      }

      const exportData = filteredCourses.map((c, index) => ({
        'No.': index + 1,
        'Kode MK': c.code || '-',
        'Mata Kuliah': c.name,
        'Semester': c.semester,
        'SKS': c.sks,
        'Dosen Koordinator': c.koordinator || '-',
        'Dosen Pengajar': c.pengajar || '-',
        'Status Persetujuan': c.approved ? 'Disetujui' : 'Belum Disetujui'
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);

      // Auto-fit column widths
      worksheet['!cols'] = [
        { wch: 6 },
        { wch: 12 },
        { wch: 36 },
        { wch: 12 },
        { wch: 8 },
        { wch: 26 },
        { wch: 26 },
        { wch: 20 }
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekomendasi Penugasan');

      XLSX.writeFile(workbook, 'Rekomendasi_Penugasan_Dosen.xlsx');

      if (onNotify) {
        onNotify('Data rekomendasi penugasan berhasil diekspor ke Excel!');
      }
    } catch {
      if (onNotify) {
        onNotify('Gagal mengekspor data ke Excel.', true);
      }
    }
  };

  const handleSaveEdit = (updatedCourse) => {
    if (onUpdateCourse) {
      onUpdateCourse(updatedCourse);
    }
    setEditingCourse(null);
    if (onNotify) {
      onNotify(`Penugasan dosen untuk "${updatedCourse.name}" berhasil diperbarui.`);
    }
  };

  const handleCheckboxToggle = (courseItem) => {
    if (onToggleApprove) {
      onToggleApprove(courseItem.id);
    }
    if (onNotify) {
      const willApprove = !courseItem.approved;
      onNotify(
        willApprove
          ? `Usulan penugasan "${courseItem.name}" disetujui.`
          : `Persetujuan usulan "${courseItem.name}" dibatalkan.`
      );
    }
  };

  return (
    <>
      {/* Card Utama - Selaras dengan GapCourseTable */}
      <div className="bg-white rounded-[16px] border border-[#D8E0EE] p-5 sm:p-6 shadow-[0_2px_12px_rgba(10,35,82,0.03)]">
        {/* Card Header Title */}
        <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0A2352] mb-4">
          Usulan per Mata Kuliah
        </h3>

        {/* Filter and Action Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
          {/* 1. Input Pencarian */}
          <input
            type="text"
            placeholder="Cari nama mata kuliah"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:flex-1 h-[42px] bg-white border border-[#CBD5E1] rounded-[9px] px-4 text-[14px] text-[#0F1B33] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8] transition"
          />

          {/* 2. Dropdown Filter "Semua Semester" (menyesuaikan Semester Ganjil vs Genap) */}
          <div className="relative w-full sm:w-auto shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsSemesterDropdownOpen(!isSemesterDropdownOpen)}
              className="w-full sm:w-auto h-[42px] px-4 bg-white border border-[#CBD5E1] hover:border-[#1B4FD8] rounded-[9px] text-[13.5px] font-medium text-[#0F1B33] flex items-center justify-between gap-2.5 transition-colors cursor-pointer shadow-2xs focus:outline-none focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8]"
              aria-expanded={isSemesterDropdownOpen}
              aria-haspopup="listbox"
            >
              <span>{selectedSemesterFilter}</span>
              <ChevronDown
                size={16}
                className={`text-[#51607A] transition-transform duration-200 ${
                  isSemesterDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isSemesterDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-44 bg-white border border-[#D8E0EE] rounded-[9px] p-1.5 shadow-lg z-30 animate-in fade-in space-y-0.5"
                role="listbox"
              >
                {semesterFilterOptions.map((opt) => {
                  const isSelected = selectedSemesterFilter === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedSemesterFilter(opt);
                        setIsSemesterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-[13px] rounded-[6px] font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#E8EEFC] text-[#1B4FD8] font-bold'
                          : 'text-[#0F1B33] hover:bg-slate-50'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Tombol "Export Excel" berwarna kuning */}
          <button
            type="button"
            onClick={handleExportExcel}
            className="w-full sm:w-auto h-[42px] px-6 bg-[#FFB020] hover:bg-[#EAA11A] text-[#0A2352] font-bold text-[13.5px] rounded-[9px] transition-colors shadow-xs shrink-0 cursor-pointer text-center"
          >
            Export Excel
          </button>
        </div>

        {/* Tabel Rekomendasi Penugasan */}
        <div className="overflow-x-auto border border-[#E2E8F0] rounded-[10px]">
          <table className="w-full text-left border-collapse text-[13.5px]">
            {/* Header Kolom */}
            <thead>
              <tr className="bg-[#F8FAFC] text-[#0A2352] font-bold border-b border-[#E2E8F0]">
                <th scope="col" className="py-3.5 px-3 text-center border-r border-[#E2E8F0] w-14 font-bold text-[13px]">
                  No.
                </th>
                <th scope="col" className="py-3.5 px-4 text-left border-r border-[#E2E8F0] font-bold text-[13px] min-w-[220px]">
                  Mata Kuliah
                </th>
                <th scope="col" className="py-3.5 px-3 text-center border-r border-[#E2E8F0] font-bold text-[13px] w-20">
                  SKS
                </th>
                <th scope="col" className="py-3.5 px-4 text-center border-r border-[#E2E8F0] font-bold text-[13px] min-w-[170px]">
                  Dosen Koordinator
                </th>
                <th scope="col" className="py-3.5 px-4 text-center border-r border-[#E2E8F0] font-bold text-[13px] min-w-[170px]">
                  Dosen Pengajar
                </th>
                <th scope="col" className="py-3.5 px-3 text-center border-r border-[#E2E8F0] font-bold text-[13px] w-24">
                  Setujui
                </th>
                <th scope="col" className="py-3.5 px-3 text-center font-bold text-[13px] w-20">
                  Ubah
                </th>
              </tr>
            </thead>

            {/* Body Baris */}
            <tbody className="divide-y divide-[#E2E8F0] bg-white text-[#1E293B]">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F8FAFC]/80 transition-colors"
                    >
                      {/* 1. No. */}
                      <td className="py-3.5 px-3 text-center border-r border-[#E2E8F0] text-gray-600 font-medium">
                        {index + 1}
                      </td>

                      {/* 2. Mata Kuliah + Ikon Info */}
                      <td className="py-3.5 px-4 border-r border-[#E2E8F0] text-left">
                        <div className="flex items-center gap-1.5 font-bold text-[#0A2352] text-[13.5px] sm:text-[14px] leading-snug">
                          <span>{item.name}</span>
                          <button
                            type="button"
                            onClick={() => setDetailCourse(item)}
                            className="text-[#2563EB] hover:text-[#1D4ED8] p-0.5 rounded-full hover:bg-blue-50 transition cursor-pointer"
                            title="Detail Mata Kuliah"
                            aria-label={`Detail ${item.name}`}
                          >
                            <Info size={15} strokeWidth={2.2} />
                          </button>
                        </div>
                      </td>

                      {/* 3. SKS */}
                      <td className="py-3.5 px-3 text-center border-r border-[#E2E8F0] text-gray-700 font-medium">
                        {item.sks}
                      </td>

                      {/* 4. Dosen Koordinator */}
                      <td className="py-3.5 px-4 text-center border-r border-[#E2E8F0] text-gray-700 font-medium">
                        {item.koordinator}
                      </td>

                      {/* 5. Dosen Pengajar */}
                      <td className="py-3.5 px-4 text-center border-r border-[#E2E8F0] text-gray-700 font-medium">
                        {item.pengajar}
                      </td>

                      {/* 6. Setujui Checkbox */}
                      <td className="py-3.5 px-3 text-center border-r border-[#E2E8F0]">
                        <button
                          type="button"
                          onClick={() => handleCheckboxToggle(item)}
                          className={`w-6 h-6 rounded-[7px] mx-auto border flex items-center justify-center transition-all cursor-pointer ${
                            item.approved
                              ? 'bg-[#16A34A] border-[#16A34A] text-white shadow-xs'
                              : 'bg-white border-[#CBD5E1] hover:border-[#1B4FD8]'
                          }`}
                          aria-label={`Setujui penugasan ${item.name}`}
                          title={item.approved ? 'Batalkan Persetujuan' : 'Setujui Penugasan'}
                        >
                          {item.approved && <Check size={14} strokeWidth={2.8} />}
                        </button>
                      </td>

                      {/* 7. Ubah Tombol Pensil */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => setEditingCourse(item)}
                          className="w-7 h-7 rounded-[7px] bg-[#E8EEFC] hover:bg-[#D6DFF8] text-[#1B4FD8] flex items-center justify-center mx-auto transition-colors cursor-pointer"
                          title={`Ubah penugasan ${item.name}`}
                          aria-label={`Ubah penugasan ${item.name}`}
                        >
                          <Pencil size={13} strokeWidth={2.2} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 px-4 text-center text-gray-400 font-medium text-sm"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Penugasan Dialog Modal */}
      {editingCourse && (
        <EditPenugasanDialog
          isOpen={Boolean(editingCourse)}
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Detail Mata Kuliah Dialog Modal */}
      {detailCourse && (
        <CourseDetailDialog
          isOpen={Boolean(detailCourse)}
          course={detailCourse}
          onClose={() => setDetailCourse(null)}
        />
      )}
    </>
  );
};

export default RekomendasiTable;
