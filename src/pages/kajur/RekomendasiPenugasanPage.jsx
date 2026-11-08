import React, { useState, useMemo } from 'react';
import KajurNavbar from '../../components/kajur/KajurNavbar';
import KajurSidebar from '../../components/kajur/KajurSidebar';
import KajurFilterBar from '../../components/kajur/KajurFilterBar';
import RekomendasiTable from '../../components/kajur/RekomendasiTable';
import Toast from '../../components/common/Toast';

// Dataset Usulan Penugasan Dosen per Program Studi (Semester Ganjil 2026/2027)
const INITIAL_RECOMMENDATIONS_BY_PRODI = {
  'Teknik Informatika': [
    // 6 Mata Kuliah Utama (Sesuai Desain Figma SIAP-PBM)
    {
      id: 1,
      code: 'IF318',
      name: 'Statistika',
      semester: 3,
      sks: 3,
      koordinator: 'Yeni Rokhayati',
      pengajar: 'Yeni Rokhayati',
      approved: false,
      description: 'Mata kuliah ini membahas konsep dasar probabilitas, statistika deskriptif, inferensial, serta penerapannya dalam analisis data komputasi.'
    },
    {
      id: 2,
      code: 'PK31F',
      name: 'Pendidikan Kewarganegaraan',
      semester: 3,
      sks: 4,
      koordinator: 'Sri Rahayu',
      pengajar: 'Sri Rahayu',
      approved: false,
      description: 'Mata kuliah ini membentuk wawasan kebangsaan, integritas, dan kesadaran hak dan kewajiban warga negara dalam konteks profesional TI.'
    },
    {
      id: 3,
      code: 'IF317',
      name: 'Interaksi Manusia Komputer',
      semester: 1,
      sks: 2,
      koordinator: 'Nadya Setya',
      pengajar: 'Nizan',
      approved: false,
      description: 'Mata kuliah ini mempelajari prinsip desain antarmuka pengguna (UI), pengalaman pengguna (UX), evaluasi heuristik, dan pengujian kegunaan.'
    },
    {
      id: 4,
      code: 'IF315',
      name: 'Rekayasa Perangkat Lunak Lanjut',
      semester: 3,
      sks: 4,
      koordinator: 'Nur Zahrati',
      pengajar: 'Dwi Amalia',
      approved: false,
      description: 'Mata kuliah ini mendalami arsitektur perangkat lunak lanjutan, pola desain, pengujian otomatis, dan siklus DevOps modern.'
    },
    {
      id: 5,
      code: 'IF316',
      name: 'Mata Kuliah Pilihan Web',
      semester: 3,
      sks: 2,
      koordinator: 'Swono Sibagariang',
      pengajar: 'Swono Sibagariang',
      approved: false,
      description: 'Mata kuliah ini membahas konsep dan praktik pengembangan aplikasi web modern dengan menggunakan framework terkini.'
    },
    {
      id: 6,
      code: 'IF314',
      name: 'Proyek Inovasi Agile',
      semester: 1,
      sks: 2,
      koordinator: 'Swono Sibagariang',
      pengajar: 'Hamim Tohari',
      approved: false,
      description: 'Mata kuliah berbasis proyek tim untuk mengembangkan produk perangkat lunak menggunakan metodologi Scrum dan prinsip Agile.'
    }
  ],
  'Teknik Rekayasa Perangkat Lunak': [
    {
      id: 101,
      code: 'TR101',
      name: 'Algoritma dan Struktur Data Terapan',
      semester: 1,
      sks: 3,
      koordinator: 'Dwi Amalia',
      pengajar: 'Dwi Amalia',
      approved: false,
      description: 'Mata kuliah ini membahas struktur data fundamental, analisis kompleksitas algoritma, dan implementasi efisien dalam rekayasa perangkat lunak.'
    },
    {
      id: 102,
      code: 'TR102',
      name: 'Basis Data Terapan',
      semester: 1,
      sks: 3,
      koordinator: 'Swono Sibagariang',
      pengajar: 'Swono Sibagariang',
      approved: false,
      description: 'Membahas perancangan basis data relasional dan non-relasional, indexing, optimasi query, dan replikasi basis data terdistribusi.'
    },
    {
      id: 103,
      code: 'TR201',
      name: 'Pemrograman Berorientasi Objek Lanjut',
      semester: 3,
      sks: 4,
      koordinator: 'Nur Zahrati',
      pengajar: 'Dwi Amalia',
      approved: false,
      description: 'Penerapan konsep OOP mutakhir, clean code, modularitas, asynchronous programming, dan pengujian unit.'
    },
    {
      id: 104,
      code: 'TR202',
      name: 'Manajemen Konfigurasi dan Rilis',
      semester: 3,
      sks: 2,
      koordinator: 'Hamim Tohari',
      pengajar: 'Hamim Tohari',
      approved: false,
      description: 'Membahas version control sistematis, branching strategy, release management, otomatisasi build, dan continuous integration.'
    }
  ],
  'Animasi': [
    {
      id: 201,
      code: 'AN101',
      name: 'Prinsip Dasar Animasi 2D',
      semester: 1,
      sks: 3,
      koordinator: 'Andri Albertha Pratama',
      pengajar: 'Andri Albertha Pratama',
      approved: false,
      description: 'Mata kuliah ini mempelajari 12 prinsip dasar animasi, teknik timing & spacing, pose-to-pose, dan perancangan gerak 2D frame-by-frame.'
    },
    {
      id: 202,
      code: 'AN102',
      name: 'Desain Karakter dan Konsep Seni',
      semester: 1,
      sks: 3,
      koordinator: 'Qeysha Nadine',
      pengajar: 'Qeysha Nadine',
      approved: false,
      description: 'Membahas anatomi dasar, visual storytelling, eksplorasi siluet, konsep warna, dan pembuatan model sheet karakter animasi.'
    },
    {
      id: 203,
      code: 'AN201',
      name: 'Pemodelan Karakter 3D',
      semester: 3,
      sks: 4,
      koordinator: 'Andri Albertha Pratama',
      pengajar: 'Festy Winda Sari',
      approved: false,
      description: 'Mempelajari teknik digital sculpting, retopology, UV unwrapping, baking texture, dan pembuatan model 3D siap animasi.'
    }
  ],
  'Rekayasa Keamanan Siber': [
    {
      id: 301,
      code: 'KS301',
      name: 'Kriptografi Terapan',
      semester: 3,
      sks: 3,
      koordinator: 'Nadya Setya',
      pengajar: 'Nadya Setya',
      approved: false,
      description: 'Mempelajari prinsip enkripsi simetris, asimetris, fungsi hash, tanda tangan digital, serta implementasi protokol keamanan data.'
    },
    {
      id: 302,
      code: 'KS302',
      name: 'Keamanan Jaringan Komputer',
      semester: 3,
      sks: 4,
      koordinator: 'Hamim Tohari',
      pengajar: 'Nizan',
      approved: false,
      description: 'Membahas arsitektur keamanan jaringan, firewall, IDS/IPS, VPN, serta mitigasi serangan siber pada infrastruktur jaringan.'
    }
  ],
  'Teknologi Rekayasa Multimedia': [
    {
      id: 401,
      code: 'TR301',
      name: 'Pemodelan 3D dan Animasi',
      semester: 3,
      sks: 4,
      koordinator: 'Andri Albertha Pratama',
      pengajar: 'Andri Albertha Pratama',
      approved: false,
      description: 'Mempelajari teknik pemodelan objek 3D, texturing, rigging, lighting, dan animasi karakter untuk produksi multimedia.'
    },
    {
      id: 402,
      code: 'TR302',
      name: 'Desain Audio Visual',
      semester: 3,
      sks: 3,
      koordinator: 'Festy Winda Sari',
      pengajar: 'Festy Winda Sari',
      approved: false,
      description: 'Membahas prinsip sinematografi, perekaman suara, teknik editing video digital, color grading, dan pengolahan audio pascaproduksi.'
    }
  ],
  'Teknik Geomatika': []
};

const RekomendasiPenugasanPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('rekomendasi');

  // Top Filter States (Tahun Ajaran, Semester, Program Studi)
  const [selectedTahun, setSelectedTahun] = useState('2026/2027');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [selectedProdi, setSelectedProdi] = useState('Teknik Informatika');

  // Recommendations state mapped by Prodi
  const [dataByProdi, setDataByProdi] = useState(INITIAL_RECOMMENDATIONS_BY_PRODI);

  // Toast feedback state
  const [toast, setToast] = useState({ show: false, message: '', isError: false });

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
  };

  // Current prodi recommendations (Filter Tahun Ajaran, Semester Ganjil vs Genap, and Prodi)
  const currentCourses = useMemo(() => {
    // Masa ini belum ada genap, dan hanya tahun aktif 2026/2027 yang memiliki data
    if (selectedSemester === 'Genap' || selectedTahun !== '2026/2027') {
      return [];
    }

    const prodiList = dataByProdi[selectedProdi] || [];
    // Ganjil: hanya mata kuliah semester ganjil (1, 3, 5, 7)
    return prodiList.filter((item) => Number(item.semester) % 2 !== 0);
  }, [dataByProdi, selectedProdi, selectedSemester, selectedTahun]);

  // Update course assignment (Koordinator & Pengajar)
  const handleUpdateCourse = (updatedCourse) => {
    setDataByProdi((prev) => {
      const prodiList = prev[selectedProdi] || [];
      return {
        ...prev,
        [selectedProdi]: prodiList.map((item) =>
          item.id === updatedCourse.id ? { ...item, ...updatedCourse } : item
        )
      };
    });
  };

  // Toggle approval checkbox
  const handleToggleApprove = (courseId) => {
    setDataByProdi((prev) => {
      const prodiList = prev[selectedProdi] || [];
      return {
        ...prev,
        [selectedProdi]: prodiList.map((item) =>
          item.id === courseId ? { ...item, approved: !item.approved } : item
        )
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F6FB] flex flex-col font-sans">
      {/* Toast Alert Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.isError ? 'error' : 'success'}
          onClose={() => setToast({ show: false, message: '', isError: false })}
        />
      )}

      {/* Top Navbar */}
      <KajurNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Main Container: Sidebar + Page Content */}
      <div className="flex-1 flex w-full relative">
        {/* Sidebar Component */}
        <KajurSidebar
          isOpen={isSidebarOpen}
          activeMenu={activeMenu}
          onSelectMenu={(menuId) => setActiveMenu(menuId)}
        />

        {/* Main Content Area: Smooth proportional expansion when sidebar collapses */}
        <main className="flex-1 min-w-0 transition-all duration-300 ease-in-out pl-4 pr-6 sm:pl-6 sm:pr-10 lg:pl-8 lg:pr-12 py-6 sm:py-8 w-full">
          <div className="w-full">
            {/* Header: Title + 3 Dropdown Filters - Selaras dengan Analisis Gap */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl sm:text-[27px] font-bold text-[#0A2352] tracking-tight leading-tight">
                Rekomendasi Penugasan Dosen
              </h2>

              <KajurFilterBar
                selectedTahun={selectedTahun}
                onTahunChange={setSelectedTahun}
                selectedSemester={selectedSemester}
                onSemesterChange={setSelectedSemester}
                selectedProdi={selectedProdi}
                onProdiChange={setSelectedProdi}
              />
            </div>

            {/* Main Content Card: Usulan per Mata Kuliah */}
            <RekomendasiTable
              courses={currentCourses}
              selectedTahun={selectedTahun}
              selectedSemester={selectedSemester}
              selectedProdi={selectedProdi}
              onUpdateCourse={handleUpdateCourse}
              onToggleApprove={handleToggleApprove}
              onNotify={showToast}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RekomendasiPenugasanPage;
