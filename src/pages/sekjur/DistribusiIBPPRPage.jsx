import React, { useState, useMemo } from 'react';
import { ChevronDown, Download, FolderOpen, SearchX } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useAuth } from '../../context/AuthContext';
import SekjurNavbar from '../../components/sekjur/SekjurNavbar';
import SekjurSidebar from '../../components/sekjur/SekjurSidebar';
import SekjurFilterBar from '../../components/sekjur/SekjurFilterBar';
import Toast from '../../components/common/Toast';

const DUMMY_DOSEN_IBPPR_BY_PRODI = {
  'Teknik Informatika': [
    { id: 1, name: 'Yeni Rokhayati, S.S.T., M.Sc.', nip: '112093', pengajaran: 10, riset: 3, pengabdian: 2, total: 15, status: 'Sesuai' },
    { id: 2, name: 'Dr. Ahmad Hamim Thohari, S.T., M.T.', nip: '113045', pengajaran: 12, riset: 4, pengabdian: 2, total: 18, status: 'Berlebih' },
    { id: 3, name: 'Nadya Satya Handayani, M.Kom.', nip: '114088', pengajaran: 8, riset: 2, pengabdian: 1, total: 11, status: 'Kurang' },
    { id: 4, name: 'Dwi Amalia Purnamasari, S.T., M.Kom.', nip: '115012', pengajaran: 14, riset: 3, pengabdian: 2, total: 19, status: 'Berlebih' },
    { id: 5, name: 'Swono Sibagariang, S.Kom., M.Kom.', nip: '116034', pengajaran: 12, riset: 2, pengabdian: 2, total: 16, status: 'Sesuai' },
    { id: 6, name: 'Sri Rahayu, S.Pd., M.Ed.', nip: '117078', pengajaran: 10, riset: 3, pengabdian: 1, total: 14, status: 'Sesuai' }
  ],
  'Teknik Rekayasa Perangkat Lunak': [
    { id: 201, name: 'Dwi Amalia Purnamasari, S.T., M.Kom.', nip: '115012', pengajaran: 12, riset: 3, pengabdian: 1, total: 16, status: 'Sesuai' },
    { id: 202, name: 'Swono Sibagariang, S.Kom., M.Kom.', nip: '116034', pengajaran: 11, riset: 2, pengabdian: 2, total: 15, status: 'Sesuai' },
    { id: 203, name: 'Arif Basofi, S.Kom., M.T.', nip: '118021', pengajaran: 14, riset: 4, pengabdian: 1, total: 19, status: 'Berlebih' },
    { id: 204, name: 'Nur Zahrati Janah, M.Kom.', nip: '118042', pengajaran: 8, riset: 2, pengabdian: 1, total: 11, status: 'Kurang' },
    { id: 205, name: 'Hamim Tohari, M.T.', nip: '113045', pengajaran: 10, riset: 3, pengabdian: 2, total: 15, status: 'Sesuai' }
  ],
  'Animasi': [
    { id: 301, name: 'Selvi Triana, M.Ds.', nip: '119011', pengajaran: 12, riset: 2, pengabdian: 1, total: 15, status: 'Sesuai' },
    { id: 302, name: 'Rangga Pratama, M.Sn.', nip: '119025', pengajaran: 14, riset: 3, pengabdian: 2, total: 19, status: 'Berlebih' },
    { id: 303, name: 'Dian Permatasari, M.Sn.', nip: '119033', pengajaran: 8, riset: 1, pengabdian: 1, total: 10, status: 'Kurang' },
    { id: 304, name: 'Bayu Aji, M.Kom.', nip: '119044', pengajaran: 10, riset: 3, pengabdian: 2, total: 15, status: 'Sesuai' }
  ],
  'Rekayasa Keamanan Siber': [
    { id: 401, name: 'Budi Santoso, M.Kom., CEH', nip: '120012', pengajaran: 12, riset: 4, pengabdian: 1, total: 17, status: 'Berlebih' },
    { id: 402, name: 'Maya Indah, M.T., CISSP', nip: '120023', pengajaran: 10, riset: 3, pengabdian: 2, total: 15, status: 'Sesuai' },
    { id: 403, name: 'Rizky Kurniawan, M.Kom.', nip: '120034', pengajaran: 8, riset: 2, pengabdian: 1, total: 11, status: 'Kurang' },
    { id: 404, name: 'Fajar Nugroho, M.T.', nip: '120045', pengajaran: 10, riset: 2, pengabdian: 2, total: 14, status: 'Sesuai' }
  ],
  'Teknologi Rekayasa Multimedia': [
    { id: 501, name: 'Fauzi Rahman, M.Ds.', nip: '121011', pengajaran: 12, riset: 2, pengabdian: 2, total: 16, status: 'Sesuai' },
    { id: 502, name: 'Rina Septiana, M.Sn.', nip: '121022', pengajaran: 10, riset: 3, pengabdian: 1, total: 14, status: 'Sesuai' },
    { id: 503, name: 'Agung Wicaksono, M.Kom.', nip: '121033', pengajaran: 14, riset: 3, pengabdian: 2, total: 19, status: 'Berlebih' },
    { id: 504, name: 'Mira Handayani, M.T.', nip: '121044', pengajaran: 8, riset: 1, pengabdian: 1, total: 10, status: 'Kurang' }
  ],
  'Teknik Geomatika': [
    { id: 601, name: 'Hendra Wijaya, S.T., M.Eng.', nip: '122011', pengajaran: 12, riset: 3, pengabdian: 1, total: 16, status: 'Sesuai' },
    { id: 602, name: 'Siti Fatimah, S.T., M.Sc.', nip: '122022', pengajaran: 10, riset: 2, pengabdian: 2, total: 14, status: 'Sesuai' },
    { id: 603, name: 'Yusuf Maulana, M.T.', nip: '122033', pengajaran: 8, riset: 2, pengabdian: 1, total: 11, status: 'Kurang' },
    { id: 604, name: 'Eko Prasetyo, M.Eng.', nip: '122044', pengajaran: 14, riset: 4, pengabdian: 2, total: 20, status: 'Berlebih' }
  ]
};

