import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TAHUN_AJARAN_OPTIONS = ['2026/2027', '2025/2026', '2024/2025'];
const SEMESTER_OPTIONS = ['Ganjil', 'Genap', 'Semua Semester'];

const CurriculumFilterBar = ({
  selectedTahun,
  onTahunChange,
  selectedSemester,
  onSemesterChange
}) => {
  const [openDropdown, setOpenDropdown] = useState(null); // 'tahun' | 'semester' | null
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
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3" ref={filterRef}>
      {/* 1. Tahun Ajaran */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpenDropdown(openDropdown === 'tahun' ? null : 'tahun')}
          className={`bg-white border rounded-[10px] px-3.5 py-1.5 flex items-center justify-between gap-3 min-w-[136px] text-left text-[14px] font-semibold text-ink focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring transition-shadow cursor-pointer ${
            openDropdown === 'tahun'
              ? 'border-royal-blue ring-[3px] ring-focus-ring'
              : 'border-line hover:border-slate/40'
          }`}
          aria-expanded={openDropdown === 'tahun'}
          aria-haspopup="listbox"
          aria-label="Filter berdasarkan tahun ajaran"
        >
          <div className="text-left">
            <span className="text-[11px] font-bold text-royal-blue block text-left leading-tight">
              Tahun Ajaran
            </span>
            <span className="text-[14px] font-semibold text-ink block text-left leading-tight mt-0.5">
              {selectedTahun}
            </span>
          </div>
          {openDropdown === 'tahun' ? (
            <ChevronUp size={18} className="text-slate shrink-0 ml-2" />
          ) : (
            <ChevronDown size={18} className="text-slate shrink-0 ml-2" />
          )}
        </button>

        {openDropdown === 'tahun' && (
          <div
            className="absolute left-0 mt-1.5 w-full min-w-[140px] bg-white border border-line rounded-[12px] p-1.5 shadow-lg z-40 animate-fade-in"
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
                  className={`w-full text-left px-3 py-2 text-[14px] rounded-[8px] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-tint text-royal-blue font-bold'
                      : 'text-ink hover:bg-slate/5 font-medium'
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
          onClick={() => setOpenDropdown(openDropdown === 'semester' ? null : 'semester')}
          className={`bg-white border rounded-[10px] px-3.5 py-1.5 flex items-center justify-between gap-3 min-w-[124px] text-left text-[14px] font-semibold text-ink focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring transition-shadow cursor-pointer ${
            openDropdown === 'semester'
              ? 'border-royal-blue ring-[3px] ring-focus-ring'
              : 'border-line hover:border-slate/40'
          }`}
          aria-expanded={openDropdown === 'semester'}
          aria-haspopup="listbox"
          aria-label="Filter berdasarkan semester"
        >
          <div className="text-left">
            <span className="text-[11px] font-bold text-royal-blue block text-left leading-tight">
              Semester
            </span>
            <span className="text-[14px] font-semibold text-ink block text-left leading-tight mt-0.5">
              {selectedSemester}
            </span>
          </div>
          {openDropdown === 'semester' ? (
            <ChevronUp size={18} className="text-slate shrink-0 ml-2" />
          ) : (
            <ChevronDown size={18} className="text-slate shrink-0 ml-2" />
          )}
        </button>

        {openDropdown === 'semester' && (
          <div
            className="absolute left-0 mt-1.5 w-full min-w-[140px] bg-white border border-line rounded-[12px] p-1.5 shadow-lg z-40 animate-fade-in"
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
                  className={`w-full text-left px-3 py-2 text-[14px] rounded-[8px] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-tint text-royal-blue font-bold'
                      : 'text-ink hover:bg-slate/5 font-medium'
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
    </div>
  );
};

export default CurriculumFilterBar;
