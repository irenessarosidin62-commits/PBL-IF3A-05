// Konstanta & data dummy untuk Formulir Kompetensi (Laboran)

export const ACADEMIC_YEARS = ['2026/2027', '2025/2026'];

export const SEMESTERS = ['Ganjil', 'Genap'];

export const PRODIS = ['Teknik Informatika', 'TRPL'];

// Petunjuk Skala Penilaian (0 - 8) sesuai Gambar 3 & 4
export const SCALE_GUIDES = [
  { level: 0, title: 'Tidak tahu' },
  { level: 1, title: 'Mengetahui definisi mata kuliah' },
  { level: 2, title: 'Poin 1 + mampu mengklasifikasi konten mata kuliah' },
  { level: 3, title: 'Poin 1 + Poin 2 + mampu mendemonstrasi konten mata kuliah' },
  { level: 4, title: 'Poin 1 + Poin 2 + Poin 3 + mampu menganalisis konten mata kuliah' },
  { level: 5, title: 'Poin 1 + Poin 2 + Poin 3 + Poin 4 + mampu memprediksi dan mengelaborasi konten mata kuliah' },
  { level: 6, title: 'Poin 1 + Poin 2 + Poin 3 + Poin 4 + Poin 5 + mampu membandingkan, mengintegrasikan dan menyimpulkan konten mata kuliah' },
  { level: 7, title: 'Poin 1 + Poin 2 + Poin 3 + Poin 4 + Poin 5 + Poin 6 + mampu mengevaluasi dan menjustifikasi konten mata kuliah' },
  { level: 8, title: 'Poin 1 + Poin 2 + Poin 3 + Poin 4 + Poin 5 + Poin 6 + Poin 7 + mampu mengembangkan konten mata kuliah' }
];

// Opsi Nilai Dropdown (0 - 8)
export const SCORE_OPTIONS = [
  { value: '0', label: '0 - Tidak tahu' },
  { value: '1', label: '1 - Mengetahui definisi' },
  { value: '2', label: '2 - Mengklasifikasi' },
  { value: '3', label: '3 - Mendemonstrasi' },
  { value: '4', label: '4 - Menganalisis' },
  { value: '5', label: '5 - Memprediksi dan mengelaborasi' },
  { value: '6', label: '6 - Membandingkan dan menyimpulkan' },
  { value: '7', label: '7 - Mengevaluasi dan menjustifikasi' },
  { value: '8', label: '8 - Mengembangkan' }
];

// Data Mata Kuliah Dummy per Prodi
// 6 Mata Kuliah Teknik Informatika (4 terisi awal sesuai Gambar 2, 2 belum terisi)
// 6 Mata Kuliah TRPL (semua belum terisi) -> Total 12 mata kuliah, 4 terisi awal
export const INITIAL_COURSES_BY_PRODI = {
  'Teknik Informatika': [
    {
      id: 'ti-1',
      code: 'IF318',
      name: 'Statistika',
      semester: 3,
      sks: 2,
      score: '6',
      description: 'Mata kuliah ini membahas konsep peluang, pengujian hipotesis, statistika inferensial, serta penerapannya dalam analisis komputasi data.'
    },
    {
      id: 'ti-2',
      code: 'PK3IF',
      name: 'Pendidikan Kewarganegaraan',
      semester: 3,
      sks: 5,
      score: '5',
      description: 'Mata kuliah ini memperkuat pemahaman nilai-nilai kebangsaan, integritas konstitusi, demokrasi, dan hak asasi manusia dalam kehidupan berbangsa.'
    },
    {
      id: 'ti-3',
      code: 'IF314',
      name: 'Proyek Inovasi Agile',
      semester: 1,
      sks: 6,
      score: '7',
      description: 'Mata kuliah pembelajaran berbasis proyek (Project-Based Learning) dengan implementasi kerangka kerja Agile Scrum untuk menghasilkan produk perangkat lunak.'
    },
    {
      id: 'ti-4',
      code: 'IF317',
      name: 'Interaksi Manusia Komputer',
      semester: 1,
      sks: 4,
      score: '8',
      description: 'Mata kuliah ini mempelajari perancangan desain antarmuka pengguna (UI/UX), prinsip kegunaan (usability), user experience, dan evaluasi heuristik.'
    },
    {
      id: 'ti-5',
      code: 'IF315',
      name: 'Rekayasa Perangkat Lunak Lanjut',
      semester: 3,
      sks: 3,
      score: null,
      description: 'Mata kuliah ini membahas desain pola (design patterns), arsitektur perangkat lunak skala besar, pengujian otomatis, dan siklus DevOps modern.'
    },
    {
      id: 'ti-6',
      code: 'IF316',
      name: 'Mata Kuliah Pilihan Web',
      semester: 3,
      sks: 2,
      score: null,
      description: 'Mata kuliah ini membahas konsep dan praktik pengembangan aplikasi web modern dengan menggunakan framework.'
    }
  ],
  'TRPL': [
    {
      id: 'tr-1',
      code: 'TR101',
      name: 'Algoritma dan Struktur Data Terapan',
      semester: 1,
      sks: 3,
      score: null,
      description: 'Mata kuliah ini membahas struktur data fundamental, analisis kompleksitas algoritma, dan implementasi efisien dalam rekayasa perangkat lunak.'
    },
    {
      id: 'tr-2',
      code: 'TR102',
      name: 'Basis Data Terapan',
      semester: 2,
      sks: 3,
      score: null,
      description: 'Membahas perancangan basis data relasional dan non-relasional, indexing, optimasi query, dan replikasi basis data terdistribusi.'
    },
    {
      id: 'tr-3',
      code: 'TR201',
      name: 'Pemrograman Berorientasi Objek Lanjut',
      semester: 3,
      sks: 4,
      score: null,
      description: 'Penerapan konsep OOP mutakhir, clean code, modularitas, asynchronous programming, dan pengujian unit.'
    },
    {
      id: 'tr-4',
      code: 'TR202',
      name: 'Manajemen Konfigurasi dan Rilis',
      semester: 4,
      sks: 2,
      score: null,
      description: 'Membahas version control sistematis, branching strategy, release management, otomatisasi build, dan continuous integration.'
    },
    {
      id: 'tr-5',
      code: 'TR301',
      name: 'Keamanan Aplikasi Web dan Mobile',
      semester: 5,
      sks: 3,
      score: null,
      description: 'Analisis kerentanan keamanan perangkat lunak berdasarkan standar OWASP, mekanisme otentikasi/otorisasi aman, dan audit kode.'
    },
    {
      id: 'tr-6',
      code: 'TR302',
      name: 'Pengujian dan Penjaminan Kualitas PL',
      semester: 6,
      sks: 3,
      score: null,
      description: 'Metodologi software quality assurance (SQA), end-to-end testing, test automation, dan audit kualitas perangkat lunak.'
    }
  ]
};