const DistribusiIBPPRPage = () => {
  const { user } = useAuth();
  const userName = user?.name || 'Qeysha Nadine';
  const userNik = user?.nik || user?.nip || '122288';
  const userRole = user?.role === 'Sekjur' || !user ? 'Sekretaris Jurusan' : user.role;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('ibppr');

  // Top header filters
  const [selectedTahun, setSelectedTahun] = useState('2026/2027');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [selectedProdi, setSelectedProdi] = useState('Teknik Informatika');

  // Table filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', isError: false });

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
  };

  // Periode aktif semester: Ganjil 2026/2027
  const isPeriodActive = selectedTahun === '2026/2027' && selectedSemester === 'Ganjil';

  // Filtered lecturers
  const filteredDosen = useMemo(() => {
    if (!isPeriodActive) return [];

    const prodiList = DUMMY_DOSEN_IBPPR_BY_PRODI[selectedProdi] || [];

    return prodiList.filter((item) => {
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nip.includes(searchQuery);

      const matchStatus =
        selectedStatus === 'Semua Status' ||
        item.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [selectedProdi, searchQuery, selectedStatus, isPeriodActive]);

  const handleExportExcel = () => {
    if (!isPeriodActive || filteredDosen.length === 0) {
      showToast('Tidak ada data yang dapat diekspor pada periode ini.', true);
      return;
    }

    try {
      const headers = [
        'No',
        'Nama Dosen',
        'NIP',
        'SKS Pengajaran',
        'SKS Riset',
        'SKS Pengabdian',
        'Total SKS',
        'Status Beban'
      ];

      const rows = filteredDosen.map((item, index) => [
        index + 1,
        item.name,
        item.nip,
        item.pengajaran,
        item.riset,
        item.pengabdian,
        item.total,
        item.status
      ]);

      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Distribusi IBPPR');
      XLSX.writeFile(
        wb,
        `Distribusi_IBPPR_${selectedProdi.replace(/\s+/g, '_')}_${selectedTahun.replace('/', '-')}.xlsx`
      );
      showToast('Data Distribusi IBPPR berhasil diekspor!');
    } catch {
      showToast('Gagal mengekspor data', true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6FB] flex flex-col font-sans">
      {/* Toast Alert */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.isError ? 'error' : 'success'}
          onClose={() => setToast({ show: false, message: '', isError: false })}
        />
      )}

      {/* Top Navbar */}
      <SekjurNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Main Container: Sidebar + Page Content */}
      <div className="flex-1 flex w-full relative">
        <SekjurSidebar
          isOpen={isSidebarOpen}
          activeMenu={activeMenu}
          onSelectMenu={(menuId) => setActiveMenu(menuId)}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="w-full max-w-[1200px] mx-auto">
            {/* Welcome Banner / Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-[27px] font-bold text-[#0A2352] tracking-tight leading-tight">
                  Selamat datang, {userName}
                </h2>
                <p className="text-[13px] sm:text-[14px] text-[#51607A] font-medium mt-1">
                  {userRole} {selectedProdi} • NIP {userNik}
                </p>
              </div>

              {/* Three Top Filters */}
              <SekjurFilterBar
                selectedTahun={selectedTahun}
                onTahunChange={setSelectedTahun}
                selectedSemester={selectedSemester}
                onSemesterChange={setSelectedSemester}
                selectedProdi={selectedProdi}
                onProdiChange={setSelectedProdi}
              />
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-[16px] border border-[#D8E0EE] p-5 sm:p-7 shadow-[0_2px_12px_rgba(10,35,82,0.03)]">
              {/* Card Title & Subtitle */}
              <div>
                <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0A2352] leading-tight">
                  Beban Kinerja Dosen (IBPPR)
                </h3>
                <p className="text-[13px] sm:text-[13.5px] text-[#51607A] mt-1.5 leading-relaxed">
                  Pemantauan distribusi beban pembelajaran, pembimbingan, pengajaran, dan riset dosen Program Studi {selectedProdi}.
                </p>
              </div>

              {/* Controls Bar */}
              <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5 flex-1">
                  {/* Search Input */}
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama dosen / NIP"
                      disabled={!isPeriodActive}
                      className="w-full h-[40px] pl-3.5 pr-9 bg-white border border-[#CBD5E1] rounded-[9px] text-[13.5px] text-[#0F1B33] placeholder-[#94A3B8] focus:outline-none focus:border-[#1B4FD8] focus:ring-[3px] focus:ring-[#D6DFF8] transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* Dropdown Status */}
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      disabled={!isPeriodActive}
                      className="h-[40px] appearance-none bg-white border border-[#CBD5E1] rounded-[9px] pl-3.5 pr-8 text-[13.5px] font-medium text-[#0F1B33] focus:outline-none focus:border-[#1B4FD8] focus:ring-[3px] focus:ring-[#D6DFF8] transition-all cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
                    >
                      <option value="Semua Status">Semua Status Beban</option>
                      <option value="Sesuai">Sesuai (12 - 16 SKS)</option>
                      <option value="Berlebih">Berlebih (&gt; 16 SKS)</option>
                      <option value="Kurang">Kurang (&lt; 12 SKS)</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#51607A] pointer-events-none"
                    />
                  </div>
                </div>

                {/* Right Button: Export Excel */}
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={handleExportExcel}
                    disabled={!isPeriodActive || filteredDosen.length === 0}
                    className="h-[40px] px-4.5 bg-[#FFB020] hover:bg-[#EAA11A] text-[#0A2352] font-bold text-[13.5px] rounded-[9px] shadow-xs flex items-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download size={16} />
                    <span>Export Excel</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="mt-5 border border-[#E2E8F0] rounded-[12px] overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#0A2352] font-bold text-[13px]">
                        <th className="py-3.5 px-4 text-center w-14">No.</th>
                        <th className="py-3.5 px-4">Nama Dosen & NIP</th>
                        <th className="py-3.5 px-4 text-center w-32">Pengajaran</th>
                        <th className="py-3.5 px-4 text-center w-28">Riset</th>
                        <th className="py-3.5 px-4 text-center w-32">Pengabdian</th>
                        <th className="py-3.5 px-4 text-center w-28">Total SKS</th>
                        <th className="py-3.5 px-4 text-center w-32">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {!isPeriodActive ? (
                        <tr>
                          <td colSpan={7} className="py-16 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-[#E8EEFC] flex items-center justify-center text-[#1B4FD8] mb-3">
                                <FolderOpen size={26} strokeWidth={1.8} />
                              </div>
                              <h4 className="text-[16px] font-bold text-[#0F1B33]">
                                Belum ada data
                              </h4>
                              <p className="text-[13px] text-[#51607A] max-w-md mt-1 leading-relaxed">
                                {selectedSemester === 'Genap'
                                  ? 'Masa perkuliahan aktif saat ini adalah Semester Ganjil 2026/2027. Belum ada data untuk Semester Genap.'
                                  : `Tidak ada data distribusi IBPPR untuk Tahun Ajaran ${selectedTahun} Semester ${selectedSemester}.`}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : filteredDosen.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-14 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#51607A] mb-2.5">
                                <SearchX size={22} strokeWidth={1.8} />
                              </div>
                              <h4 className="text-[15px] font-bold text-[#0F1B33]">
                                Data tidak ditemukan
                              </h4>
                              <p className="text-[13px] text-[#51607A] max-w-sm mt-0.5">
                                Tidak ada data dosen yang sesuai dengan pencarian atau filter yang dipilih.
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredDosen.map((item, index) => {
                          let badgeBg = 'bg-[#D1FADF] text-[#027A48]';
                          if (item.status === 'Berlebih') {
                            badgeBg = 'bg-[#FFE9BF] text-[#6B4400]';
                          } else if (item.status === 'Kurang') {
                            badgeBg = 'bg-[#FEE4E2] text-[#D92D20]';
                          }

                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-[#F8FAFC]/80 transition-colors"
                            >
                              <td className="py-4 px-4 text-center text-[#51607A] font-medium">
                                {index + 1}
                              </td>
                              <td className="py-4 px-4">
                                <div className="font-bold text-[#0F1B33]">
                                  {item.name}
                                </div>
                                <div className="text-[12px] text-[#51607A] mt-0.5">
                                  NIP: {item.nip}
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center font-medium text-[#0F1B33]">
                                {item.pengajaran} SKS
                              </td>
                              <td className="py-4 px-4 text-center font-medium text-[#0F1B33]">
                                {item.riset} SKS
                              </td>
                              <td className="py-4 px-4 text-center font-medium text-[#0F1B33]">
                                {item.pengabdian} SKS
                              </td>
                              <td className="py-4 px-4 text-center font-bold text-[#0A2352]">
                                {item.total} SKS
                              </td>
                              <td className="py-4 px-4 text-center">
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-[12px] font-bold ${badgeBg}`}
                                >
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Note */}
              {isPeriodActive && (
                <div className="mt-5 text-[12.5px] text-[#64748B]">
                  Beban standar dosen tetap adalah rentang 12 hingga 16 SKS per semester sesuai ketentuan BKD/IBPPR.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DistribusiIBPPRPage;
