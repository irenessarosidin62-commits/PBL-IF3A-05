import React, { useState, useMemo } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useAuth } from '../../context/AuthContext';
import KajurNavbar from '../../components/kajur/KajurNavbar';
import KajurSidebar from '../../components/kajur/KajurSidebar';
import KajurFilterBar from '../../components/kajur/KajurFilterBar';
import RekapTable from '../../components/kajur/RekapTable';
import RekapWaliTable from '../../components/kajur/RekapWaliTable';
import Toast from '../../components/common/Toast';

// Dataset mata kuliah Dosen Pengajar per program studi (Semester Ganjil)
const COURSES_BY_PRODI = {
  'Teknik Informatika': [
    {
      id: 1,
      no: 1,
      code: 'IF318',
      name: 'Statistika',
      semester: 3,
      prodi: 'Teknik Informatika',
      rekap: { dwi: 3, swono: 6, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 2,
      no: 2,
      code: 'PK31F',
      name: 'Pendidikan Kewarganegaraan',
      semester: 3,
      prodi: 'Teknik Informatika',
      rekap: { dwi: 6, swono: 4, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 3,
      no: 3,
      code: 'IF314',
      name: 'Proyek Inovasi Agile',
      semester: 1,
      prodi: 'Teknik Informatika',
      rekap: { dwi: 6, swono: 2, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: '-',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 4,
      no: 4,
      code: 'IF317',
      name: 'Interaksi Manusia Komputer',
      semester: 1,
      prodi: 'Teknik Informatika',
      rekap: { dwi: 7, swono: 5, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 5,
      no: 5,
      code: 'IF315',
      name: 'Rekayasa Perangkat Lunak Lanjut',
      semester: 3,
      prodi: 'Teknik Informatika',
      rekap: { dwi: 5, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 6,
      no: 6,
      code: 'IF316',
      name: 'Mata Kuliah Pilihan Web',
      semester: 3,
      prodi: 'Teknik Informatika',
      rekap: { dwi: 6, swono: 8, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    }
  ],

  'Teknik Rekayasa Perangkat Lunak': [
    {
      id: 201,
      no: 1,
      code: 'TR101',
      name: 'Algoritma dan Struktur Data Terapan',
      semester: 1,
      prodi: 'Teknik Rekayasa Perangkat Lunak',
      rekap: { dwi: 7, swono: 5, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 202,
      no: 2,
      code: 'TR102',
      name: 'Basis Data Terapan',
      semester: 1,
      prodi: 'Teknik Rekayasa Perangkat Lunak',
      rekap: { dwi: 6, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 203,
      no: 3,
      code: 'TR201',
      name: 'Pemrograman Berorientasi Objek Terapan',
      semester: 3,
      prodi: 'Teknik Rekayasa Perangkat Lunak',
      rekap: { dwi: 6, swono: 8, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 204,
      no: 4,
      code: 'TR202',
      name: 'Rekayasa Kebutuhan Perangkat Lunak',
      semester: 3,
      prodi: 'Teknik Rekayasa Perangkat Lunak',
      rekap: { dwi: 7, swono: 6, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 205,
      no: 5,
      code: 'TR301',
      name: 'Arsitektur Perangkat Lunak',
      semester: 3,
      prodi: 'Teknik Rekayasa Perangkat Lunak',
      rekap: { dwi: 5, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 206,
      no: 6,
      code: 'TR302',
      name: 'Manajemen Proyek TI Terapan',
      semester: 3,
      prodi: 'Teknik Rekayasa Perangkat Lunak',
      rekap: { dwi: 6, swono: 6, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    }
  ],

  'Animasi': [
    {
      id: 301,
      no: 1,
      code: 'AN101',
      name: 'Prinsip Dasar Animasi 2D',
      semester: 1,
      prodi: 'Animasi',
      rekap: { dwi: 7, swono: 4, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 302,
      no: 2,
      code: 'AN102',
      name: 'Desain Karakter dan Konsep Seni',
      semester: 1,
      prodi: 'Animasi',
      rekap: { dwi: 8, swono: 5, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 303,
      no: 3,
      code: 'AN201',
      name: 'Pemodelan Karakter 3D',
      semester: 3,
      prodi: 'Animasi',
      rekap: { dwi: 6, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 304,
      no: 4,
      code: 'AN202',
      name: 'Rigging dan Animasi 3D',
      semester: 3,
      prodi: 'Animasi',
      rekap: { dwi: 5, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 305,
      no: 5,
      code: 'AN301',
      name: 'Tata Cahaya dan Rendering',
      semester: 3,
      prodi: 'Animasi',
      rekap: { dwi: 7, swono: 6, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 306,
      no: 6,
      code: 'AN302',
      name: 'Papan Cerita dan Tata Sinema Digital',
      semester: 3,
      prodi: 'Animasi',
      rekap: { dwi: 6, swono: 5, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    }
  ],

  'Rekayasa Keamanan Siber': [
    {
      id: 401,
      no: 1,
      code: 'KS101',
      name: 'Keamanan Jaringan Komputer',
      semester: 1,
      prodi: 'Rekayasa Keamanan Siber',
      rekap: { dwi: 6, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 402,
      no: 2,
      code: 'KS102',
      name: 'Kriptografi Terapan',
      semester: 1,
      prodi: 'Rekayasa Keamanan Siber',
      rekap: { dwi: 7, swono: 6, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 403,
      no: 3,
      code: 'KS201',
      name: 'Analisis Forensik Digital',
      semester: 3,
      prodi: 'Rekayasa Keamanan Siber',
      rekap: { dwi: 6, swono: 8, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 404,
      no: 4,
      code: 'KS202',
      name: 'Keamanan Sistem Operasi',
      semester: 3,
      prodi: 'Rekayasa Keamanan Siber',
      rekap: { dwi: 5, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 405,
      no: 5,
      code: 'KS301',
      name: 'Ethical Hacking & Penetration Testing',
      semester: 3,
      prodi: 'Rekayasa Keamanan Siber',
      rekap: { dwi: 7, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 406,
      no: 6,
      code: 'KS302',
      name: 'Manajemen Risiko Keamanan Siber',
      semester: 3,
      prodi: 'Rekayasa Keamanan Siber',
      rekap: { dwi: 6, swono: 6, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    }
  ],

  'Teknologi Rekayasa Multimedia': [
    {
      id: 501,
      no: 1,
      code: 'TR301',
      name: 'Pemodelan 3D dan Animasi',
      semester: 3,
      prodi: 'Teknologi Rekayasa Multimedia',
      rekap: { dwi: 8, swono: 6, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 502,
      no: 2,
      code: 'TR302',
      name: 'Desain Audio Visual',
      semester: 3,
      prodi: 'Teknologi Rekayasa Multimedia',
      rekap: { dwi: 6, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 503,
      no: 3,
      code: 'TR303',
      name: 'Pemrograman Game',
      semester: 3,
      prodi: 'Teknologi Rekayasa Multimedia',
      rekap: { dwi: 7, swono: 5, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 504,
      no: 4,
      code: 'TR101',
      name: 'Fotografi dan Videografi Digital',
      semester: 1,
      prodi: 'Teknologi Rekayasa Multimedia',
      rekap: { dwi: 7, swono: 6, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Dwi A.',
        pengajar1: 'Swono S.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 505,
      no: 5,
      code: 'TR102',
      name: 'Desain Grafis dan Tipografi',
      semester: 1,
      prodi: 'Teknologi Rekayasa Multimedia',
      rekap: { dwi: 6, swono: 7, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    },
    {
      id: 506,
      no: 6,
      code: 'TR201',
      name: 'Interaktivitas Multimedia',
      semester: 3,
      prodi: 'Teknologi Rekayasa Multimedia',
      rekap: { dwi: 6, swono: 8, nadya: '-', sri: '-' },
      nilaiMinimal: { koordinator: 6, pengajar: 4 },
      penugasan: {
        koordinator: 'Swono S.',
        pengajar1: 'Dwi A.',
        pengajar2: '-',
        pengajar3: '-',
        pengajar4: '-'
      }
    }
  ],

  'Teknik Geomatika': []
};

// Dataset Dosen Wali sesuai screenshot Figma
const DOSEN_WALI_DATA = {
  'Teknik Informatika': [
    {
      id: 'w-1',
      no: 1,
      name: 'Dwi Amalia Purnamasari',
      nip: '121248',
      scores: {
        perwalian: 3,
        biayaKuliah: 5,
        kurikulum: 5,
        peraturan: 1,
        komunikasi: 2,
        motivasi: 2
      },
      average: 3.0,
      evaluasi: 'Cukup',
      tindakLanjut: 'Pendampingan peraturan akademik'
    },
    {
      id: 'w-2',
      no: 2,
      name: 'Swono Sibagariang',
      nip: '119224',
      scores: {
        perwalian: 5,
        biayaKuliah: 3,
        kurikulum: 3,
        peraturan: 3,
        komunikasi: 5,
        motivasi: 5
      },
      average: 4.0,
      evaluasi: 'Kompetensi Kuat',
      tindakLanjut: 'Pendampingan peraturan akademik'
    },
    {
      id: 'w-3',
      no: 3,
      name: 'Nadya Setya Handayani',
      nip: '125351',
      scores: {
        perwalian: 5,
        biayaKuliah: 3,
        kurikulum: 3,
        peraturan: 3,
        komunikasi: 5,
        motivasi: 5
      },
      average: 4.0,
      evaluasi: 'Kompetensi Kuat',
      tindakLanjut: 'Belum Diisi'
    },
    {
      id: 'w-4',
      no: 5,
      name: 'Rusyda Yunus',
      nip: '102030',
      scores: {
        perwalian: 1,
        biayaKuliah: 2,
        kurikulum: 1,
        peraturan: 3,
        komunikasi: 4,
        motivasi: 5
      },
      average: 2.7,
      evaluasi: 'Perlu Pembinaan',
      tindakLanjut: 'Pelatihan perwalian'
    }
  ],
  'Teknik Rekayasa Perangkat Lunak': [
    {
      id: 'w-tr-1',
      no: 1,
      name: 'Andri Albertha Pratama',
      nip: '118021',
      scores: {
        perwalian: 4,
        biayaKuliah: 4,
        kurikulum: 5,
        peraturan: 4,
        komunikasi: 5,
        motivasi: 4
      },
      average: 4.3,
      evaluasi: 'Kompetensi Kuat',
      tindakLanjut: 'Belum Diisi'
    },
    {
      id: 'w-tr-2',
      no: 2,
      name: 'Festy Winda Sari',
      nip: '115042',
      scores: {
        perwalian: 3,
        biayaKuliah: 4,
        kurikulum: 3,
        peraturan: 4,
        komunikasi: 3,
        motivasi: 4
      },
      average: 3.5,
      evaluasi: 'Cukup',
      tindakLanjut: 'Pendampingan peraturan akademik'
    }
  ],
  'Animasi': [
    {
      id: 'w-an-1',
      no: 1,
      name: 'Budi Raharjo',
      nip: '120015',
      scores: {
        perwalian: 4,
        biayaKuliah: 3,
        kurikulum: 4,
        peraturan: 3,
        komunikasi: 4,
        motivasi: 4
      },
      average: 3.7,
      evaluasi: 'Cukup',
      tindakLanjut: 'Pelatihan perwalian'
    }
  ],
  'Rekayasa Keamanan Siber': [
    {
      id: 'w-ks-1',
      no: 1,
      name: 'Hafiz Prasetyo',
      nip: '122044',
      scores: {
        perwalian: 5,
        biayaKuliah: 4,
        kurikulum: 5,
        peraturan: 4,
        komunikasi: 5,
        motivasi: 5
      },
      average: 4.7,
      evaluasi: 'Kompetensi Kuat',
      tindakLanjut: 'Belum Diisi'
    }
  ],
  'Teknologi Rekayasa Multimedia': [
    {
      id: 'w-trm-1',
      no: 1,
      name: 'Siti Rahmawati',
      nip: '123019',
      scores: {
        perwalian: 3,
        biayaKuliah: 3,
        kurikulum: 4,
        peraturan: 2,
        komunikasi: 4,
        motivasi: 3
      },
      average: 3.2,
      evaluasi: 'Cukup',
      tindakLanjut: 'Pendampingan peraturan akademik'
    }
  ],
  'Teknik Geomatika': []
};

const RekapKompetensiPage = () => {
  const { user } = useAuth();

  // User details matching Figma wireframe specification
  const userName = user?.name || 'Irenessa Rosidin';
  const userNik = user?.nik || user?.nip || '213452';
  const userRole = user?.role === 'Kajur' || !user ? 'Ketua Jurusan' : user.role;
  const userProdi = user?.prodi || 'Teknik Informatika';

  // Layout & Navigation State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('rekap');

  // Filter States (Header)
  const [selectedTahun, setSelectedTahun] = useState('2026/2027');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [selectedProdi, setSelectedProdi] = useState('Teknik Informatika');

  // Content Tabs & Controls State (Default: Dosen Wali aktif sesuai instruksi)
  const [activeTab, setActiveTab] = useState('wali'); // 'pengajar' | 'wali'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSemester, setFilterSemester] = useState('Semua Semester');

  // State untuk data Dosen Wali per Prodi (agar Kajur dapat menginput / mengedit tindak lanjut)
  const [waliDataByProdi, setWaliDataByProdi] = useState(DOSEN_WALI_DATA);

  // Toast State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Handler untuk menginput / memperbarui Rencana Tindak Lanjut oleh Kajur
  const handleUpdateTindakLanjut = (itemId, newValue) => {
    setWaliDataByProdi((prev) => ({
      ...prev,
      [selectedProdi]: (prev[selectedProdi] || []).map((item) =>
        item.id === itemId ? { ...item, tindakLanjut: newValue } : item
      )
    }));
    showToast('Rencana tindak lanjut berhasil diperbarui!');
  };

  // Toggle Sidebar
  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Reset filter semester dropdown whenever top-level semester changes
  const handleSemesterChange = (newSemester) => {
    setSelectedSemester(newSemester);
    setFilterSemester('Semua Semester');
  };

  const handleProdiChange = (newProdi) => {
    setSelectedProdi(newProdi);
    setFilterSemester('Semua Semester');
    setSearchQuery('');
  };

  // Derive available semester options untuk Pengajar (Ganjil: 1, 3, 5, 7)
  const availableSemesters = useMemo(() => {
    if (selectedSemester === 'Ganjil') {
      return [1, 3, 5, 7];
    }
    return [];
  }, [selectedSemester]);

  // Data calculation untuk Dosen Pengajar
  const displayedCourses = useMemo(() => {
    if (selectedSemester === 'Genap') {
      return [];
    }

    const dataSource = COURSES_BY_PRODI[selectedProdi] || [];

    return dataSource
      .filter((item) => {
        // 1. Search Query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesName = item.name.toLowerCase().includes(query);
          const matchesCode = item.code.toLowerCase().includes(query);
          const matchesKoor = item.penugasan?.koordinator?.toLowerCase().includes(query);
          const matchesP1 = item.penugasan?.pengajar1?.toLowerCase().includes(query);
          if (!matchesName && !matchesCode && !matchesKoor && !matchesP1) {
            return false;
          }
        }

        // 2. Filter Semester dropdown
        if (filterSemester !== 'Semua Semester') {
          const targetSem = filterSemester.replace('Semester ', '').trim();
          if (String(item.semester) !== targetSem) {
            return false;
          }
        }

        return true;
      })
      .map((item, index) => ({
        ...item,
        no: index + 1
      }));
  }, [selectedProdi, selectedSemester, searchQuery, filterSemester]);

  // Data calculation untuk Dosen Wali
  const displayedWali = useMemo(() => {
    if (selectedSemester === 'Genap') {
      return [];
    }

    const dataSource = waliDataByProdi[selectedProdi] || [];

    return dataSource.filter((item) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesNip = item.nip.toLowerCase().includes(query);
        const matchesTindak = item.tindakLanjut?.toLowerCase().includes(query);
        if (!matchesName && !matchesNip && !matchesTindak) {
          return false;
        }
      }
      return true;
    });
  }, [waliDataByProdi, selectedProdi, selectedSemester, searchQuery]);

  // Empty Message dinamis
  const emptyMessage = useMemo(() => {
    if (selectedSemester === 'Genap') {
      return 'Belum ada data (Masa perkuliahan aktif saat ini adalah Semester Ganjil 2026/2027).';
    }
    if (activeTab === 'wali') {
      if ((waliDataByProdi[selectedProdi] || []).length === 0) {
        return `Belum ada data dosen wali untuk program studi ${selectedProdi}.`;
      }
      return 'Tidak ada data dosen wali yang cocok dengan pencarian.';
    }
    if ((COURSES_BY_PRODI[selectedProdi] || []).length === 0) {
      return `Belum ada data mata kuliah untuk program studi ${selectedProdi}.`;
    }
    return 'Tidak ada data mata kuliah yang ditemukan.';
  }, [selectedSemester, selectedProdi, activeTab, waliDataByProdi]);

  // Export to Excel Functionality
  const handleExportExcel = () => {
    try {
      if (activeTab === 'wali') {
        if (displayedWali.length === 0) {
          showToast('Tidak ada data dosen wali untuk diekspor.', 'error');
          return;
        }

        const headers = [
          'No',
          'NIP',
          'Nama Dosen',
          'A. Perwalian',
          'B. Biaya Kuliah',
          'C. Kurikulum',
          'D. Peraturan',
          'E. Komunikasi',
          'F. Motivasi',
          'Rata-rata',
          'Hasil Evaluasi',
          'Rencana Tindak Lanjut'
        ];

        const rows = displayedWali.map((w, idx) => [
          w.no || idx + 1,
          w.nip,
          w.name,
          w.scores?.perwalian ?? '-',
          w.scores?.biayaKuliah ?? '-',
          w.scores?.kurikulum ?? '-',
          w.scores?.peraturan ?? '-',
          w.scores?.komunikasi ?? '-',
          w.scores?.motivasi ?? '-',
          typeof w.average === 'number' ? w.average.toFixed(1) : w.average,
          w.evaluasi ?? '-',
          w.tindakLanjut ?? '-'
        ]);

        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        ws['!cols'] = [
          { wch: 5 },
          { wch: 12 },
          { wch: 28 },
          { wch: 14 },
          { wch: 16 },
          { wch: 14 },
          { wch: 14 },
          { wch: 15 },
          { wch: 14 },
          { wch: 12 },
          { wch: 18 },
          { wch: 32 }
        ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Rekap Dosen Wali');
        XLSX.writeFile(
          wb,
          `rekap_dosen_wali_${selectedProdi}_${selectedSemester}_${selectedTahun.replace('/', '-')}.xlsx`
        );
      } else {
        if (displayedCourses.length === 0) {
          showToast('Tidak ada data mata kuliah untuk diekspor.', 'error');
          return;
        }

        const headers = [
          'No',
          'Kode',
          'Mata Kuliah',
          'Semester',
          'Rekap Dwi A.',
          'Rekap Swono S.',
          'Rekap Nadya S.',
          'Rekap Sri R.',
          'Min Koordinator',
          'Min Pengajar',
          'Koordinator',
          'Pengajar 1',
          'Pengajar 2',
          'Pengajar 3',
          'Pengajar 4'
        ];

        const rows = displayedCourses.map((c, idx) => [
          idx + 1,
          c.code,
          c.name,
          c.semester,
          c.rekap?.dwi ?? '-',
          c.rekap?.swono ?? '-',
          c.rekap?.nadya ?? '-',
          c.rekap?.sri ?? '-',
          c.nilaiMinimal?.koordinator ?? 6,
          c.nilaiMinimal?.pengajar ?? 4,
          c.penugasan?.koordinator ?? '-',
          c.penugasan?.pengajar1 ?? '-',
          c.penugasan?.pengajar2 ?? '-',
          c.penugasan?.pengajar3 ?? '-',
          c.penugasan?.pengajar4 ?? '-'
        ]);

        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        ws['!cols'] = [
          { wch: 5 },
          { wch: 10 },
          { wch: 32 },
          { wch: 10 },
          { wch: 14 },
          { wch: 14 },
          { wch: 14 },
          { wch: 14 },
          { wch: 16 },
          { wch: 14 },
          { wch: 15 },
          { wch: 15 },
          { wch: 15 },
          { wch: 15 },
          { wch: 15 }
        ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Rekap Kompetensi');
        XLSX.writeFile(
          wb,
          `rekap_kompetensi_${selectedProdi}_${selectedSemester}_${selectedTahun.replace('/', '-')}.xlsx`
        );
      }

      showToast('Data rekap kompetensi berhasil diekspor ke Excel!');
    } catch {
      showToast('Gagal mengekspor data ke Excel.', 'error');
    }
  };

  // Dinamis Judul & Search Placeholder
  const pageTitle =
    activeTab === 'wali'
      ? 'Rekap Kompetensi Dosen Wali'
      : 'Rekap Kompetensi Dosen';

  const searchPlaceholder =
    activeTab === 'wali' ? 'Cari nama dosen' : 'Cari nama dosen atau mata kuliah';

  return (
    <div className="min-h-screen bg-[#F3F6FB] text-[#0F1B33] font-sans flex flex-col">
      {/* 1. Top Navbar (spans full width of screen) */}
      <KajurNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
      />

      {/* 2. Main Layout with Sidebar on Left and Content on Right */}
      <div className="flex-1 flex w-full relative">
        {/* Sidebar Component */}
        <KajurSidebar
          isOpen={isSidebarOpen}
          activeMenu={activeMenu}
          onSelectMenu={(menuId) => setActiveMenu(menuId)}
        />

        {/* Main Content Area: Smooth proportional expansion when sidebar collapses */}
        <main className="flex-1 min-w-0 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="w-full">
            {/* Header Row: Greeting (Left) & Filter Bar (Right) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">
            {/* Sapaan Pengguna */}
            <div>
              <h2 className="text-2xl sm:text-[27px] font-bold text-[#0A2352] tracking-tight leading-tight">
                Selamat datang, {userName}
              </h2>
              <p className="text-xs sm:text-[14px] font-medium text-[#51607A] mt-1">
                {userRole} {userProdi} • NIK {userNik}
              </p>
            </div>

            {/* Filter Dropdowns: Tahun Ajaran, Semester, Prodi */}
            <KajurFilterBar
              selectedTahun={selectedTahun}
              onTahunChange={setSelectedTahun}
              selectedSemester={selectedSemester}
              onSemesterChange={handleSemesterChange}
              selectedProdi={selectedProdi}
              onProdiChange={handleProdiChange}
            />
          </div>

          {/* Section Title (Dinamis sesuai Tab) */}
          <div className="mt-7 mb-4">
            <h3 className="text-2xl sm:text-[25px] font-bold text-[#0A2352] tracking-tight">
              {pageTitle}
            </h3>
          </div>

          {/* Tabs: Dosen Pengajar / Dosen Wali (Dosen Wali aktif secara default) */}
          <div className="flex items-center gap-2.5 mb-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('pengajar');
                setSearchQuery('');
              }}
              className={`text-xs sm:text-[13.5px] font-bold py-2 px-5 rounded-[8px] transition-all cursor-pointer ${
                activeTab === 'pengajar'
                  ? 'bg-[#0D2554] text-white shadow-xs'
                  : 'bg-white border border-[#0D2554] text-[#0D2554] hover:bg-[#E8EEFC]'
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
              className={`text-xs sm:text-[13.5px] font-bold py-2 px-5 rounded-[8px] transition-all cursor-pointer ${
                activeTab === 'wali'
                  ? 'bg-[#0D2554] text-white shadow-xs'
                  : 'bg-white border border-[#0D2554] text-[#0D2554] hover:bg-[#E8EEFC]'
              }`}
            >
              Dosen Wali
            </button>
          </div>

          {/* Search, Filter Semester (hanya Pengajar), and Export Excel Row */}
          <div className="flex flex-col md:flex-row items-center gap-3 mb-5">
            {/* Input Pencarian */}
            <div className="relative w-full md:flex-1">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[42px] bg-white border border-[#CBD5E1] rounded-[9px] px-4 text-[14px] text-[#0F1B33] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1B4FD8] focus:ring-2 focus:ring-[#1B4FD8]/15 transition"
              />
            </div>

            {/* Dropdown Filter Semester (Hanya ditampilkan pada Tab Dosen Pengajar sesuai Figma) */}
            {activeTab === 'pengajar' && (
              <div className="relative w-full md:w-auto shrink-0">
                <select
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)}
                  disabled={availableSemesters.length === 0}
                  className={`h-[42px] w-full md:w-auto appearance-none bg-white border border-[#CBD5E1] rounded-[9px] pl-4 pr-9 text-[14px] font-medium text-[#0F1B33] transition ${
                    availableSemesters.length === 0
                      ? 'opacity-60 cursor-not-allowed bg-gray-50'
                      : 'cursor-pointer hover:border-[#1B4FD8] focus:outline-none focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8]'
                  }`}
                >
                  <option value="Semua Semester">
                    {availableSemesters.length === 0
                      ? 'Tidak Ada Semester Aktif'
                      : 'Semua Semester'}
                  </option>
                  {availableSemesters.map((sem) => (
                    <option key={sem} value={`Semester ${sem}`}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            )}

            {/* Tombol Export Excel */}
            <button
              type="button"
              onClick={handleExportExcel}
              className="w-full md:w-auto h-[42px] px-5 bg-[#FFB020] hover:bg-[#F59E0B] text-[#4A3000] font-bold text-[14px] rounded-[9px] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Download size={16} strokeWidth={2.4} />
              Export Excel
            </button>
          </div>

          {/* Table: RekapTable (Dosen Pengajar) ATAU RekapWaliTable (Dosen Wali) */}
          {activeTab === 'wali' ? (
            <RekapWaliTable
              data={displayedWali}
              emptyMessage={emptyMessage}
              onUpdateTindakLanjut={handleUpdateTindakLanjut}
            />
          ) : (
            <RekapTable data={displayedCourses} emptyMessage={emptyMessage} />
          )}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default RekapKompetensiPage;
