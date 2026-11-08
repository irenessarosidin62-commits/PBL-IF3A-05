import React, { useState, useMemo } from 'react';
import { ChevronDown, Pencil, CheckSquare, Square, FolderOpen, SearchX } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useAuth } from '../../context/AuthContext';
import SekjurNavbar from '../../components/sekjur/SekjurNavbar';
import SekjurSidebar from '../../components/sekjur/SekjurSidebar';
import SekjurFilterBar from '../../components/sekjur/SekjurFilterBar';
import EditStrategiDialog from '../../components/sekjur/EditStrategiDialog';
import Toast from '../../components/common/Toast';

const INITIAL_RESOURCES_BY_PRODI = {
  'Teknik Informatika': [
    {
      id: 1,
      name: 'Ruang kelas',
      category: 'Sarana',
      dibutuhkan: 8,
      tersedia: 9,
      selisih: 1,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    },
    {
      id: 2,
      name: 'Laboratorium / workshop',
      category: 'Sarana',
      dibutuhkan: 5,
      tersedia: 4,
      selisih: -1,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    },
    {
      id: 3,
      name: 'Peralatan praktikum',
      category: 'Sarana',
      dibutuhkan: 40,
      tersedia: 34,
      selisih: -6,
      status: 'Kurang',
      strategi: 'Ajukan pengadaan peralatan',
      dibahas: true
    },
    {
      id: 4,
      name: 'Dosen tetap pengampu kompetensi inti',
      category: 'SDM',
      dibutuhkan: 12,
      tersedia: 11,
      selisih: -1,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    },
    {
      id: 5,
      name: 'Dosen yang ditugaskan di prodi',
      category: 'SDM',
      dibutuhkan: 5,
      tersedia: 14,
      selisih: 9,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: true
    },
    {
      id: 6,
      name: 'Laboran',
      category: 'SDM',
      dibutuhkan: 5,
      tersedia: 5,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    }
  ],
  'Teknik Rekayasa Perangkat Lunak': [
    {
      id: 201,
      name: 'Ruang kelas teori',
      category: 'Sarana',
      dibutuhkan: 6,
      tersedia: 6,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    },
    {
      id: 202,
      name: 'Laboratorium software engineering',
      category: 'Sarana',
      dibutuhkan: 4,
      tersedia: 3,
      selisih: -1,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    },
    {
      id: 203,
      name: 'Komputer workstation lab RPL',
      category: 'Sarana',
      dibutuhkan: 32,
      tersedia: 26,
      selisih: -6,
      status: 'Kurang',
      strategi: 'Ajukan pengadaan peralatan',
      dibahas: true
    },
    {
      id: 204,
      name: 'Dosen tetap pengampu kompetensi inti RPL',
      category: 'SDM',
      dibutuhkan: 12,
      tersedia: 10,
      selisih: -2,
      status: 'Kurang',
      strategi: 'Rekrut dosen baru',
      dibahas: false
    },
    {
      id: 205,
      name: 'Dosen yang ditugaskan di prodi',
      category: 'SDM',
      dibutuhkan: 5,
      tersedia: 9,
      selisih: 4,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: true
    },
    {
      id: 206,
      name: 'Laboran software',
      category: 'SDM',
      dibutuhkan: 4,
      tersedia: 3,
      selisih: -1,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    }
  ],
  'Animasi': [
    {
      id: 301,
      name: 'Ruang kelas studio gambar',
      category: 'Sarana',
      dibutuhkan: 5,
      tersedia: 5,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    },
    {
      id: 302,
      name: 'Studio animasi 2D & 3D',
      category: 'Sarana',
      dibutuhkan: 4,
      tersedia: 3,
      selisih: -1,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    },
    {
      id: 303,
      name: 'Pen tablet display & render farm',
      category: 'Sarana',
      dibutuhkan: 35,
      tersedia: 28,
      selisih: -7,
      status: 'Kurang',
      strategi: 'Ajukan pengadaan peralatan',
      dibahas: true
    },
    {
      id: 304,
      name: 'Dosen tetap pengampu kompetensi animasi',
      category: 'SDM',
      dibutuhkan: 12,
      tersedia: 9,
      selisih: -3,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    },
    {
      id: 305,
      name: 'Dosen praktisi industri animasi',
      category: 'SDM',
      dibutuhkan: 5,
      tersedia: 8,
      selisih: 3,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: true
    },
    {
      id: 306,
      name: 'Laboran studio animasi',
      category: 'SDM',
      dibutuhkan: 3,
      tersedia: 3,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    }
  ],
  'Rekayasa Keamanan Siber': [
    {
      id: 401,
      name: 'Ruang kelas perkuliahan',
      category: 'Sarana',
      dibutuhkan: 4,
      tersedia: 5,
      selisih: 1,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    },
    {
      id: 402,
      name: 'Cyber range & security operations lab',
      category: 'Sarana',
      dibutuhkan: 3,
      tersedia: 2,
      selisih: -1,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    },
    {
      id: 403,
      name: 'Server sandbox & switch manageable',
      category: 'Sarana',
      dibutuhkan: 25,
      tersedia: 20,
      selisih: -5,
      status: 'Kurang',
      strategi: 'Ajukan pengadaan peralatan',
      dibahas: true
    },
    {
      id: 404,
      name: 'Dosen tetap cyber security & kriptografi',
      category: 'SDM',
      dibutuhkan: 12,
      tersedia: 8,
      selisih: -4,
      status: 'Kurang',
      strategi: 'Rekrut dosen baru',
      dibahas: false
    },
    {
      id: 405,
      name: 'Dosen yang ditugaskan di prodi RKS',
      category: 'SDM',
      dibutuhkan: 5,
      tersedia: 7,
      selisih: 2,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: true
    },
    {
      id: 406,
      name: 'Laboran cyber lab',
      category: 'SDM',
      dibutuhkan: 3,
      tersedia: 2,
      selisih: -1,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    }
  ],
  'Teknologi Rekayasa Multimedia': [
    {
      id: 501,
      name: 'Ruang kelas teori',
      category: 'Sarana',
      dibutuhkan: 5,
      tersedia: 5,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    },
    {
      id: 502,
      name: 'Studio audio visual & green screen',
      category: 'Sarana',
      dibutuhkan: 4,
      tersedia: 4,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    },
    {
      id: 503,
      name: 'Kamera sinema, lighting & audio gear',
      category: 'Sarana',
      dibutuhkan: 30,
      tersedia: 24,
      selisih: -6,
      status: 'Kurang',
      strategi: 'Ajukan pengadaan peralatan',
      dibahas: true
    },
    {
      id: 504,
      name: 'Dosen tetap multimedia & broadcasting',
      category: 'SDM',
      dibutuhkan: 12,
      tersedia: 11,
      selisih: -1,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    },
    {
      id: 505,
      name: 'Dosen yang ditugaskan di prodi TRM',
      category: 'SDM',
      dibutuhkan: 5,
      tersedia: 8,
      selisih: 3,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: true
    },
    {
      id: 506,
      name: 'Laboran broadcasting & audio',
      category: 'SDM',
      dibutuhkan: 3,
      tersedia: 3,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    }
  ],
  'Teknik Geomatika': [
    {
      id: 601,
      name: 'Ruang kelas perkuliahan',
      category: 'Sarana',
      dibutuhkan: 4,
      tersedia: 4,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    },
    {
      id: 602,
      name: 'Laboratorium GIS & fotogrametri drone',
      category: 'Sarana',
      dibutuhkan: 3,
      tersedia: 3,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    },
    {
      id: 603,
      name: 'Total Station, GNSS Geodetic & Drone LIDAR',
      category: 'Sarana',
      dibutuhkan: 20,
      tersedia: 15,
      selisih: -5,
      status: 'Kurang',
      strategi: 'Ajukan pengadaan peralatan',
      dibahas: true
    },
    {
      id: 604,
      name: 'Dosen tetap ilmu geospasial & survei',
      category: 'SDM',
      dibutuhkan: 12,
      tersedia: 10,
      selisih: -2,
      status: 'Kurang',
      strategi: 'Belum ditentukan',
      dibahas: false
    },
    {
      id: 605,
      name: 'Dosen yang ditugaskan di prodi Geomatika',
      category: 'SDM',
      dibutuhkan: 5,
      tersedia: 7,
      selisih: 2,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: true
    },
    {
      id: 606,
      name: 'Laboran survei & pemetaan',
      category: 'SDM',
      dibutuhkan: 2,
      tersedia: 2,
      selisih: 0,
      status: 'Cukup',
      strategi: 'Tidak perlu penanganan',
      dibahas: false
    }
  ]
};

