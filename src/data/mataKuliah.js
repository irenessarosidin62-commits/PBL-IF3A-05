// Single source of truth data mata kuliah dummy bersama
// Digunakan oleh halaman Tata Usaha (TU) dan halaman Laboran

export const MATA_KULIAH = [
  {
    id: 'ti-1',
    code: 'IF318',
    name: 'Statistika',
    semester: 3,
    sks: 2,
    kurikulum: 'Kurikulum 2026',
    tahunAjaran: ['2025/2026', '2026/2027'],
    prodi: 'Teknik Informatika',
    deskripsi: 'Mata kuliah ini membahas konsep peluang, pengujian hipotesis, statistika inferensial, serta penerapannya dalam analisis komputasi data.'
  },
  {
    id: 'ti-2',
    code: 'PK3IF',
    name: 'Pendidikan Kewarganegaraan',
    semester: 3,
    sks: 5,
    kurikulum: 'Kurikulum 2026',
    tahunAjaran: ['2025/2026', '2026/2027'],
    prodi: 'Teknik Informatika',
    deskripsi: 'Mata kuliah ini memperkuat pemahaman nilai-nilai kebangsaan, integritas konstitusi, demokrasi, dan hak asasi manusia dalam kehidupan berbangsa.'
  },
  {
    id: 'ti-3',
    code: 'IF314',
    name: 'Proyek Inovasi Agile',
    semester: 1,
    sks: 6,
    kurikulum: 'Kurikulum 2026',
    tahunAjaran: ['2025/2026', '2026/2027'],
    prodi: 'Teknik Informatika',
    deskripsi: 'Mata kuliah pembelajaran berbasis proyek (Project-Based Learning) dengan implementasi kerangka kerja Agile Scrum untuk menghasilkan produk perangkat lunak.'
  },
  {
    id: 'ti-4',
    code: 'IF317',
    name: 'Interaksi Manusia Komputer',
    semester: 1,
    sks: 4,
    kurikulum: 'Kurikulum 2026',
    tahunAjaran: ['2025/2026', '2026/2027'],
    prodi: 'Teknik Informatika',
    deskripsi: 'Mata kuliah ini mempelajari perancangan desain antarmuka pengguna (UI/UX), prinsip kegunaan (usability), user experience, dan evaluasi heuristik.'
  },
  {
    id: 'ti-5',
    code: 'IF315',
    name: 'Rekayasa Perangkat Lunak Lanjut',
    semester: 3,
    sks: 3,
    kurikulum: 'Kurikulum 2026',
    tahunAjaran: ['2025/2026', '2026/2027'],
    prodi: 'Teknik Informatika',
    deskripsi: 'Mata kuliah ini membahas desain pola (design patterns), arsitektur perangkat lunak skala besar, pengujian otomatis, dan siklus DevOps modern.'
  },
  {
    id: 'ti-6',
    code: 'IF316',
    name: 'Mata Kuliah Pilihan Web',
    semester: 3,
    sks: 2,
    kurikulum: 'Kurikulum 2026',
    tahunAjaran: ['2025/2026', '2026/2027'],
    prodi: 'Teknik Informatika',
    deskripsi: 'Mata kuliah ini membahas konsep dan praktik pengembangan aplikasi web modern dengan menggunakan framework.'
  }
];

// Helper untuk filter mata kuliah berdasarkan Tahun ajaran, Semester, dan Kurikulum
export const getFilteredMataKuliah = ({
  academicYear = '2026/2027',
  semester = 'Ganjil',
  curriculum = 'Kurikulum 2026',
  prodi = 'Teknik Informatika'
} = {}) => {
  return MATA_KULIAH.filter((mk) => {
    // Kurikulum matching
    if (curriculum && mk.kurikulum !== curriculum) {
      return false;
    }

    // Prodi matching
    if (prodi && mk.prodi !== prodi) {
      return false;
    }

    // Tahun ajaran matching
    if (academicYear && mk.tahunAjaran && !mk.tahunAjaran.includes(academicYear)) {
      return false;
    }

    // Semester matching:
    // Ganjil: semester 1, 3, 5, 7
    // Genap: semester 2, 4, 6, 8
    const isOddSemester = Number(mk.semester) % 2 !== 0;
    if (semester === 'Ganjil' && !isOddSemester) {
      return false;
    }
    if (semester === 'Genap' && isOddSemester) {
      return false;
    }

    return true;
  });
};
