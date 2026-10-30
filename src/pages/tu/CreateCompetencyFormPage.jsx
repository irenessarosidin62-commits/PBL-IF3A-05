import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import TuLayout from '../../components/tu/TuLayout';
import Toast from '../../components/common/Toast';
import DatePicker from '../../components/common/DatePicker';
import {
  ACADEMIC_YEARS,
  SEMESTERS,
  CURRICULUMS,
  ADVISOR_ASPECTS
} from '../../constants/competencyConstants';
import { createForm } from '../../services/competencyService';

// Custom dropdown for Tahun Ajaran, Semester, Kurikulum (sesuai Gambar 3)
const FilterDropdown = ({ label, placeholder, options, value, onChange }) => {
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
    <div className="relative flex-1 min-w-[150px]" ref={ref}>
      <label className="block text-[12px] font-semibold text-ink mb-1.5">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-[44px] bg-white border rounded-[10px] px-3.5 flex items-center justify-between text-[13px] font-semibold text-ink transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue/30 ${
          isOpen ? 'border-royal-blue' : 'border-line'
        }`}
        aria-expanded={isOpen}
      >
        <span className={value ? 'text-ink truncate' : 'text-slate/60 truncate'}>
          {value || placeholder}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="text-ink shrink-0 ml-1.5" />
        ) : (
          <ChevronDown size={16} className="text-slate shrink-0 ml-1.5" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-1.5 w-full bg-white border border-line rounded-[12px] p-1.5 shadow-lg z-20 animate-fade-in space-y-1"
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

const CreateCompetencyFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Form filter states
  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [semester, setSemester] = useState('Ganjil');
  const [curriculum, setCurriculum] = useState('Kurikulum 2026');
  const [startDate, setStartDate] = useState('01/10/2026');
  const [endDate, setEndDate] = useState('30/10/2026');

  // Form generated courses state
  const [isFormFormed, setIsFormFormed] = useState(false);
  const [generatedCourses, setGeneratedCourses] = useState([]);
  const [validationError, setValidationError] = useState('');

  // Accordion open state for Section B (key: aspect code, default all closed)
  const [openAccordions, setOpenAccordions] = useState({});

  // Toast
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // If navigated with editForm from state
  useEffect(() => {
    if (location.state?.editForm) {
      const f = location.state.editForm;
      setAcademicYear(f.academicYear || '2026/2027');
      setSemester(f.semester || 'Ganjil');
      setCurriculum(f.curriculum || 'Kurikulum 2026');
      setStartDate(f.startDate || '01/10/2026');
      setEndDate(f.endDate || '30/10/2026');
      setGeneratedCourses(f.courses || []);
      setIsFormFormed(true);
    }
  }, [location.state]);

  const toggleAccordion = (code) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  // Handle "Bentuk Form" click
  const handleGenerateForm = () => {
    setValidationError('');

    if (!academicYear) {
      setValidationError('Tahun ajaran wajib dipilih.');
      return;
    }
    if (!semester) {
      setValidationError('Semester wajib dipilih.');
      return;
    }
    if (!curriculum) {
      setValidationError('Kurikulum wajib dipilih.');
      return;
    }
    if (!startDate || !startDate.trim()) {
      setValidationError('Mulai pengisian wajib diisi.');
      return;
    }
    if (!endDate || !endDate.trim()) {
      setValidationError('Batas pengisian wajib diisi.');
      return;
    }

    // Date logic comparison dd/mm/yyyy
    const parseDate = (dStr) => {
      const parts = dStr.split(/[/.-]/);
      if (parts.length === 3) {
        return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      }
      return new Date(dStr);
    };

    const sDate = parseDate(startDate);
    const eDate = parseDate(endDate);

    if (isNaN(sDate.getTime()) || isNaN(eDate.getTime())) {
      setValidationError('Format tanggal tidak valid. Gunakan format dd/mm/yyyy.');
      return;
    }

    if (eDate < sDate) {
      setValidationError('Batas pengisian tidak boleh lebih awal dari mulai pengisian.');
      return;
    }

    // Generate courses according to semester (Ganjil vs Genap)
    if (semester === 'Ganjil') {
      setGeneratedCourses([
        { code: 'IF301', name: 'Interaksi Manusia Komputer', semester: 3, sks: 3 },
        { code: 'IF302', name: 'Mata Kuliah Pilihan Web', semester: 3, sks: 3 },
        { code: 'IF303', name: 'Statistika', semester: 3, sks: 3 },
        { code: 'IF304', name: 'Proyek Agile', semester: 3, sks: 2 }
      ]);
    } else {
      setGeneratedCourses([
        { code: 'IF201', name: 'Pemrograman Web', semester: 2, sks: 3 },
        { code: 'IF202', name: 'Struktur Data', semester: 2, sks: 3 },
        { code: 'IF203', name: 'Basis Data', semester: 2, sks: 3 }
      ]);
    }

    setIsFormFormed(true);
    showToast(`Form berhasil dibentuk dari data kurikulum semester ${semester.toLowerCase()}.`);
  };

  // Handle "Simpan draf" click
  const handleSaveDraft = async () => {
    setValidationError('');

    if (!isFormFormed || generatedCourses.length === 0) {
      setValidationError('Pilih periode dan kurikulum, lalu tekan Bentuk Form terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createForm({
        academicYear,
        semester,
        curriculum,
        startDate,
        endDate,
        courses: generatedCourses
      });
      showToast('Formulir kompetensi berhasil disimpan sebagai draf.');
      setTimeout(() => {
        navigate('/tu');
      }, 500);
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan draf.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TuLayout>
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[28px] font-bold text-navy leading-tight">
          Buat Form Kompetensi
        </h2>
        <p className="text-[14px] sm:text-[15px] text-slate mt-1 font-normal">
          Pilih periode dan kurikulum, lalu sistem membentuk form dari mata kuliah semester terkait.
        </p>
      </div>

      {/* Validation alert if any */}
      {validationError && (
        <div className="mb-5 p-3.5 bg-danger/10 border border-danger/30 rounded-[10px] text-danger text-[13px] font-semibold flex items-center gap-2">
          <AlertCircle size={17} className="shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Filter Row: SATU BARIS FILTER & DATE (Gambar 3 & 4) */}
      <div className="bg-white rounded-[14px] border border-line p-5 shadow-2xs mb-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3.5">
          {/* Tahun ajaran */}
          <FilterDropdown
            label="Tahun ajaran"
            placeholder="Pilih tahun ajaran"
            options={ACADEMIC_YEARS}
            value={academicYear}
            onChange={(val) => {
              setAcademicYear(val);
              setIsFormFormed(false);
            }}
          />

          {/* Semester */}
          <FilterDropdown
            label="Semester"
            placeholder="Pilih semester"
            options={SEMESTERS}
            value={semester}
            onChange={(val) => {
              setSemester(val);
              setIsFormFormed(false);
            }}
          />

          {/* Kurikulum */}
          <FilterDropdown
            label="Kurikulum"
            placeholder="Pilih kurikulum"
            options={CURRICULUMS}
            value={curriculum}
            onChange={(val) => {
              setCurriculum(val);
              setIsFormFormed(false);
            }}
          />

          {/* Mulai pengisian */}
          <div className="flex-1 min-w-[140px]">
            <label htmlFor="input-start-date" className="block text-[12px] font-semibold text-ink mb-1.5">
              Mulai pengisian
            </label>
            <DatePicker
              id="input-start-date"
              label="Mulai pengisian"
              value={startDate}
              onChange={(val) => {
                setStartDate(val);
                setValidationError('');
              }}
              placeholder="dd/mm/yyyy"
              align="left"
            />
          </div>

          {/* Batas pengisian */}
          <div className="flex-1 min-w-[140px]">
            <label htmlFor="input-end-date" className="block text-[12px] font-semibold text-ink mb-1.5">
              Batas pengisian
            </label>
            <DatePicker
              id="input-end-date"
              label="Batas pengisian"
              value={endDate}
              onChange={(val) => {
                setEndDate(val);
                setValidationError('');
              }}
              placeholder="dd/mm/yyyy"
              align="right"
            />
          </div>

          {/* Tombol Bentuk Form */}
          <div className="shrink-0 mt-2 lg:mt-0">
            <button
              type="button"
              onClick={handleGenerateForm}
              className="w-full lg:w-auto h-[44px] px-6 bg-royal-blue hover:bg-[#153eb5] active:scale-[0.98] text-white font-bold text-[14px] rounded-[10px] transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-royal-blue"
            >
              Bentuk Form
            </button>
          </div>
        </div>
      </div>

      {/* SECTION A: Kompetensi Dosen Pengajar */}
      <div className="bg-white rounded-[14px] border border-line p-6 shadow-2xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-line">
          <h3 className="text-[16px] font-bold text-navy">
            A. Kompetensi dosen pengajar
          </h3>
          <span className="text-[13px] text-slate font-medium">
            Dinilai per mata kuliah, skala 0–8
          </span>
        </div>

        {/* Empty State vs Formed Table */}
        {!isFormFormed || generatedCourses.length === 0 ? (
          <div className="py-12 px-4 text-center text-slate border border-dashed border-line rounded-[12px] bg-ice/40 my-2">
            <p className="text-[14px] font-medium">
              Pilih periode dan kurikulum, lalu tekan Bentuk Form
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-line text-slate">
                  <th scope="col" className="py-3 px-4 text-[13px] font-bold">
                    Kode
                  </th>
                  <th scope="col" className="py-3 px-4 text-[13px] font-bold">
                    Mata kuliah
                  </th>
                  <th scope="col" className="py-3 px-4 text-[13px] font-bold text-center">
                    Semester
                  </th>
                  <th scope="col" className="py-3 px-4 text-[13px] font-bold text-center">
                    SKS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {generatedCourses.map((c) => (
                  <tr key={c.code} className="hover:bg-slate/5 transition-colors">
                    <td className="py-3.5 px-4 text-[14px] font-bold text-navy">
                      {c.code}
                    </td>
                    <td className="py-3.5 px-4 text-[14px] font-semibold text-ink">
                      {c.name}
                    </td>
                    <td className="py-3.5 px-4 text-[14px] text-slate text-center font-medium">
                      {c.semester}
                    </td>
                    <td className="py-3.5 px-4 text-[14px] text-slate text-center font-medium">
                      {c.sks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-[13px] text-slate mt-4 font-normal">
          Daftar diambil otomatis dari data kurikulum yang dikelola KPS. Dosen mengisi nilai 0-8 untuk tiap mata kuliah.
        </p>
      </div>

      {/* SECTION B: Kompetensi Dosen Wali */}
      <div className="bg-white rounded-[14px] border border-line p-6 shadow-2xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 pb-3 border-b border-line">
          <div>
            <h3 className="text-[16px] font-bold text-navy">
              B. Kompetensi dosen wali
            </h3>
            <p className="text-[13px] text-slate mt-1 font-normal">
              Tidak per mata kuliah. Dosen memilih satu level (1–5) untuk tiap aspek.
            </p>
          </div>

          <button
            type="button"
            onClick={() => showToast('Fitur Import Excel aspek kompetensi dosen wali siap digunakan.')}
            className="h-[36px] px-4 bg-amber hover:bg-[#FFBA3D] active:scale-[0.98] text-amber-ink font-bold text-[13px] rounded-[8px] transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber"
          >
            Import Excel
          </button>
        </div>

        {/* 6 Accordions */}
        <div className="space-y-3.5 mt-4">
          {ADVISOR_ASPECTS.map((aspect) => {
            const isOpen = Boolean(openAccordions[aspect.code]);

            return (
              <div
                key={aspect.code}
                className="border border-line rounded-[12px] overflow-hidden bg-white transition-all"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(aspect.code)}
                  className="w-full py-3.5 px-4 flex items-center justify-between text-left hover:bg-slate/5 transition-colors cursor-pointer focus:outline-none focus:bg-slate/5"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-md bg-tint text-royal-blue font-bold text-[13px] flex items-center justify-center shrink-0">
                      {aspect.code}
                    </span>
                    <span className="text-[14px] font-bold text-ink">
                      {aspect.title}
                    </span>
                    <span className="text-[12px] text-slate bg-disabled-bg px-2 py-0.5 rounded font-medium">
                      5 level
                    </span>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`text-slate transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 border-t border-line/60 bg-white animate-accordion-down origin-top">
                    <ol className="space-y-2 mt-2 text-[13px] text-ink leading-relaxed">
                      {aspect.levels.map((lvl, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="font-bold text-slate w-4 shrink-0">
                            {idx + 1}.
                          </span>
                          <span className="font-normal text-ink">
                            {lvl}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-6">
        <p className="text-[13px] text-slate font-medium text-center sm:text-left">
          Ganjil memuat semester 1, 3, 5, 7 dan Genap semester 2, 4, 6, 8.
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/tu')}
            className="h-[44px] px-6 border border-line rounded-[10px] text-ink font-semibold text-[14px] bg-white hover:bg-slate/5 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSaveDraft}
            className="h-[44px] px-6 bg-royal-blue hover:bg-[#153eb5] active:scale-[0.98] text-white font-bold text-[14px] rounded-[10px] transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-royal-blue disabled:opacity-60"
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan draf'}
          </button>
        </div>
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

export default CreateCompetencyFormPage;
