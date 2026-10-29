import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import TuLayout from '../../components/tu/TuLayout';
import Toast from '../../components/common/Toast';
import {
  ACADEMIC_YEARS,
  SEMESTERS,
  CURRICULUMS,
  RECAP_STATUS
} from '../../constants/competencyConstants';
import {
  TEACHER_COURSES,
  INITIAL_TEACHER_RECAP,
  ADVISOR_COLUMNS,
  INITIAL_ADVISOR_RECAP,
  calculateAverage,
  exportRecapToExcel
} from '../../services/competencyService';

// Custom Dropdown matching wireframe (Gambar 3)
const FilterDropdown = ({ label, options, value, onChange }) => {
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
    <div className="relative" ref={ref}>
      <label className="block text-[12px] font-semibold text-ink mb-1.5">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full sm:w-[180px] h-[44px] bg-white border rounded-[10px] px-3.5 flex items-center justify-between text-[13px] font-semibold text-ink transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue/30 ${
          isOpen ? 'border-royal-blue' : 'border-line'
        }`}
        aria-expanded={isOpen}
      >
        <span className="truncate">{value}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-ink shrink-0 ml-1.5" />
        ) : (
          <ChevronDown size={16} className="text-slate shrink-0 ml-1.5" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-1.5 w-full sm:w-[180px] bg-white border border-line rounded-[12px] p-1.5 shadow-lg z-20 animate-fade-in space-y-1"
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
                className={`w-full text-left px-3 py-2 text-[13px] rounded-[8px] transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-tint border border-royal-blue text-ink font-semibold'
                    : 'text-slate hover:text-ink hover:bg-slate/5 font-semibold border border-transparent'
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

const CompetencyRecapPage = () => {
  const location = useLocation();

  // Filter states
  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [semester, setSemester] = useState('Ganjil');
  const [curriculum, setCurriculum] = useState('Kurikulum 2026');

  // Role Tab: 'Dosen pengajar' | 'Dosen wali'
  const [activeTab, setActiveTab] = useState('Dosen pengajar');

  // Toast
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // If navigated from "Lihat rekap" with state
  useEffect(() => {
    if (location.state) {
      if (location.state.academicYear) setAcademicYear(location.state.academicYear);
      if (location.state.semester) setSemester(location.state.semester);
      if (location.state.curriculum) setCurriculum(location.state.curriculum);
    }
  }, [location.state]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleExport = () => {
    try {
      exportRecapToExcel({
        role: activeTab,
        academicYear,
        semester,
        curriculum
      });
      showToast(`Rekap kompetensi (${activeTab}) berhasil diekspor ke Excel.`);
    } catch {
      showToast('Gagal mengekspor data ke Excel.', 'error');
    }
  };

  // Helper score color for Teacher (0-8 scale)
  const getTeacherScoreColor = (score) => {
    if (score === null || score === undefined) return 'text-slate';
    if (score >= 6) return 'text-[#0E5A2B] font-bold'; // 6-8 hijau (kompetensi kuat)
    if (score >= 3) return 'text-royal-blue font-bold'; // 3-5 biru (cukup)
    return 'text-[#6B4400] font-bold'; // 0-2 cokelat/amber (perlu pengampu)
  };

  // Helper score color for Advisor (1-5 scale)
  const getAdvisorScoreColor = (score) => {
    if (score === null || score === undefined) return 'text-slate';
    if (score >= 4) return 'text-[#0E5A2B] font-bold'; // 4-5 hijau (kompetensi kuat)
    if (score === 3) return 'text-royal-blue font-bold'; // 3 biru (cukup)
    return 'text-[#6B4400] font-bold'; // 1-2 cokelat/amber (perlu pengampu)
  };

  return (
    <TuLayout>
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[28px] font-bold text-navy leading-tight">
          Rekap Kompetensi
        </h2>
        <p className="text-[14px] sm:text-[15px] text-slate mt-1 font-normal">
          Periksa hasil pengisian Dosen per periode dan peran.
        </p>
      </div>

      {/* Filter Row & Ekspor Excel */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3.5">
          <FilterDropdown
            label="Tahun ajaran"
            options={ACADEMIC_YEARS}
            value={academicYear}
            onChange={setAcademicYear}
          />
          <FilterDropdown
            label="Semester"
            options={SEMESTERS}
            value={semester}
            onChange={setSemester}
          />
          <FilterDropdown
            label="Kurikulum"
            options={CURRICULUMS}
            value={curriculum}
            onChange={setCurriculum}
          />
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="h-[44px] px-6 bg-amber hover:bg-[#FFBA3D] active:scale-[0.98] text-amber-ink font-bold text-[14px] rounded-[10px] transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber"
        >
          Ekspor Excel
        </button>
      </div>

      {/* Role Tab Selector Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('Dosen pengajar')}
          className={`h-[40px] px-5 text-[14px] rounded-[8px] transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer ${
            activeTab === 'Dosen pengajar'
              ? 'bg-navy text-white font-bold shadow-xs'
              : 'bg-white border border-line text-ink font-semibold hover:bg-slate/5'
          }`}
        >
          Dosen pengajar
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('Dosen wali')}
          className={`h-[40px] px-5 text-[14px] rounded-[8px] transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer ${
            activeTab === 'Dosen wali'
              ? 'bg-navy text-white font-bold shadow-xs'
              : 'bg-white border border-line text-ink font-semibold hover:bg-slate/5'
          }`}
        >
          Dosen wali
        </button>
      </div>

      {/* Table Card */}
      <div key={activeTab} className="bg-white rounded-[14px] border border-line overflow-hidden shadow-2xs mb-4 animate-fade-in">
        <div className="overflow-x-auto">
          {activeTab === 'Dosen pengajar' ? (
            /* TAB 1: Dosen Pengajar Table (Gambar 6) */
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-line bg-white text-slate">
                  <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                    Dosen
                  </th>
                  {TEACHER_COURSES.map((course) => (
                    <th key={course} scope="col" className="py-3.5 px-4 text-[13px] font-bold text-center whitespace-nowrap">
                      {course}
                    </th>
                  ))}
                  <th scope="col" className="py-3.5 px-5 text-[13px] font-bold text-center whitespace-nowrap">
                    Rata-rata
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {INITIAL_TEACHER_RECAP.map((row) => {
                  const avg = calculateAverage(row.scores);
                  const isFilled = row.status === RECAP_STATUS.FILLED;

                  return (
                    <tr key={row.id} className="hover:bg-slate/5 transition-colors">
                      {/* Dosen (Nama + NIP) */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-[14px] font-bold text-ink leading-tight">
                          {row.name}
                        </div>
                        <div className="text-[12px] text-slate font-medium mt-0.5">
                          {row.nip}
                        </div>
                      </td>

                      {/* Score per Course */}
                      {TEACHER_COURSES.map((course) => {
                        const val = row.scores && row.scores[course] !== undefined ? row.scores[course] : null;
                        return (
                          <td key={course} className={`py-4 px-4 text-center text-[14px] ${getTeacherScoreColor(val)}`}>
                            {val !== null ? val : '–'}
                          </td>
                        );
                      })}

                      {/* Rata-rata Dinamis */}
                      <td className="py-4 px-5 text-center text-[14px] font-bold text-ink">
                        {avg !== '-' ? avg : '–'}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        {isFilled ? (
                          <span className="inline-flex px-3 py-1 bg-success-bg text-success-text text-[12px] font-semibold rounded-full">
                            Terisi
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 bg-warning-bg text-warning-text text-[12px] font-semibold rounded-full">
                            Belum menginput
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            /* TAB 2: Dosen Wali Table (Gambar 7) */
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-line bg-white text-slate">
                  <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                    Dosen
                  </th>
                  {ADVISOR_COLUMNS.map((col) => (
                    <th key={col.key} scope="col" className="py-3.5 px-4 text-[13px] font-bold text-center whitespace-nowrap">
                      {col.label}
                    </th>
                  ))}
                  <th scope="col" className="py-3.5 px-5 text-[13px] font-bold text-center whitespace-nowrap">
                    Rata-rata
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {INITIAL_ADVISOR_RECAP.map((row) => {
                  const avg = calculateAverage(row.scores);
                  const isFilled = row.status === RECAP_STATUS.FILLED;

                  return (
                    <tr key={row.id} className="hover:bg-slate/5 transition-colors">
                      {/* Dosen (Nama + NIP) */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-[14px] font-bold text-ink leading-tight">
                          {row.name}
                        </div>
                        <div className="text-[12px] text-slate font-medium mt-0.5">
                          {row.nip}
                        </div>
                      </td>

                      {/* Score per Aspect A-F */}
                      {ADVISOR_COLUMNS.map((col) => {
                        const val = row.scores && row.scores[col.key] !== undefined ? row.scores[col.key] : null;
                        return (
                          <td key={col.key} className={`py-4 px-4 text-center text-[14px] ${getAdvisorScoreColor(val)}`}>
                            {val !== null ? val : '–'}
                          </td>
                        );
                      })}

                      {/* Rata-rata Dinamis */}
                      <td className="py-4 px-5 text-center text-[14px] font-bold text-ink">
                        {avg !== '-' ? avg : '–'}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        {isFilled ? (
                          <span className="inline-flex px-3 py-1 bg-success-bg text-success-text text-[12px] font-semibold rounded-full">
                            Terisi
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 bg-warning-bg text-warning-text text-[12px] font-semibold rounded-full">
                            Belum menginput
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Legenda Skala Bawah Tabel (Menyesuaikan Tab Aktif) */}
      <div className="text-[13px] font-medium text-slate py-2">
        {activeTab === 'Dosen pengajar' ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Skala 0–8:</span>
            <span className="text-[#0E5A2B] font-bold">6–8 <span className="font-medium text-slate">kompetensi kuat</span></span>
            <span className="text-royal-blue font-bold">3–5 <span className="font-medium text-slate">cukup</span></span>
            <span className="text-[#6B4400] font-bold">0–2 <span className="font-medium text-slate">perlu pengampu</span></span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Skala 1–5:</span>
            <span className="text-[#0E5A2B] font-bold">4–5 <span className="font-medium text-slate">kompetensi kuat</span></span>
            <span className="text-royal-blue font-bold">3 <span className="font-medium text-slate">cukup</span></span>
            <span className="text-[#6B4400] font-bold">1–2 <span className="font-medium text-slate">perlu pengampu</span></span>
          </div>
        )}
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </TuLayout>
  );
};

export default CompetencyRecapPage;
