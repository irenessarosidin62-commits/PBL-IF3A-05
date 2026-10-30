import * as XLSX from 'xlsx';
import { FORM_STATUS, RECAP_STATUS } from '../constants/competencyConstants';

const STORAGE_FORMS_KEY = 'siap_pbm_tu_forms';

export const INITIAL_FORMS = [
  {
    id: 1,
    academicYear: '2026/2027',
    semester: 'Ganjil',
    curriculum: 'Kurikulum 2026',
    startDate: '01/10/2026',
    endDate: '30/10/2026',
    courseCount: 4,
    status: FORM_STATUS.DRAFT,
    courses: [
      { code: 'IF301', name: 'Interaksi Manusia Komputer', semester: 3, sks: 3 },
      { code: 'IF302', name: 'Mata Kuliah Pilihan Web', semester: 3, sks: 3 },
      { code: 'IF303', name: 'Statistika', semester: 3, sks: 3 },
      { code: 'IF304', name: 'Proyek Agile', semester: 3, sks: 2 }
    ]
  },
  {
    id: 2,
    academicYear: '2025/2026',
    semester: 'Genap',
    curriculum: 'Kurikulum 2025',
    startDate: '01/03/2026',
    endDate: '31/03/2026',
    courseCount: 3,
    status: FORM_STATUS.PUBLISHED,
    courses: [
      { code: 'IF201', name: 'Pemrograman Web', semester: 2, sks: 3 },
      { code: 'IF202', name: 'Struktur Data', semester: 2, sks: 3 },
      { code: 'IF203', name: 'Basis Data', semester: 2, sks: 3 }
    ]
  }
];

export const getStoredForms = () => {
  try {
    const raw = localStorage.getItem(STORAGE_FORMS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_FORMS_KEY, JSON.stringify(INITIAL_FORMS));
      return [...INITIAL_FORMS];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_FORMS_KEY, JSON.stringify(INITIAL_FORMS));
      return [...INITIAL_FORMS];
    }
    return parsed;
  } catch {
    return [...INITIAL_FORMS];
  }
};

export const saveForms = (forms) => {
  try {
    localStorage.setItem(STORAGE_FORMS_KEY, JSON.stringify(forms));
  } catch {
    // quota fallback
  }
};

export const fetchForms = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStoredForms());
    }, 100);
  });
};

export const createForm = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = getStoredForms();
      const nextId = list.length > 0 ? Math.max(...list.map((f) => f.id || 0)) + 1 : 1;
      const newForm = {
        id: nextId,
        academicYear: formData.academicYear,
        semester: formData.semester,
        curriculum: formData.curriculum,
        startDate: formData.startDate,
        endDate: formData.endDate,
        courseCount: formData.courses?.length || 0,
        status: FORM_STATUS.DRAFT,
        courses: formData.courses || []
      };
      const updated = [newForm, ...list];
      saveForms(updated);
      resolve(newForm);
    }, 150);
  });
};

export const deleteForm = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const list = getStoredForms();
      const form = list.find((f) => f.id === Number(id));
      if (!form) {
        return reject(new Error('Formulir tidak ditemukan.'));
      }
      if (form.status === FORM_STATUS.PUBLISHED) {
        return reject(new Error('Formulir yang sudah dipublikasikan tidak dapat dihapus.'));
      }
      const updated = list.filter((f) => f.id !== Number(id));
      saveForms(updated);
      resolve({ success: true, id: Number(id) });
    }, 150);
  });
};

export const publishForm = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const list = getStoredForms();
      const index = list.findIndex((f) => f.id === Number(id));
      if (index === -1) {
        return reject(new Error('Formulir tidak ditemukan.'));
      }
      list[index].status = FORM_STATUS.PUBLISHED;
      saveForms(list);
      resolve(list[index]);
    }, 150);
  });
};

// Data Rekap Dosen Pengajar
export const TEACHER_COURSES = [
  'Interaksi Manusia Komputer',
  'Mata Kuliah Pilihan Web',
  'Statistika',
  'Proyek Agile'
];

