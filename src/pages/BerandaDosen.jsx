import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, LogOut, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const initialCoursesPengajar = [
  {
    id: 1,
    code: 'IF318',
    name: 'Statistika',
    semester: 3,
    sks: 2,
    score: '6',
    description: 'Mata kuliah ini membahas konsep dasar probabilitas, statistika deskriptif, inferensial, serta penerapannya dalam analisis data komputasi.'
  },
  {
    id: 2,
    code: 'PK31F',
    name: 'Pendidikan Kewarganegaraan',
    semester: 3,
    sks: 5,
    score: '5',
    description: 'Mata kuliah ini membentuk wawasan kebangsaan, integritas, dan kesadaran hak dan kewajiban warga negara dalam konteks profesional TI.'
  },
  {
    id: 3,
    code: 'IF314',
    name: 'Proyek Inovasi Agile',
    semester: 1,
    sks: 6,
    score: '7',
    description: 'Mata kuliah berbasis proyek tim untuk mengembangkan produk perangkat lunak menggunakan metodologi Scrum dan prinsip Agile.'
  },
  {
    id: 4,
    code: 'IF317',
    name: 'Interaksi Manusia Komputer',
    semester: 1,
    sks: 4,
    score: '8',
    description: 'Mata kuliah ini mempelajari prinsip desain antarmuka pengguna (UI), pengalaman pengguna (UX), evaluasi heuristik, dan pengujian kegunaan.'
  },
  {
    id: 5,
    code: 'IF315',
    name: 'Rekayasa Perangkat Lunak Lanjut',
    semester: 3,
    sks: 3,
    score: '-',
    description: 'Mata kuliah ini mendalami arsitektur perangkat lunak lanjutan, pola desain, pengujian otomatis, dan DevOps.'
  },
  {
    id: 6,
    code: 'IF316',
    name: 'Mata Kuliah Pilihan Web',
    semester: 3,
    sks: 2,
    score: '-',
    description: 'Mata kuliah ini membahas konsep dan praktik pengembangan aplikasi web modern dengan menggunakan framework.'
  },
];

const initialCoursesWali = [
  {
    id: 101,
    code: 'DW01',
    name: 'Bimbingan Akademik dan Rencana Studi (KRS)',
    semester: 3,
    sks: '-',
    score: '-',
    description: 'Pemantauan perkembangan studi mahasiswa, persetujuan KRS, dan evaluasi capaian IPS/IPK per semester.'
  },
  {
    id: 102,
    code: 'DW02',
    name: 'Monitoring Kehadiran dan Ketertiban Mahasiswa',
    semester: 3,
    sks: '-',
    score: '-',
    description: 'Pemantauan tingkat kehadiran kuliah mahasiswa binaan dan penanganan dini masalah absensi.'
  },
  {
    id: 103,
    code: 'DW03',
    name: 'Konseling dan Penanganan Permasalahan Non-Akademik',
    semester: 3,
    sks: '-',
    score: '-',
    description: 'Pendampingan mahasiswa terkait kendala adaptasi, motivasi, finansial, dan kendala personal.'
  },
  {
    id: 104,
    code: 'DW04',
    name: 'Pengembangan Karakter dan Soft Skills Mahasiswa',
    semester: 3,
    sks: '-',
    score: '-',
    description: 'Pembinaan etika, kedisiplinan, kerjasama tim, dan profesionalisme di lingkungan kampus.'
  },
  {
    id: 105,
    code: 'DW05',
    name: 'Persiapan Karier, Magang, dan Proyek Akhir/PBL',
    semester: 3,
    sks: '-',
    score: '-',
    description: 'Arahan penentuan topik proyek PBL, tempat magang industri, dan kesiapan transisi karier lulusan.'
  },
  {
    id: 106,
    code: 'DW06',
    name: 'Komunikasi dengan Orang Tua/Wali Mahasiswa',
    semester: 3,
    sks: '-',
    score: '-',
    description: 'Penyampaian laporan perkembangan akademik mahasiswa secara berkala kepada orang tua/wali.'
  },
];

const pengajarScaleOptions = [
  { value: '-', label: 'Pilih Nilai' },
  { value: '0', label: '0 - Tidak tahu' },
  { value: '1', label: '1 - Mengetahui definisi' },
  { value: '2', label: '2 - Mengklasifikasi konten' },
  { value: '3', label: '3 - Mendemonstrasikan konten' },
  { value: '4', label: '4 - Menganalisis konten' },
  { value: '5', label: '5 - Memprediksi dan mengelaborasi' },
  { value: '6', label: '6 - Membandingkan dan menyimpulkan' },
  { value: '7', label: '7 - Mengevaluasi dan menjustifikasi' },
  { value: '8', label: '8 - Mengembangkan' },
];

