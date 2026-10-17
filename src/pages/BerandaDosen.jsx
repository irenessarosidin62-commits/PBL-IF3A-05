import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const initialCoursesPengajar = [
  { id: 1, name: 'Statistika', score: '6' },
  { id: 2, name: 'Pendidikan Kewarganegaraan', score: '6' },
  { id: 3, name: 'Proyek Inovasi Agile', score: '6' },
  { id: 4, name: 'Interaksi Manusia Komputer', score: '6' },
  { id: 5, name: 'Rekayasa Perangkat Lunak Lanjut', score: '-' },
  { id: 6, name: 'Mata Kuliah Pilihan Web', score: '-' },
];

const initialCoursesWali = [
  { id: 101, name: 'Pemrograman Berorientasi Objek', score: '6' },
  { id: 102, name: 'Struktur Data & Algoritma', score: '5' },
  { id: 103, name: 'Basis Data Terdistribusi', score: '-' },
  { id: 104, name: 'Jaringan Komputer', score: '-' },
];

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
  const [searchQuery, setSearchQuery] = useState('');

  // Course scores state
  const [coursesPengajar, setCoursesPengajar] = useState(initialCoursesPengajar);
  const [coursesWali, setCoursesWali] = useState(initialCoursesWali);

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
      setCoursesPengajar(prev =>
        prev.map(c => (c.id === id ? { ...c, score: newScore } : c))
      );
    } else {
      setCoursesWali(prev =>
        prev.map(c => (c.id === id ? { ...c, score: newScore } : c))
      );
    }
  };

  const currentCourses = activeTab === 'pengajar' ? coursesPengajar : coursesWali;
  const filteredCourses = currentCourses.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    const uncompleted = currentCourses.filter(c => c.score === '-');
    if (uncompleted.length > 0) {
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
  };

  const lecturerName = user?.name || 'Qeysha Nadine';
  const lecturerNik = user?.nik || '213452';
  const lecturerProdi = user?.prodi || 'Program Studi Teknik Informatika';

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
              className="flex items-center gap-2.5 bg-[#4F6A94]/60 hover:bg-[#4F6A94]/85 text-white pl-1.5 pr-4 py-1 rounded-full border border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
              title="Menu Profil"
            >
              <div className="w-8 h-8 rounded-full bg-[#FFB020] text-[#0A2352] font-bold text-xs flex items-center justify-center shrink-0 shadow-inner">
                QN
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
                    QN
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
                  <p className="font-semibold text-gray-800">Unit Kerja:</p>
                  <p>{lecturerProdi}</p>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
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
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'tahun' ? null : 'tahun')}
                className="bg-white border-2 border-[#1B4FD8] rounded-[11px] px-3.5 py-1.5 flex items-center justify-between gap-3 min-w-[136px] shadow-xs hover:bg-blue-50/30 transition text-left focus:outline-none"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#1B4FD8] block leading-tight">
                    Tahun Ajaran
                  </span>
                  <span className="text-[14px] font-extrabold text-[#0A2352] block leading-tight mt-0.5">
                    {selectedTahun}
                  </span>
                </div>
                <ChevronDown size={16} className="text-[#0A2352] shrink-0" />
              </button>

              {openDropdown === 'tahun' && (
                <div className="absolute left-0 mt-1.5 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-30">
                  {['2026/2027', '2025/2026', '2024/2025'].map((th) => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => {
                        setSelectedTahun(th);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${selectedTahun === th ? 'bg-blue-50 text-[#1B4FD8]' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Semester */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'semester' ? null : 'semester')}
                className="bg-white border-2 border-[#1B4FD8] rounded-[11px] px-3.5 py-1.5 flex items-center justify-between gap-3 min-w-[124px] shadow-xs hover:bg-blue-50/30 transition text-left focus:outline-none"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#1B4FD8] block leading-tight">
                    Semester
                  </span>
                  <span className="text-[14px] font-extrabold text-[#0A2352] block leading-tight mt-0.5">
                    {selectedSemester}
                  </span>
                </div>
                <ChevronDown size={16} className="text-[#0A2352] shrink-0" />
              </button>

              {openDropdown === 'semester' && (
                <div className="absolute left-0 mt-1.5 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-30">
                  {['Ganjil', 'Genap'].map((sem) => (
                    <button
                      key={sem}
                      type="button"
                      onClick={() => {
                        setSelectedSemester(sem);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${selectedSemester === sem ? 'bg-blue-50 text-[#1B4FD8]' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Prodi */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'prodi' ? null : 'prodi')}
                className="bg-white border-2 border-[#1B4FD8] rounded-[11px] px-3.5 py-1.5 flex items-center justify-between gap-3 min-w-[170px] shadow-xs hover:bg-blue-50/30 transition text-left focus:outline-none"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#1B4FD8] block leading-tight">
                    Prodi
                  </span>
                  <span className="text-[14px] font-extrabold text-[#0A2352] block leading-tight mt-0.5">
                    {selectedProdi}
                  </span>
                </div>
                <ChevronDown size={16} className="text-[#0A2352] shrink-0" />
              </button>

              {openDropdown === 'prodi' && (
                <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-30">
                  {['Teknik Informatika', 'Rekayasa Keamanan Siber', 'Teknologi Rekayasa Multimedia'].map((prd) => (
                    <button
                      key={prd}
                      type="button"
                      onClick={() => {
                        setSelectedProdi(prd);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${selectedProdi === prd ? 'bg-blue-50 text-[#1B4FD8]' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {prd}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Main Competency Card */}
        <div className="bg-white rounded-[20px] border border-[#D8E0EE] p-6 sm:p-8 shadow-[0_4px_24px_rgba(10,35,82,0.04)]">
          {/* Card Top: Title & Scale Info */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-5">
            <h3 className="text-2xl sm:text-[27px] font-bold text-[#0A2352] tracking-tight">
              Matriks Kompetensi Saya
            </h3>
            <span className="text-xs sm:text-[13px] text-[#51607A] font-medium">
              Skala penilaian 0–6, disusun berdasarkan data kurikulum
            </span>
          </div>

          {/* Action Row: Search Bar & Tabs */}
          <div className="flex flex-col md:flex-row items-center gap-3.5 mb-5">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <input
                type="text"
                placeholder="Cari mata kuliah"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded-[9px] px-4 py-2.5 text-[14px] text-ink placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1B4FD8] focus:ring-2 focus:ring-[#1B4FD8]/15 transition"
              />
            </div>

            {/* Role Tabs */}
            <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('pengajar')}
                className={`flex-1 md:flex-initial text-xs sm:text-[13px] font-bold py-2.5 px-6 rounded-[8px] transition-all shadow-xs ${activeTab === 'pengajar'
                    ? 'bg-[#0A2352] text-white hover:bg-[#071A3D]'
                    : 'bg-white border border-[#0A2352] text-[#0A2352] hover:bg-[#F3F6FB]'
                  }`}
              >
                Dosen pengajar
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wali')}
                className={`flex-1 md:flex-initial text-xs sm:text-[13px] font-bold py-2.5 px-6 rounded-[8px] transition-all shadow-xs ${activeTab === 'wali'
                    ? 'bg-[#0A2352] text-white hover:bg-[#071A3D]'
                    : 'bg-white border border-[#0A2352] text-[#0A2352] hover:bg-[#F3F6FB]'
                  }`}
              >
                Dosen wali
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-[#F4F7FC] rounded-[13px] border border-[#E2E8F0]/70 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#0F1B33]">
                    <th className="py-4 px-6 text-[15px] font-extrabold tracking-wide">
                      MATA KULIAH
                    </th>
                    <th className="py-4 px-6 text-[15px] font-extrabold text-center w-36 tracking-wide">
                      NILAI (0–8)
                    </th>
                    <th className="py-4 px-6 text-[15px] font-extrabold text-center w-36 tracking-wide">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-sm text-[#51607A]">
                        Tidak ada mata kuliah yang cocok dengan "{searchQuery}"
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((item) => {
                      const isFilled = item.score !== '-';
                      return (
                        <tr
                          key={item.id}
                          className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-white/40 transition-colors"
                        >
                          {/* Course Name */}
                          <td className="py-4 px-6 text-[14px] font-semibold text-[#0F1B33]">
                            {item.name}
                          </td>

                          {/* Score Select */}
                          <td className="py-4 px-6 text-center">
                            <div className="relative inline-block">
                              <select
                                value={item.score}
                                onChange={(e) => handleScoreChange(item.id, e.target.value)}
                                className="appearance-none bg-white border border-[#CBD5E1] text-[#0F1B33] font-bold text-sm rounded-[7px] py-1 pl-3 pr-7 min-w-[70px] text-center cursor-pointer shadow-2xs hover:border-[#1B4FD8] focus:outline-none focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8] transition"
                              >
                                <option value="-">-</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                              </select>
                              <ChevronDown
                                size={14}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                              />
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="py-4 px-6 text-center">
                            {isFilled ? (
                              <span className="inline-block px-3.5 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[11px] font-semibold rounded-full min-w-[76px]">
                                Terisi
                              </span>
                            ) : (
                              <span className="inline-block px-3.5 py-0.5 bg-[#FEE2E2] text-[#B91C1C] text-[11px] font-semibold rounded-full min-w-[76px]">
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

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#0F1B33] font-bold text-sm px-6 py-2.5 rounded-[9px] shadow-2xs transition-colors"
            >
              Simpan Draf
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#FFA800] hover:bg-[#F59E0B] text-[#4A3000] font-bold text-sm px-8 py-2.5 rounded-[9px] shadow-sm transition-colors"
            >
              Kirim
            </button>
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
              Masih terdapat mata kuliah dengan status <span className="font-semibold text-red-600">Belum Terisi</span>. Apakah Anda yakin ingin mengirim penilaian sekarang?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Kembali Lengkapi
              </button>
              <button
                type="button"
                onClick={confirmSubmit}
                className="px-5 py-2 bg-[#FFA800] hover:bg-[#F59E0B] rounded-lg text-xs font-bold text-[#4A3000] shadow-xs"
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