const AnalisisGapSekjurPage = () => {
  const { user } = useAuth();
  const userName = user?.name || 'Qeysha Nadine';
  const userNik = user?.nik || user?.nip || '122288';
  const userRole = user?.role === 'Sekjur' || !user ? 'Sekretaris Jurusan' : user.role;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('gap');

  // Top header filters
  const [selectedTahun, setSelectedTahun] = useState('2026/2027');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [selectedProdi, setSelectedProdi] = useState('Teknik Informatika');

  // Card filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');

  // Multi-prodi Resource Data State
  const [resourcesByProdi, setResourcesByProdi] = useState(INITIAL_RESOURCES_BY_PRODI);

  // Edit dialog state
  const [editingItem, setEditingItem] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', isError: false });

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
  };

  // Periode aktif semester: Ganjil 2026/2027
  const isPeriodActive = selectedTahun === '2026/2027' && selectedSemester === 'Ganjil';

  // Toggle "Dibahas" checkbox for current prodi
  const handleToggleDibahas = (id) => {
    setResourcesByProdi((prev) => {
      const currentList = prev[selectedProdi] || [];
      const updatedList = currentList.map((item) =>
        item.id === id ? { ...item, dibahas: !item.dibahas } : item
      );
      return {
        ...prev,
        [selectedProdi]: updatedList
      };
    });
  };

  // Open edit modal
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  // Save updated strategy for current prodi
  const handleSaveStrategi = (id, newStrategi) => {
    setResourcesByProdi((prev) => {
      const currentList = prev[selectedProdi] || [];
      const updatedList = currentList.map((item) =>
        item.id === id ? { ...item, strategi: newStrategi } : item
      );
      return {
        ...prev,
        [selectedProdi]: updatedList
      };
    });
    showToast('Strategi penanganan berhasil diperbarui!');
  };

  // Current raw resources for the selected prodi
  const currentProdiResources = useMemo(() => {
    if (!isPeriodActive) return [];
    return resourcesByProdi[selectedProdi] || [];
  }, [resourcesByProdi, selectedProdi, isPeriodActive]);

  // Filtered rows
  const filteredResources = useMemo(() => {
    if (!isPeriodActive) return [];

    return currentProdiResources.filter((item) => {
      // Search
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.strategi.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchCategory =
        selectedCategory === 'Semua Kategori' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      // Status filter
      const matchStatus =
        selectedStatus === 'Semua Status' ||
        item.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchSearch && matchCategory && matchStatus;
    });
  }, [currentProdiResources, searchQuery, selectedCategory, selectedStatus, isPeriodActive]);

  // Unresolved lacking resources for warning note
  const unresolvedItems = useMemo(() => {
    if (!isPeriodActive) return [];
    return currentProdiResources.filter(
      (item) => item.status === 'Kurang' && item.strategi === 'Belum ditentukan'
    );
  }, [currentProdiResources, isPeriodActive]);

  // Copy for Excel
  const handleSalinExcel = () => {
    if (!isPeriodActive || filteredResources.length === 0) {
      showToast('Tidak ada data yang dapat disalin pada periode ini.', true);
      return;
    }

    try {
      const headers = [
        'No',
        'Sumber Daya',
        'Kategori',
        'Dibutuhkan',
        'Tersedia',
        'Selisih',
        'Status',
        'Strategi Penanganan',
        'Dibahas'
      ];

      const rows = filteredResources.map((item, index) => [
        index + 1,
        item.name,
        item.category,
        item.dibutuhkan,
        item.tersedia,
        item.selisih > 0 ? `+${item.selisih}` : item.selisih,
        item.status,
        item.strategi,
        item.dibahas ? 'Sudah' : 'Belum'
      ]);

      const tsvContent = [
        headers.join('\t'),
        ...rows.map((r) => r.join('\t'))
      ].join('\n');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tsvContent).then(
          () => {
            showToast('Data berhasil disalin untuk Excel!');
          },
          () => {
            downloadExcel(headers, rows);
          }
        );
      } else {
        downloadExcel(headers, rows);
      }
    } catch {
      showToast('Gagal menyalin data', true);
    }
  };

  const downloadExcel = (headers, rows) => {
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Analisis Gap');
    XLSX.writeFile(
      wb,
      `Analisis_Gap_${selectedProdi.replace(/\s+/g, '_')}_${selectedTahun.replace('/', '-')}.xlsx`
    );
    showToast('File Excel berhasil diunduh!');
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

            {/* Main Card: Kebutuhan dan Ketersediaan Sumber Daya */}
            <div className="bg-white rounded-[16px] border border-[#D8E0EE] p-5 sm:p-7 shadow-[0_2px_12px_rgba(10,35,82,0.03)]">
              {/* Card Title & Subtitle */}
              <div>
                <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0A2352] leading-tight">
                  Kebutuhan dan Ketersediaan Sumber Daya
                </h3>
                <p className="text-[13px] sm:text-[13.5px] text-[#51607A] mt-1.5 leading-relaxed">
                  Dianalisis bersama Ketua Jurusan dan Koordinator Laboratorium. Data sumber daya Program Studi {selectedProdi}.
                </p>
              </div>

              {/* Controls Bar: Search + Dropdowns + Action Button */}
              <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search & Select Filters */}
                <div className="flex flex-wrap items-center gap-2.5 flex-1">
                  {/* Search Input */}
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari sumber daya"
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

                  {/* Dropdown Kategori */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      disabled={!isPeriodActive}
                      className="h-[40px] appearance-none bg-white border border-[#CBD5E1] rounded-[9px] pl-3.5 pr-8 text-[13.5px] font-medium text-[#0F1B33] focus:outline-none focus:border-[#1B4FD8] focus:ring-[3px] focus:ring-[#D6DFF8] transition-all cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
                    >
                      <option value="Semua Kategori">Semua Kategori</option>
                      <option value="Sarana">Sarana</option>
                      <option value="SDM">SDM</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#51607A] pointer-events-none"
                    />
                  </div>

                  {/* Dropdown Status */}
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      disabled={!isPeriodActive}
                      className="h-[40px] appearance-none bg-white border border-[#CBD5E1] rounded-[9px] pl-3.5 pr-8 text-[13.5px] font-medium text-[#0F1B33] focus:outline-none focus:border-[#1B4FD8] focus:ring-[3px] focus:ring-[#D6DFF8] transition-all cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
                    >
                      <option value="Semua Status">Semua Status</option>
                      <option value="Cukup">Cukup</option>
                      <option value="Kurang">Kurang</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#51607A] pointer-events-none"
                    />
                  </div>
                </div>

                {/* Right Button: Salin untuk Excel */}
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={handleSalinExcel}
                    disabled={!isPeriodActive || filteredResources.length === 0}
                    className="h-[40px] px-4.5 bg-[#FFB020] hover:bg-[#EAA11A] text-[#0A2352] font-bold text-[13.5px] rounded-[9px] shadow-xs flex items-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Salin untuk Excel</span>
                  </button>
                </div>
              </div>

              {/* Table Container */}
              <div className="mt-5 border border-[#E2E8F0] rounded-[12px] overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#0A2352] font-bold text-[13px]">
                        <th className="py-3.5 px-4 text-center w-14">No.</th>
                        <th className="py-3.5 px-4">Sumber Daya</th>
                        <th className="py-3.5 px-4 text-center w-28">Dibutuhkan</th>
                        <th className="py-3.5 px-4 text-center w-28">Tersedia</th>
                        <th className="py-3.5 px-4 text-center w-32">Selisih</th>
                        <th className="py-3.5 px-4 min-w-[200px]">Strategi Penanganan</th>
                        <th className="py-3.5 px-4 text-center w-24">Dibahas</th>
                        <th className="py-3.5 px-4 text-center w-20">Ubah</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {!isPeriodActive ? (
                        <tr>
                          <td colSpan={8} className="py-16 text-center">
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
                                  : `Tidak ada data analisis gap untuk Tahun Ajaran ${selectedTahun} Semester ${selectedSemester}.`}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : filteredResources.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-14 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#51607A] mb-2.5">
                                <SearchX size={22} strokeWidth={1.8} />
                              </div>
                              <h4 className="text-[15px] font-bold text-[#0F1B33]">
                                Data tidak ditemukan
                              </h4>
                              <p className="text-[13px] text-[#51607A] max-w-sm mt-0.5">
                                Tidak ada sumber daya yang sesuai dengan pencarian atau filter yang dipilih.
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredResources.map((item, index) => {
                          const isCukup = item.status === 'Cukup';

                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-[#F8FAFC]/80 transition-colors"
                            >
                              {/* No */}
                              <td className="py-4 px-4 text-center text-[#51607A] font-medium">
                                {index + 1}
                              </td>

                              {/* Sumber Daya */}
                              <td className="py-4 px-4">
                                <div className="font-bold text-[#0F1B33] leading-snug">
                                  {item.name}
                                </div>
                                <div className="text-[12px] text-[#51607A] font-normal mt-0.5">
                                  {item.category}
                                </div>
                              </td>

                              {/* Dibutuhkan */}
                              <td className="py-4 px-4 text-center font-medium text-[#0F1B33]">
                                {item.dibutuhkan}
                              </td>

                              {/* Tersedia */}
                              <td className="py-4 px-4 text-center font-medium text-[#0F1B33]">
                                {item.tersedia}
                              </td>

                              {/* Selisih Badge */}
                              <td className="py-4 px-4 text-center">
                                <div
                                  className={`inline-flex flex-col items-center justify-center px-3 py-1 rounded-[10px] text-[12px] font-bold min-w-[68px] ${
                                    isCukup
                                      ? 'bg-[#D1FADF] text-[#027A48]'
                                      : 'bg-[#FEE4E2] text-[#D92D20]'
                                  }`}
                                >
                                  <span>
                                    {item.selisih > 0 ? `+${item.selisih}` : item.selisih}
                                  </span>
                                  <span className="text-[11px] font-semibold -mt-0.5">
                                    {item.status}
                                  </span>
                                </div>
                              </td>

                              {/* Strategi Penanganan */}
                              <td className="py-4 px-4 text-[#0F1B33] text-[13px] leading-relaxed">
                                {item.strategi}
                              </td>

                              {/* Dibahas (Checkbox) */}
                              <td className="py-4 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleToggleDibahas(item.id)}
                                  className="inline-flex items-center justify-center p-1 rounded-md text-[#1B4FD8] hover:bg-[#E8EEFC] transition-colors cursor-pointer"
                                  aria-label={`Tandai ${item.name} sudah dibahas`}
                                >
                                  {item.dibahas ? (
                                    <CheckSquare size={19} className="text-[#1B4FD8]" />
                                  ) : (
                                    <Square size={19} className="text-[#94A3B8] hover:text-[#51607A]" />
                                  )}
                                </button>
                              </td>

                              {/* Ubah (Pencil Edit Icon) */}
                              <td className="py-4 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(item)}
                                  className="p-1.5 rounded-lg text-[#51607A] hover:text-[#1B4FD8] hover:bg-[#E8EEFC] transition-colors cursor-pointer"
                                  title="Ubah strategi penanganan"
                                  aria-label={`Ubah strategi penanganan ${item.name}`}
                                >
                                  <Pencil size={16} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card Footer Notes */}
              {isPeriodActive && (
                <div className="mt-5 space-y-1.5">
                  {/* Red warning for unresolved lacking items */}
                  {unresolvedItems.length > 0 && (
                    <p className="text-[13px] text-[#D92D20] font-medium leading-relaxed">
                      {unresolvedItems.length} sumber daya yang kurang belum punya strategi penanganan:{' '}
                      {unresolvedItems.map((u) => u.name).join(', ')}.
                    </p>
                  )}

                  {/* Gray reference note */}
                  <p className="text-[12.5px] sm:text-[13px] text-[#64748B] leading-relaxed">
                    Batas dosen mengacu ke B.1.3.2.3.b (minimal 5 dosen per prodi) dan B.1.3.2.3.f (minimal 12 dosen tetap pengampu kompetensi inti).
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Edit Strategi Modal Dialog */}
      {isEditDialogOpen && editingItem && (
        <EditStrategiDialog
          key={editingItem.id}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          item={editingItem}
          onSave={handleSaveStrategi}
        />
      )}
    </div>
  );
};

export default AnalisisGapSekjurPage;
