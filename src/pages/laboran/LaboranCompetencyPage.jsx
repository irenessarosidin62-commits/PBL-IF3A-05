import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Info, Search } from 'lucide-react';
import LaboranLayout from '../../components/laboran/LaboranLayout';
import CompetencyScaleGuide from '../../components/laboran/CompetencyScaleGuide';
import Toast from '../../components/common/Toast';
import {
  ACADEMIC_YEARS,
  SEMESTERS,
  PRODIS,
  SCORE_OPTIONS
} from '../../constants/laboranCompetencyConstants';
import {
  fetchLaboranCompetencies,
  saveDraftLaboranCompetencies,
  submitLaboranCompetencies
} from '../../services/laboranCompetencyService';

// Custom Dropdown for Period Header (Tahun Ajaran, Semester, Prodi)
const PeriodDropdown = ({ label, options, value, onChange, widthClass = 'w-auto' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${widthClass}`} ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[48px] px-3 bg-white border rounded-[10px] flex items-center justify-between gap-2 text-left transition-all cursor-pointer ${
          isOpen
            ? 'border-royal-blue ring-2 ring-royal-blue/20'
            : 'border-line hover:border-slate/40 shadow-2xs'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <span className="block text-[10px] text-royal-blue font-bold leading-tight truncate">
            {label}
          </span>
          <span className="block text-[13px] font-bold text-ink leading-tight mt-0.5 truncate">
            {value}
          </span>
        </div>
        <ChevronDown
          size={15}
          className={`text-slate transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-full bg-white border border-line rounded-[12px] p-1.5 shadow-xl z-30 animate-fade-in space-y-1"
          role="listbox"
        >
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-tint text-royal-blue border border-royal-blue/50'
                    : 'text-ink hover:bg-slate/5'
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
  );
};