const pengajarScaleGuide = [
  { point: 0, desc: 'Tidak tahu' },
  { point: 1, desc: 'Mengetahui definisi mata kuliah' },
  { point: 2, desc: 'Poin 1 + mampu mengklasifikasi konten mata kuliah' },
  { point: 3, desc: 'Poin 1 + Poin 2 + mampu mendemonstrasikan konten mata kuliah' },
  { point: 4, desc: 'Poin 1 + Poin 2 + Poin 3 + mampu menganalisis konten mata kuliah' },
  { point: 5, desc: 'Poin 1 + Poin 2 + Poin 3 + Poin 4 + mampu memprediksi dan mengelaborasi konten mata kuliah' },
  { point: 6, desc: 'Poin 1 + Poin 2 + Poin 3 + Poin 4 + Poin 5 + mampu membandingkan, mengintegrasikan dan menyimpulkan konten mata kuliah' },
  { point: 7, desc: 'Poin 1 + Poin 2 + Poin 3 + Poin 4 + Poin 5 + Poin 6 + mampu mengevaluasi dan menjustifikasi konten mata kuliah' },
  { point: 8, desc: 'Poin 1 + Poin 2 + Poin 3 + Poin 4 + Poin 5 + Poin 6 + Poin 7 + mampu mengembangkan konten mata kuliah' },
];

const waliScaleOptions = [
  { value: '-', label: 'Pilih Nilai' },
  { value: '1', label: 'Level 1 - Pemahaman Dasar' },
  { value: '2', label: 'Level 2 - Pendampingan Rutin' },
  { value: '3', label: 'Level 3 - Penanganan Kendala Proaktif' },
  { value: '4', label: 'Level 4 - Solusi & Motivasi Berkelanjutan' },
  { value: '5', label: 'Level 5 - Teladan & Praktik Terbaik' },
];

const waliScaleGuide = [
  { point: 1, desc: 'Memahami dasar peran dan tanggung jawab perwalian' },
  { point: 2, desc: 'Mampu memantau progres akademik dan kehadiran rutin mahasiswa' },
  { point: 3, desc: 'Mampu mengidentifikasi serta memfasilitasi penanganan kendala mahasiswa' },
  { point: 4, desc: 'Mampu memberikan bimbingan solutif dan memotivasi prestasi akademik/non-akademik' },
  { point: 5, desc: 'Menjadi teladan dan rujukan praktik terbaik pembinaan mahasiswa' },
];