export const INITIAL_TEACHER_RECAP = [
  {
    id: 1,
    name: 'Dwi Amalia Purnamasari',
    nip: '121248',
    scores: {
      'Interaksi Manusia Komputer': 7,
      'Mata Kuliah Pilihan Web': 6,
      'Statistika': 3,
      'Proyek Agile': 6
    },
    status: RECAP_STATUS.FILLED
  },
  {
    id: 2,
    name: 'Swono Sibagariang',
    nip: '119224',
    scores: {
      'Interaksi Manusia Komputer': 5,
      'Mata Kuliah Pilihan Web': 8,
      'Statistika': 6,
      'Proyek Agile': 2
    },
    status: RECAP_STATUS.FILLED
  },
  {
    id: 3,
    name: 'Nadya Satya Handayani',
    nip: '125351',
    scores: null,
    status: RECAP_STATUS.NOT_FILLED
  },
  {
    id: 4,
    name: 'Sri Rahayu',
    nip: '125359',
    scores: {
      'Interaksi Manusia Komputer': 2,
      'Mata Kuliah Pilihan Web': 4,
      'Statistika': 1,
      'Proyek Agile': 5
    },
    status: RECAP_STATUS.FILLED
  }
];

// Data Rekap Dosen Wali
export const ADVISOR_COLUMNS = [
  { key: 'A', label: 'A. Perwalian' },
  { key: 'B', label: 'B. Biaya kuliah' },
  { key: 'C', label: 'C. Kurikulum' },
  { key: 'D', label: 'D. Peraturan' },
  { key: 'E', label: 'E. Komunikasi' },
  { key: 'F', label: 'F. Motivasi' }
];

export const INITIAL_ADVISOR_RECAP = [
  {
    id: 1,
    name: 'Dwi Amalia Purnamasari',
    nip: '121248',
    scores: { A: 1, B: 2, C: 3, D: 4, E: 5, F: 1 },
    status: RECAP_STATUS.FILLED
  },
  {
    id: 2,
    name: 'Swono Sibagariang',
    nip: '119224',
    scores: { A: 3, B: 4, C: 5, D: 1, E: 2, F: 3 },
    status: RECAP_STATUS.FILLED
  },
  {
    id: 3,
    name: 'Nadya Satya Handayani',
    nip: '125351',
    scores: null,
    status: RECAP_STATUS.NOT_FILLED
  },
  {
    id: 4,
    name: 'Sri Rahayu',
    nip: '125359',
    scores: { A: 2, B: 3, C: 4, D: 5, E: 1, F: 2 },
    status: RECAP_STATUS.FILLED
  }
];

// Perhitungan rata-rata secara dinamis
export const calculateAverage = (scoresObj) => {
  if (!scoresObj) return '-';
  const values = Object.values(scoresObj).filter((v) => typeof v === 'number');
  if (values.length === 0) return '-';
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  return (sum / values.length).toFixed(1);
};

// Ekspor Excel untuk Rekap Kompetensi
export const exportRecapToExcel = ({
  role = 'Dosen pengajar',
  academicYear = '2026/2027',
  semester = 'Ganjil',
  curriculum = 'Kurikulum 2026'
}) => {
  let exportData = [];

  if (role === 'Dosen pengajar') {
    exportData = INITIAL_TEACHER_RECAP.map((d) => {
      const avg = calculateAverage(d.scores);
      const row = {
        'Nama Dosen': d.name,
        'NIP / NIK': d.nip
      };
      TEACHER_COURSES.forEach((c) => {
        row[c] = d.scores && d.scores[c] !== undefined ? d.scores[c] : '-';
      });
      row['Rata-rata'] = avg;
      row['Status'] = d.status;
      return row;
    });
  } else {
    exportData = INITIAL_ADVISOR_RECAP.map((d) => {
      const avg = calculateAverage(d.scores);
      const row = {
        'Nama Dosen': d.name,
        'NIP / NIK': d.nip
      };
      ADVISOR_COLUMNS.forEach((col) => {
        row[col.label] = d.scores && d.scores[col.key] !== undefined ? d.scores[col.key] : '-';
      });
      row['Rata-rata'] = avg;
      row['Status'] = d.status;
      return row;
    });
  }

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  const sheetName = role === 'Dosen pengajar' ? 'Rekap Dosen Pengajar' : 'Rekap Dosen Wali';
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const fileName = `rekap_kompetensi_${role.toLowerCase().replace(/\s+/g, '_')}_${curriculum.toLowerCase().replace(/\s+/g, '_')}_${academicYear.replace('/', '-')}_${semester.toLowerCase()}.xlsx`;
  XLSX.writeFile(wb, fileName);
};