const LaboranCompetencyPage = () => {
  // Period filter states
  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [semester, setSemester] = useState('Ganjil');
  const [prodi, setProdi] = useState('Teknik Informatika');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // All courses data indexed by prodi name
  const [coursesByProdi, setCoursesByProdi] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Selected course for description tooltip popover
  const [activeCourseDesc, setActiveCourseDesc] = useState(null);
  const descPopoverRef = useRef(null);

  // Toast & submission state
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchLaboranCompetencies();
      setCoursesByProdi(data);
    } catch {
      showToast('Gagal memuat data kompetensi.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Close info tooltip when clicking anywhere outside or pressing Esc
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (descPopoverRef.current && !descPopoverRef.current.contains(e.target)) {
        setActiveCourseDesc(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveCourseDesc(null);
      }
    };
    if (activeCourseDesc) {
      document.addEventListener('mousedown', handleGlobalClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCourseDesc]);

  // Handle score change for a specific course
  const handleScoreChange = (courseId, newScore) => {
    setCoursesByProdi((prev) => {
      const currentList = prev[prodi] || [];
      const updatedList = currentList.map((c) =>
        c.id === courseId
          ? { ...c, score: newScore === '' ? null : newScore }
          : c
      );
      return {
        ...prev,
        [prodi]: updatedList
      };
    });
  };

  // Current courses for active prodi
  const currentProdiCourses = coursesByProdi[prodi] || [];

  // Filtered by search query
  const filteredCourses = currentProdiCourses.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q)
    );
  });

  // Calculate global progress across ALL prodis
  const allCoursesFlat = Object.values(coursesByProdi).flat();
  const totalCoursesCount = allCoursesFlat.length;
  const filledCoursesCount = allCoursesFlat.filter(
    (c) => c.score !== null && c.score !== undefined && c.score !== ''
  ).length;

  const isAllFilled = totalCoursesCount > 0 && filledCoursesCount === totalCoursesCount;

  // Save Draft
  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      await saveDraftLaboranCompetencies(coursesByProdi);
      showToast('Draf matriks kompetensi berhasil disimpan.');
    } catch {
      showToast('Gagal menyimpan draf.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Kirim (Final Submission)
  const handleSubmit = async () => {
    if (!isAllFilled) return;
    setIsSubmitting(true);
    try {
      await submitLaboranCompetencies(coursesByProdi);
      showToast('Penilaian kompetensi berhasil dikirim!');
    } catch (err) {
      showToast(err.message || 'Gagal mengirim formulir kompetensi.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LaboranLayout>
      {/* Title & Period Filters Row (Gambar 2, 3, & 4) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[26px] sm:text-[28px] font-bold text-navy leading-tight">
            Matriks Kompetensi Saya
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate mt-1 font-normal">
            Isi nilai 0–8 untuk tiap mata kuliah yang Anda ajar.
          </p>
        </div>

        {/* 3 Dropdowns: Tahun Ajaran, Semester, Prodi */}
        <div className="flex flex-wrap items-center gap-2.5">
          <PeriodDropdown
            label="Tahun Ajaran"
            options={ACADEMIC_YEARS}
            value={academicYear}
            onChange={setAcademicYear}
            widthClass="w-[126px]"
          />
          <PeriodDropdown
            label="Semester"
            options={SEMESTERS}
            value={semester}
            onChange={setSemester}
            widthClass="w-[106px]"
          />
          <PeriodDropdown
            label="Prodi"
            options={PRODIS}
            value={prodi}
            onChange={setProdi}
            widthClass="w-[175px]"
          />
        </div>
      </div>

      {/* Petunjuk Skala Penilaian Card (Gambar 3 & 4) */}
      <CompetencyScaleGuide />

      {/* Input Pencarian Mata Kuliah */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari mata kuliah"
            className="w-full h-[44px] bg-white border border-line rounded-[10px] pl-4 pr-10 text-[13px] sm:text-[14px] text-ink placeholder:text-slate/60 focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 transition-all shadow-2xs"
          />
          <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate/50 pointer-events-none" />
        </div>
      </div>

      {/* Table Card (Gambar 2 & 5) */}
      <div className="w-full bg-white rounded-[14px] border border-line overflow-hidden shadow-2xs mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-line bg-white text-slate">
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                  Kode
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                  Mata kuliah
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                  Semester
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                  SKS
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap min-w-[260px]">
                  NILAI (0–8)
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate text-[14px]">
                    Memuat data mata kuliah...
                  </td>
                </tr>
              ) : filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate">
                    <p className="text-[14px] font-medium text-slate">
                      Tidak ada mata kuliah yang cocok dengan pencarian.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCourses.map((c, index) => {
                  const isFilled = c.score !== null && c.score !== undefined && c.score !== '';
                  const isDescOpen = activeCourseDesc?.id === c.id;
                  const isNearBottom = index >= Math.max(0, filteredCourses.length - 2);

                  return (
                    <tr
                      key={c.id || c.code}
                      className="hover:bg-slate/5 transition-colors duration-150"
                    >
                      {/* Kode */}
                      <td className="py-4 px-6 text-[14px] font-semibold text-ink whitespace-nowrap">
                        {c.code}
                      </td>

                      {/* Mata kuliah + info button */}
                      <td className="py-4 px-6 text-[14px] text-ink font-semibold whitespace-nowrap">
                        <div className="relative inline-flex items-center gap-2">
                          <span>{c.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCourseDesc(isDescOpen ? null : c);
                            }}
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                              isDescOpen
                                ? 'bg-royal-blue text-white'
                                : 'text-royal-blue hover:bg-tint'
                            }`}
                            title={`Lihat deskripsi ${c.name}`}
                            aria-label={`Deskripsi ${c.name}`}
                          >
                            <Info size={15} />
                          </button>

                          {/* Floating Description Popover (Persis Gambar 2) */}
                          {isDescOpen && (
                            <div
                              ref={descPopoverRef}
                              onClick={(e) => e.stopPropagation()}
                              className={`absolute left-0 z-40 w-[275px] sm:w-[295px] max-w-[calc(100vw-60px)] bg-white border border-line rounded-[12px] p-3.5 shadow-xl animate-fade-in text-left whitespace-normal select-none ${
                                isNearBottom ? 'bottom-full mb-2' : 'top-full mt-2'
                              }`}
                            >
                              <h4 className="text-[13px] font-bold text-navy leading-snug">
                                {c.name} ({c.code})
                              </h4>
                              <p className="text-[12px] text-slate mt-1.5 leading-relaxed font-normal break-words">
                                {c.description || 'Deskripsi mata kuliah belum tersedia.'}
                              </p>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Semester */}
                      <td className="py-4 px-6 text-[14px] text-slate text-center font-medium">
                        {c.semester}
                      </td>

                      {/* SKS */}
                      <td className="py-4 px-6 text-[14px] text-slate text-center font-medium">
                        {c.sks}
                      </td>

                      {/* NILAI (0-8) Select */}
                      <td className="py-4 px-6">
                        <div className="relative max-w-[270px]">
                          <select
                            value={c.score ?? ''}
                            onChange={(e) => handleScoreChange(c.id, e.target.value)}
                            className="w-full h-[38px] bg-white border border-line rounded-[8px] pl-3 pr-8 text-[13px] font-semibold text-ink appearance-none cursor-pointer focus:outline-none focus:border-royal-blue focus:ring-1 focus:ring-royal-blue transition-colors shadow-2xs hover:border-slate/40"
                          >
                            <option value="">Pilih Nilai</option>
                            {SCORE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate pointer-events-none"
                          />
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        {isFilled ? (
                          <span className="inline-flex px-3.5 py-1 bg-success-bg text-success-text text-[12px] font-semibold rounded-full min-w-[80px] justify-center">
                            Terisi
                          </span>
                        ) : (
                          <span className="inline-flex px-3.5 py-1 bg-[#FEE4E2] text-danger text-[12px] font-semibold rounded-full min-w-[80px] justify-center">
                            Belum Terisi
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Progres & Action Buttons (Gambar 2 & 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        {/* Teks Progres Semua Prodi */}
        <div>
          <p className="text-[14px] font-bold text-ink">
            {filledCoursesCount} dari {totalCoursesCount} isian terisi{' '}
            <span className="text-slate font-medium text-[13px]">(semua prodi)</span>
          </p>
          <p className="text-[12px] text-slate mt-0.5 font-normal">
            Kirim aktif setelah semua isian terisi.
          </p>
        </div>

        {/* Buttons Simpan draf & Kirim */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            className="h-[44px] px-6 border border-royal-blue rounded-[10px] text-royal-blue font-bold text-[14px] bg-white hover:bg-tint active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue disabled:opacity-60"
          >
            Simpan draf
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isAllFilled || isSubmitting}
            className={`h-[44px] px-8 rounded-[10px] font-bold text-[14px] transition-all focus:outline-none focus:ring-2 ${
              isAllFilled && !isSubmitting
                ? 'bg-royal-blue hover:bg-[#153eb5] text-white active:scale-[0.98] cursor-pointer shadow-xs focus:ring-royal-blue'
                : 'bg-[#D1D5DB] text-[#6B7280] cursor-not-allowed opacity-80'
            }`}
          >
            Kirim
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </LaboranLayout>
  );
};

export default LaboranCompetencyPage;