const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '??';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const BerandaDosen = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Filters state
  const [selectedTahun, setSelectedTahun] = useState('2026/2027');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [selectedProdi, setSelectedProdi] = useState('Teknik Informatika');

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState(null); // 'tahun' | 'semester' | 'prodi' | null
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Tab & Search state
  const [activeTab, setActiveTab] = useState('pengajar'); // 'pengajar' | 'wali'
  const [isScaleOpen, setIsScaleOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Course scores state
  const [coursesPengajar, setCoursesPengajar] = useState(initialCoursesPengajar);
  const [coursesWali, setCoursesWali] = useState(initialCoursesWali);

  // Tooltip state
  const [activeTooltipCourse, setActiveTooltipCourse] = useState(null);

  // Toast & Modal state
  const [toast, setToast] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showToastMessage = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleScoreChange = (id, newScore) => {
    if (activeTab === 'pengajar') {
      setCoursesPengajar((prev) =>
        prev.map((c) => (c.id === id ? { ...c, score: newScore } : c))
      );
    } else {
      setCoursesWali((prev) =>
        prev.map((c) => (c.id === id ? { ...c, score: newScore } : c))
      );
    }
  };

  const currentCourses = activeTab === 'pengajar' ? coursesPengajar : coursesWali;
  const filteredCourses = currentCourses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.code && c.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculations for total filled
  const filledPengajar = coursesPengajar.filter((c) => c.score && c.score !== '-').length;
  const filledWali = coursesWali.filter((c) => c.score && c.score !== '-').length;
  const totalFilled = filledPengajar + filledWali;
  const totalItems = coursesPengajar.length + coursesWali.length;
  const allFilled = totalFilled === totalItems && totalItems > 0;

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate('/login');
  };

  const handleSaveDraft = () => {
    showToastMessage('Draf matriks kompetensi berhasil disimpan.');
  };

  const handleSubmit = () => {
    if (!allFilled) {
      setShowConfirmModal(true);
    } else {
      showToastMessage('Penilaian kompetensi berhasil dikirim ke KPS!');
    }
  };

  const confirmSubmit = () => {
    setShowConfirmModal(false);
    showToastMessage('Penilaian kompetensi berhasil dikirim ke KPS!');
  };

  // Close open popovers when clicking outside
  const closeAllPopovers = () => {
    setOpenDropdown(null);
    setIsProfileOpen(false);
    setActiveTooltipCourse(null);
  };

  const lecturerName = user?.name || 'Qeysha Nadine';
  const lecturerNik = user?.nik || '213452';
  const lecturerProdi = user?.prodi || 'Program Studi Teknik Informatika';
  const lecturerInitials = getInitials(lecturerName);

  return (
    <div className="min-h-screen bg-[#F0F4F9] text-ink font-sans flex flex-col" onClick={closeAllPopovers}>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-white border border-[#CBD5E1] shadow-lg rounded-xl px-4 py-3 text-sm font-semibold text-[#0F1B33] animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={18} className="text-[#16A34A]" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-[#0A2352] text-white py-3.5 px-4 sm:px-8 border-b border-[#071A3D] sticky top-0 z-30">
        <div className="max-w-[1140px] mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5">
            <img
              src={logo}
              alt="Logo SIAP-PBM"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-[10px] object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-[21px] font-bold leading-tight tracking-tight text-white">
                SIAP–PBM
              </h1>
              <p className="text-[12px] text-[#CBD5E1] leading-tight">
                Politeknik Negeri Batam
              </p>
            </div>
          </div>

          {/* Profile Pill Button */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 bg-[#4F6A94]/60 hover:bg-[#4F6A94]/85 text-white pl-1.5 pr-4 py-1 rounded-full border border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
              title="Menu Profil"
            >
              <div className="w-8 h-8 rounded-full bg-[#FFB020] text-[#0A2352] font-bold text-xs flex items-center justify-center shrink-0 shadow-inner">
                {lecturerInitials}
              </div>
              <span className="text-[13px] font-medium text-white tracking-wide">
                Profil Saya
              </span>
            </button>

            {/* Profile Popup */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#CBD5E1] py-3 px-4 text-[#0F1B33] z-40 animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#FFB020] text-[#0A2352] font-extrabold text-sm flex items-center justify-center">
                    {lecturerInitials}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0A2352]">{lecturerName}</p>
                    <p className="text-xs text-gray-500">NIK: {lecturerNik}</p>
                    <span className="inline-block mt-0.5 px-2 py-0.5 bg-blue-50 text-[#1B4FD8] font-semibold text-[11px] rounded">
                      Dosen
                    </span>
                  </div>
                </div>

                <div className="py-2.5 text-xs text-gray-600">
                  <p className="font-semibold text-gray-800">Unit Kerja</p>
                  <p>{lecturerProdi}</p>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  >
                    <LogOut size={14} />
                    Keluar dari Akun
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1140px] w-full mx-auto px-4 sm:px-8 py-7 sm:py-9">
        {/* Row 1: Welcome Greeting & 3 Dropdown Selectors */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">
          {/* Greeting */}
          <div>
            <h2 className="text-2xl sm:text-[27px] font-extrabold text-[#0A2352] tracking-tight leading-tight">
              Selamat datang, {lecturerName}
            </h2>
            <p className="text-xs sm:text-[14px] font-medium text-[#51607A] mt-1">
              Dosen • {lecturerProdi} • NIK {lecturerNik}
            </p>
          </div>

          {/* 3 Selectors */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* 1. Tahun Ajaran */}
            <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'tahun' ? null : 'tahun')}
                className={`bg-white border rounded-[10px] px-3.5 py-1.5 flex items-left justify-between gap-3 min-w-[136px] text-[14px] font-semibold text-ink focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring transition-shadow cursor-pointer ${
                  openDropdown === 'tahun'
                    ? 'border-royal-blue ring-[3px] ring-focus-ring'
                    : 'border-line hover:border-slate/40'
                }`}
                aria-expanded={openDropdown === 'tahun'}
                aria-haspopup="listbox"
                aria-label="Filter berdasarkan tahun ajaran"
              >
                <div>
                  <span className="text-[11px] font-bold text-royal-blue block leading-tight text-left">
                    Tahun Ajaran
                  </span>
                  <span className="text-[14px] font-semibold text-ink block leading-tight mt-0.5">
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
                  {['2026/2027', '2025/2026', '2024/2025'].map((th) => {
                    const isSelected = selectedTahun === th;
                    return (
                      <button
                        key={th}
                        type="button"
                        onClick={() => {
                          setSelectedTahun(th);
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
            <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'semester' ? null : 'semester')}
                className={`bg-white border rounded-[10px] px-3.5 py-1.5 flex items-left justify-between gap-3 min-w-[124px] text-[14px] font-semibold text-ink focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring transition-shadow cursor-pointer ${
                  openDropdown === 'semester'
                    ? 'border-royal-blue ring-[3px] ring-focus-ring'
                    : 'border-line hover:border-slate/40'
                }`}
                aria-expanded={openDropdown === 'semester'}
                aria-haspopup="listbox"
                aria-label="Filter berdasarkan semester"
              >
                <div>
                  <span className="text-[11px] font-bold text-royal-blue block leading-tight text-left">
                    Semester
                  </span>
                  <span className="text-[14px] font-semibold text-ink block leading-tight mt-0.5 text-left">
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
                  className="absolute left-0 mt-1.5 w-full min-w-[130px] bg-white border border-line rounded-[12px] p-1.5 shadow-lg z-40 animate-fade-in"
                  role="listbox"
                >
                  {['Ganjil', 'Genap'].map((sem) => {
                    const isSelected = selectedSemester === sem;
                    return (
                      <button
                        key={sem}
                        type="button"
                        onClick={() => {
                          setSelectedSemester(sem);
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

            {/* 3. Prodi */}
            <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'prodi' ? null : 'prodi')}
                className={`bg-white border rounded-[10px] px-3.5 py-1.5 flex items-left justify-between gap-3 min-w-[170px] text-[14px] font-semibold text-ink focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring transition-shadow cursor-pointer ${
                  openDropdown === 'prodi'
                    ? 'border-royal-blue ring-[3px] ring-focus-ring'
                    : 'border-line hover:border-slate/40'
                }`}
                aria-expanded={openDropdown === 'prodi'}
                aria-haspopup="listbox"
                aria-label="Filter berdasarkan program studi"
              >
                <div>
                  <span className="text-[11px] font-bold text-royal-blue block leading-tight text-left">
                    Prodi
                  </span>
                  <span className="text-[14px] font-semibold text-ink block leading-tight mt-0.5 text-left">
                    {selectedProdi}
                  </span>
                </div>
                {openDropdown === 'prodi' ? (
                  <ChevronUp size={18} className="text-slate shrink-0 ml-2" />
                ) : (
                  <ChevronDown size={18} className="text-slate shrink-0 ml-2" />
                )}
              </button>

              {openDropdown === 'prodi' && (
                <div
                  className="absolute right-0 sm:left-0 sm:right-auto mt-1.5 min-w-[260px] w-max max-w-[320px] bg-white border border-line rounded-[12px] p-1.5 shadow-lg z-40 animate-fade-in"
                  role="listbox"
                >
                  {['Teknik Informatika', 'Rekayasa Keamanan Siber', 'Teknologi Rekayasa Multimedia'].map((prd) => {
                    const isSelected = selectedProdi === prd;
                    return (
                      <button
                        key={prd}
                        type="button"
                        onClick={() => {
                          setSelectedProdi(prd);
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
                        {prd}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Main Competency Card */}
        <div className="bg-white rounded-[20px] border border-[#D8E0EE] p-6 sm:p-8 shadow-[0_4px_24px_rgba(10,35,82,0.04)]">
          {/* Card Top: Title & Description */}
          <div className="mb-5">
            <h3 className="text-2xl sm:text-[27px] font-bold text-[#0D2554] tracking-tight">
              Matriks Kompetensi Saya
            </h3>
            <p className="text-xs sm:text-[14px] text-[#51607A] font-normal mt-1 leading-relaxed">
              Satu form berisi dua bagian: nilai 0–8 untuk tiap mata kuliah dan level 1–5 untuk tiap aspek dosen wali. Keduanya dikirim bersama.
            </p>
          </div>

          {/* Tabs Row */}
          <div className="flex items-center gap-2.5 mb-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab('pengajar');
                setSearchQuery('');
              }}
              className={`text-xs sm:text-[13px] font-bold py-2 px-5 rounded-[8px] transition-all cursor-pointer ${
                activeTab === 'pengajar'
                  ? 'bg-[#0D2554] text-white shadow-xs'
                  : 'bg-white border border-[#0D2554] text-[#0D2554] hover:bg-[#F3F6FB]'
              }`}
            >
              Dosen Pengajar
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('wali');
                setSearchQuery('');
              }}
              className={`text-xs sm:text-[13px] font-bold py-2 px-5 rounded-[8px] transition-all cursor-pointer ${
                activeTab === 'wali'
                  ? 'bg-[#0D2554] text-white shadow-xs'
                  : 'bg-white border border-[#0D2554] text-[#0D2554] hover:bg-[#F3F6FB]'
              }`}
            >
              Dosen Wali
            </button>
          </div>

          {/* Petunjuk Skala Penilaian Dropdown (Full-width) */}
          <div className="border border-[#BFDBFE] bg-white rounded-[10px] overflow-hidden mb-4 transition-all">
            <button
              type="button"
              onClick={() => setIsScaleOpen(!isScaleOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-blue-50/20 transition cursor-pointer"
              aria-expanded={isScaleOpen}
            >
              <div className="flex items-center gap-2.5">
                <span className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-xs font-bold px-2 py-0.5 rounded-md">
                  {activeTab === 'pengajar' ? '0 – 8' : '1 – 5'}
                </span>
                <span className="text-[13px] font-bold text-[#0F1B33]">
                  {activeTab === 'pengajar' ? 'Petunjuk Skala Penilaian' : 'Petunjuk Skala Penilaian Dosen Wali'}
                </span>
              </div>
              {isScaleOpen ? (
                <ChevronUp size={18} className="text-[#0F1B33] shrink-0" />
              ) : (
                <ChevronDown size={18} className="text-[#0F1B33] shrink-0" />
              )}
            </button>

            {isScaleOpen && (
              <div className="px-4 pb-3.5 pt-1.5 border-t border-[#E2E8F0] space-y-2 text-xs sm:text-[13px] text-[#334155]">
                {(activeTab === 'pengajar' ? pengajarScaleGuide : waliScaleGuide).map((guide) => (
                  <div key={guide.point} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md border border-[#94A3B8] text-[11px] font-bold flex items-center justify-center shrink-0 text-[#334155]">
                      {guide.point}
                    </span>
                    <span className="leading-tight pt-0.5">{guide.desc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Full-width Search Bar */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder={activeTab === 'pengajar' ? 'Cari mata kuliah' : 'Cari aspek dosen wali'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#CBD5E1] rounded-[9px] px-4 py-2.5 text-[14px] text-ink placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1B4FD8] focus:ring-2 focus:ring-[#1B4FD8]/15 transition"
            />
          </div>

          {/* Table Container */}
          <div className="bg-[#F4F7FC] rounded-[13px] border border-[#E2E8F0]/70 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead className="text-[#0F1B33]">
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="py-3.5 px-4 sm:px-6 text-[14px] font-bold tracking-wide">
                      Kode
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-[14px] font-bold tracking-wide">
                      {activeTab === 'pengajar' ? 'Mata kuliah' : 'Aspek Pembimbingan'}
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-[14px] font-bold text-center tracking-wide">
                      Semester
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-[14px] font-bold text-center tracking-wide">
                      SKS
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-[14px] font-bold tracking-wide">
                      {activeTab === 'pengajar' ? 'NILAI (0–8)' : 'LEVEL (1–5)'}
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-[14px] font-bold text-center tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-[#51607A]">
                        Tidak ada data yang cocok dengan "{searchQuery}"
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((item) => {
                      const isFilled = item.score && item.score !== '-';
                      return (
                        <tr
                          key={item.id}
                          className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-white/50 transition-colors"
                        >
                          {/* Kode */}
                          <td className="py-3.5 px-4 sm:px-6 text-[13px] sm:text-[14px] font-medium text-[#0F1B33]">
                            {item.code}
                          </td>

                          {/* Mata kuliah / Aspek */}
                          <td className="py-3.5 px-4 sm:px-6 text-[13px] sm:text-[14px] font-medium text-[#0F1B33]">
                            <div className="flex items-center gap-1.5">
                              <span>{item.name}</span>
                              <div className="relative inline-flex items-center" onClick={(e) => e.stopPropagation()}>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTooltipCourse(activeTooltipCourse?.id === item.id ? null : item);
                                  }}
                                  onMouseEnter={() => setActiveTooltipCourse(item)}
                                  onMouseLeave={() => setActiveTooltipCourse(null)}
                                  className="text-[#3B82F6] hover:text-[#1D4ED8] p-0.5 rounded-full hover:bg-blue-50 transition cursor-pointer"
                                  title="Lihat deskripsi"
                                  aria-label={`Info ${item.name}`}
                                >
                                  <Info size={16} />
                                </button>

                                {activeTooltipCourse?.id === item.id && (
                                  <div
                                    className="absolute left-6 top-full sm:top-auto sm:left-7 z-50 w-72 sm:w-80 bg-white border border-[#CBD5E1] rounded-xl p-3.5 shadow-xl text-left pointer-events-none animate-in fade-in zoom-in-95"
                                    role="tooltip"
                                  >
                                    <div className="font-bold text-sm text-[#0F1B33]">
                                      {item.name} <span className="font-medium text-[#64748B]">({item.code})</span>
                                    </div>
                                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Semester */}
                          <td className="py-3.5 px-4 sm:px-6 text-center text-[13px] sm:text-[14px] font-medium text-[#0F1B33]">
                            {item.semester}
                          </td>

                          {/* SKS */}
                          <td className="py-3.5 px-4 sm:px-6 text-center text-[13px] sm:text-[14px] font-medium text-[#0F1B33]">
                            {item.sks}
                          </td>

                          {/* NILAI (0-8) / LEVEL (1-5) */}
                          <td className="py-3.5 px-4 sm:px-6">
                            <div className="relative w-full max-w-[280px]">
                              <select
                                value={item.score}
                                onChange={(e) => handleScoreChange(item.id, e.target.value)}
                                className="w-full appearance-none bg-white border border-[#CBD5E1] text-[#0F1B33] text-[13px] font-medium rounded-[8px] py-1.5 pl-3 pr-8 cursor-pointer shadow-2xs hover:border-[#1B4FD8] focus:outline-none focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8] transition text-left"
                              >
                                {(activeTab === 'pengajar' ? pengajarScaleOptions : waliScaleOptions).map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown
                                size={15}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                              />
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="py-3.5 px-4 sm:px-6 text-center">
                            {isFilled ? (
                              <span className="inline-block px-3 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[11px] font-semibold rounded-full min-w-[76px]">
                                Terisi
                              </span>
                            ) : (
                              <span className="inline-block px-3 py-0.5 bg-[#FEE2E2] text-[#DC2626] text-[11px] font-semibold rounded-full min-w-[76px]">
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

          {/* Bottom Actions Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            {/* Status Summary Helper Text */}
            <p className="text-xs sm:text-[13px] text-[#51607A] font-medium order-2 sm:order-1">
              {totalFilled} dari {totalItems} isian terisi. Kirim aktif setelah bagian A dan B terisi semua.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3.5 order-1 sm:order-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-white hover:bg-blue-50/40 border border-[#2563EB] text-[#2563EB] font-bold text-xs sm:text-[13px] px-6 py-2.5 rounded-[9px] shadow-2xs transition-colors cursor-pointer"
              >
                Simpan draf
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!allFilled}
                className={`font-bold text-xs sm:text-[13px] px-8 py-2.5 rounded-[9px] shadow-2xs transition-all ${
                  allFilled
                    ? 'bg-[#0D2554] hover:bg-[#071A3D] text-white cursor-pointer'
                    : 'bg-[#DDE2EA] text-[#94A3B8] cursor-not-allowed'
                }`}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal for Unfinished Submissions */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-amber-600 mb-3">
              <AlertCircle size={24} />
              <h4 className="text-lg font-bold text-[#0A2352]">Konfirmasi Pengiriman</h4>
            </div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Masih terdapat isian dengan status <span className="font-semibold text-red-600">Belum Terisi</span> ({totalItems - totalFilled} isian belum diisi). Apakah Anda yakin ingin mengirim penilaian sekarang?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Kembali Lengkapi
              </button>
              <button
                type="button"
                onClick={confirmSubmit}
                className="px-5 py-2 bg-[#0D2554] hover:bg-[#071A3D] rounded-lg text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                Tetap Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BerandaDosen;
