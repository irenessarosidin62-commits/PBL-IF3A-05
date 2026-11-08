import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TAHUN_AJARAN_OPTIONS = ['2026/2027', '2025/2026', '2024/2025'];
const SEMESTER_OPTIONS = ['Ganjil', 'Genap'];
const PRODI_OPTIONS = [
  'Teknik Informatika',
  'Teknik Rekayasa Perangkat Lunak',
  'Animasi',
  'Rekayasa Keamanan Siber',
  'Teknologi Rekayasa Multimedia',
  'Teknik Geomatika'
];

const KajurFilterBar = ({
  selectedTahun,
  onTahunChange,
  selectedSemester,
  onSemesterChange,
  selectedProdi,
  onProdiChange
}) => {
  const [openDropdown, setOpenDropdown] = useState(null); // 'tahun' | 'semester' | 'prodi' | null
  const filterRef = useRef(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown]);

  return (
    <div
      className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3"
      ref={filterRef}
    >
      {/* 1. Tahun Ajaran */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === 'tahun' ? null : 'tahun')
          }
          className={`bg-white border rounded-[10px] px-3.5 py-1.5 flex items-center justify-between gap-3 min-w-[134px] text-left text-[14px] font-semibold text-[#0F1B33] focus:outline-none focus:border-[#1B4FD8] focus:ring-[3px] focus:ring-[#D6DFF8] transition-shadow cursor-pointer ${
            openDropdown === 'tahun'
              ? 'border-[#1B4FD8] ring-[3px] ring-[#D6DFF8]'
              : 'border-[#D8E0EE] hover:border-[#51607A]/40'
          }`}
          aria-expanded={openDropdown === 'tahun'}
          aria-haspopup="listbox"
          aria-label="Filter berdasarkan tahun ajaran"
        >
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#1B4FD8] block text-left leading-tight">
              Tahun Ajaran
            </span>
            <span className="text-[13px] sm:text-[14px] font-semibold text-[#0F1B33] block text-left leading-tight mt-0.5">
              {selectedTahun}
            </span>
          </div>
          {openDropdown === 'tahun' ? (
            <ChevronUp size={16} className="text-[#51607A] shrink-0 ml-1.5" />
          ) : (
            <ChevronDown size={16} className="text-[#51607A] shrink-0 ml-1.5" />
          )}
        </button>

        {openDropdown === 'tahun' && (
          <div
            className="absolute left-0 mt-1.5 w-full min-w-[140px] bg-white border border-[#D8E0EE] rounded-[12px] p-1.5 shadow-xl z-50 animate-in fade-in"
            role="listbox"
          >
            {TAHUN_AJARAN_OPTIONS.map((th) => {
              const isSelected = selectedTahun === th;
              return (
                <button
                  key={th}
                  type="button"
                  onClick={() => {
                    onTahunChange(th);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-[13px] sm:text-[14px] rounded-[8px] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#E8EEFC] text-[#1B4FD8] font-bold'
                      : 'text-[#0F1B33] hover:bg-[#F3F6FB] font-medium'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  {th}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Semester */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === 'semester' ? null : 'semester')
          }
          className={`bg-white border rounded-[10px] px-3.5 py-1.5 flex items-center justify-between gap-3 min-w-[114px] text-left text-[14px] font-semibold text-[#0F1B33] focus:outline-none focus:border-[#1B4FD8] focus:ring-[3px] focus:ring-[#D6DFF8] transition-shadow cursor-pointer ${
            openDropdown === 'semester'
              ? 'border-[#1B4FD8] ring-[3px] ring-[#D6DFF8]'
              : 'border-[#D8E0EE] hover:border-[#51607A]/40'
          }`}
          aria-expanded={openDropdown === 'semester'}
          aria-haspopup="listbox"
          aria-label="Filter berdasarkan semester"
        >
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#1B4FD8] block text-left leading-tight">
              Semester
            </span>
            <span className="text-[13px] sm:text-[14px] font-semibold text-[#0F1B33] block text-left leading-tight mt-0.5">
              {selectedSemester}
            </span>
          </div>
          {openDropdown === 'semester' ? (
            <ChevronUp size={16} className="text-[#51607A] shrink-0 ml-1.5" />
          ) : (
            <ChevronDown size={16} className="text-[#51607A] shrink-0 ml-1.5" />
          )}
        </button>

        {openDropdown === 'semester' && (
          <div
            className="absolute left-0 mt-1.5 w-full min-w-[130px] bg-white border border-[#D8E0EE] rounded-[12px] p-1.5 shadow-xl z-50 animate-in fade-in"
            role="listbox"
          >
            {SEMESTER_OPTIONS.map((sem) => {
              const isSelected = selectedSemester === sem;
              return (
                <button
                  key={sem}
                  type="button"
                  onClick={() => {
                    onSemesterChange(sem);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-[13px] sm:text-[14px] rounded-[8px] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#E8EEFC] text-[#1B4FD8] font-bold'
                      : 'text-[#0F1B33] hover:bg-[#F3F6FB] font-medium'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  {sem}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Prodi */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === 'prodi' ? null : 'prodi')
          }
          className={`bg-white border rounded-[10px] px-3.5 py-1.5 flex items-center justify-between gap-3 min-w-[155px] text-left text-[14px] font-semibold text-[#0F1B33] focus:outline-none focus:border-[#1B4FD8] focus:ring-[3px] focus:ring-[#D6DFF8] transition-shadow cursor-pointer ${
            openDropdown === 'prodi'
              ? 'border-[#1B4FD8] ring-[3px] ring-[#D6DFF8]'
              : 'border-[#D8E0EE] hover:border-[#51607A]/40'
          }`}
          aria-expanded={openDropdown === 'prodi'}
          aria-haspopup="listbox"
          aria-label="Filter berdasarkan program studi"
        >
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#1B4FD8] block text-left leading-tight">
              Prodi
            </span>
            <span className="text-[13px] sm:text-[14px] font-semibold text-[#0F1B33] block text-left leading-tight mt-0.5 truncate max-w-[150px]">
              {selectedProdi}
            </span>
          </div>
          {openDropdown === 'prodi' ? (
            <ChevronUp size={16} className="text-[#51607A] shrink-0 ml-1.5" />
          ) : (
            <ChevronDown size={16} className="text-[#51607A] shrink-0 ml-1.5" />
          )}
        </button>

        {openDropdown === 'prodi' && (
          <div
            className="absolute right-0 mt-1.5 min-w-[260px] bg-white border border-[#D8E0EE] rounded-[12px] p-1.5 shadow-xl z-50 animate-in fade-in"
            role="listbox"
          >
            {PRODI_OPTIONS.map((prd) => {
              const isSelected = selectedProdi === prd;
              return (
                <button
                  key={prd}
                  type="button"
                  onClick={() => {
                    onProdiChange(prd);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-[13px] sm:text-[14px] rounded-[8px] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#E8EEFC] text-[#1B4FD8] font-bold'
                      : 'text-[#0F1B33] hover:bg-[#F3F6FB] font-medium'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  {prd}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default KajurFilterBar;

