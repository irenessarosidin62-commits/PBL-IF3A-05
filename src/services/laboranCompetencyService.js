import { INITIAL_COURSES_BY_PRODI } from '../constants/laboranCompetencyConstants';

const STORAGE_KEY = 'siap_pbm_laboran_competencies';

export const getStoredLaboranCompetencies = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COURSES_BY_PRODI));
      return INITIAL_COURSES_BY_PRODI;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_COURSES_BY_PRODI;
  }
};

export const saveStoredLaboranCompetencies = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save laboran competencies', err);
  }
};

export const fetchLaboranCompetencies = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStoredLaboranCompetencies());
    }, 150);
  });
};

export const saveDraftLaboranCompetencies = async (allCoursesData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      saveStoredLaboranCompetencies(allCoursesData);
      resolve({ status: 'success', message: 'Draf matriks kompetensi berhasil disimpan.' });
    }, 200);
  });
};

export const submitLaboranCompetencies = async (allCoursesData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if any course across any prodi has null/empty score
      const allCourses = Object.values(allCoursesData).flat();
      const hasUnfilled = allCourses.some((c) => c.score === null || c.score === undefined || c.score === '');

      if (hasUnfilled) {
        reject(new Error('Masih terdapat mata kuliah yang belum dinilai di salah satu prodi.'));
        return;
      }

      saveStoredLaboranCompetencies(allCoursesData);
      resolve({ status: 'success', message: 'Matriks kompetensi berhasil dikirim!' });
    }, 250);
  });
};
