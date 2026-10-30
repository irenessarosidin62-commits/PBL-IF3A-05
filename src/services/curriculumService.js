import * as XLSX from 'xlsx';

const STORAGE_KEY = 'siap_pbm_curriculum';

export const INITIAL_COURSES = [
  { id: 1, code: 'IF318', name: 'Statistika', semester: 3, sks: 2, sesiTeori: 14, sesiPraktik: 14, peserta: 90, prodi: 'Teknik Informatika', academicYear: '2026/2027' },
  { id: 2, code: 'PK31F', name: 'Pendidikan Kewarganegaraan', semester: 3, sks: 5, sesiTeori: 14, sesiPraktik: 14, peserta: 90, prodi: 'Teknik Informatika', academicYear: '2026/2027' },
  { id: 3, code: 'IF314', name: 'Proyek Inovasi Agile', semester: 3, sks: 6, sesiTeori: 14, sesiPraktik: 14, peserta: 90, prodi: 'Teknik Informatika', academicYear: '2026/2027' },
  { id: 4, code: 'IF317', name: 'Interaksi Manusia Komputer', semester: 1, sks: 4, sesiTeori: 14, sesiPraktik: 14, peserta: 100, prodi: 'Teknik Informatika', academicYear: '2026/2027' },
  { id: 5, code: 'IF315', name: 'Rekayasa Perangkat Lunak Lanjut', semester: 1, sks: 3, sesiTeori: 14, sesiPraktik: 14, peserta: 100, prodi: 'Teknik Informatika', academicYear: '2026/2027' },
  { id: 6, code: 'IF316', name: 'Mata Kuliah Pilihan Web', semester: 3, sks: 2, sesiTeori: 14, sesiPraktik: 14, peserta: 90, prodi: 'Teknik Informatika', academicYear: '2026/2027' }
];

export const getStoredCurriculum = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COURSES));
      return [...INITIAL_COURSES];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COURSES));
      return [...INITIAL_COURSES];
    }
    return parsed.map((c) => ({
      ...c,
      code: c.code === 'PKJIF' ? 'PK31F' : c.code,
      semester: Number(c.semester) || 1,
      sks: Number(c.sks) || 2,
      sesiTeori: Number(c.sesiTeori) || 14,
      sesiPraktik: Number(c.sesiPraktik) || 14,
      peserta: Number(c.peserta) || (c.code === 'IF317' || c.code === 'IF315' ? 100 : 90)
    }));
  } catch {
    return [...INITIAL_COURSES];
  }
};

export const saveCurriculum = (courses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
};

export const fetchCurriculum = async ({
  search = '',
  semester = 'Ganjil',
  cardSemester = 'Semua Semester',
  prodi = null,
  academicYear = '2026/2027'
} = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let list = getStoredCurriculum();

      // Search filter (Code or Name)
      if (search && search.trim() !== '') {
        const query = search.trim().toLowerCase();
        list = list.filter(
          (c) =>
            (c.code && c.code.toLowerCase().includes(query)) ||
            (c.name && c.name.toLowerCase().includes(query))
        );
      }

      // Top Header Semester filter (Ganjil / Genap)
      if (semester && semester !== 'Semua Semester') {
        if (semester === 'Ganjil') {
          list = list.filter((c) => Number(c.semester) % 2 !== 0);
        } else if (semester === 'Genap') {
          list = list.filter((c) => Number(c.semester) % 2 === 0);
        }
      }

      // Card Semester filter (Semua Semester, 1, 2, 3...)
      if (cardSemester && cardSemester !== 'Semua Semester') {
        list = list.filter((c) => String(c.semester) === String(cardSemester));
      }

      // Academic year filter
      if (academicYear) {
        list = list.filter((c) => !c.academicYear || c.academicYear === academicYear);
      }

      // Prodi filter
      if (prodi && prodi !== 'Semua Prodi') {
        list = list.filter(
          (c) => !c.prodi || c.prodi.toLowerCase() === prodi.toLowerCase()
        );
      }

      resolve(list);
    }, 150);
  });
};

export const createCourse = async (courseData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const list = getStoredCurriculum();
      const codeTrimmed = courseData.code?.trim().toUpperCase();

      if (!codeTrimmed) {
        return reject(new Error('Kode mata kuliah wajib diisi.'));
      }
      if (!courseData.name?.trim()) {
        return reject(new Error('Nama mata kuliah wajib diisi.'));
      }

      // Check unique code
      const exists = list.some(
        (c) => c.code.toUpperCase() === codeTrimmed
      );
      if (exists) {
        return reject(new Error(`Kode mata kuliah "${codeTrimmed}" sudah terdaftar.`));
      }

      const newId = list.length > 0 ? Math.max(...list.map((c) => c.id || 0)) + 1 : 1;
      const newCourse = {
        id: newId,
        code: codeTrimmed,
        name: courseData.name.trim(),
        description: courseData.description ? courseData.description.trim() : '',
        semester: Number(courseData.semester) || 1,
        sks: Number(courseData.sks) || 2,
        sesiTeori: Number(courseData.sesiTeori) || 14,
        sesiPraktik: Number(courseData.sesiPraktik) || 14,
        teoriLuring: Number(courseData.teoriLuring) ?? 14,
        teoriDaring: Number(courseData.teoriDaring) ?? 0,
        praktikLuring: Number(courseData.praktikLuring) ?? 14,
        praktikDaring: Number(courseData.praktikDaring) ?? 0,
        peserta: Number(courseData.peserta) || 90,
        kelasTeoriLuring: Number(courseData.kelasTeoriLuring) || 3,
        kelasPraktikLuring: Number(courseData.kelasPraktikLuring) || 3,
        peralatan: courseData.peralatan ? courseData.peralatan.trim() : '',
        prodi: courseData.prodi || 'Teknik Informatika',
        academicYear: courseData.academicYear || '2026/2027'
      };

      const updated = [...list, newCourse];
      saveCurriculum(updated);
      resolve(newCourse);
    }, 200);
  });
};

export const updateCourse = async (id, courseData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const list = getStoredCurriculum();
      const index = list.findIndex((c) => c.id === Number(id));

      if (index === -1) {
        return reject(new Error('Mata kuliah tidak ditemukan.'));
      }

      const codeTrimmed = courseData.code?.trim().toUpperCase();
      if (!codeTrimmed) {
        return reject(new Error('Kode mata kuliah wajib diisi.'));
      }
      if (!courseData.name?.trim()) {
        return reject(new Error('Nama mata kuliah wajib diisi.'));
      }

      // Check duplicate code against other courses
      const duplicate = list.some(
        (c) => c.id !== Number(id) && c.code.toUpperCase() === codeTrimmed
      );
      if (duplicate) {
        return reject(new Error(`Kode mata kuliah "${codeTrimmed}" sudah digunakan oleh mata kuliah lain.`));
      }

      const updatedCourse = {
        ...list[index],
        code: codeTrimmed,
        name: courseData.name.trim(),
        description: courseData.description !== undefined ? courseData.description.trim() : (list[index].description || ''),
        semester: courseData.semester !== undefined ? Number(courseData.semester) : list[index].semester,
        sks: courseData.sks !== undefined ? Number(courseData.sks) : list[index].sks,
        sesiTeori: courseData.sesiTeori !== undefined ? Number(courseData.sesiTeori) : (list[index].sesiTeori ?? 14),
        sesiPraktik: courseData.sesiPraktik !== undefined ? Number(courseData.sesiPraktik) : (list[index].sesiPraktik ?? 14),
        teoriLuring: courseData.teoriLuring !== undefined ? Number(courseData.teoriLuring) : (list[index].teoriLuring ?? 14),
        teoriDaring: courseData.teoriDaring !== undefined ? Number(courseData.teoriDaring) : (list[index].teoriDaring ?? 0),
        praktikLuring: courseData.praktikLuring !== undefined ? Number(courseData.praktikLuring) : (list[index].praktikLuring ?? 14),
        praktikDaring: courseData.praktikDaring !== undefined ? Number(courseData.praktikDaring) : (list[index].praktikDaring ?? 0),
        peserta: courseData.peserta !== undefined ? Number(courseData.peserta) : (list[index].peserta ?? 90),
        kelasTeoriLuring: courseData.kelasTeoriLuring !== undefined ? Number(courseData.kelasTeoriLuring) : (list[index].kelasTeoriLuring ?? 3),
        kelasPraktikLuring: courseData.kelasPraktikLuring !== undefined ? Number(courseData.kelasPraktikLuring) : (list[index].kelasPraktikLuring ?? 3),
        peralatan: courseData.peralatan !== undefined ? courseData.peralatan.trim() : (list[index].peralatan || ''),
        prodi: courseData.prodi || list[index].prodi || 'Teknik Informatika',
        academicYear: courseData.academicYear || list[index].academicYear || '2026/2027'
      };

      list[index] = updatedCourse;
      saveCurriculum(list);
      resolve(updatedCourse);
    }, 200);
  });
};

export const deleteCourse = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const list = getStoredCurriculum();
      const exists = list.some((c) => c.id === Number(id));

      if (!exists) {
        return reject(new Error('Mata kuliah tidak ditemukan.'));
      }

      const updated = list.filter((c) => c.id !== Number(id));
      saveCurriculum(updated);
      resolve({ success: true, id: Number(id) });
    }, 200);
  });
};

export const downloadCurriculumTemplate = () => {
  const headers = ['Kode', 'Mata Kuliah', 'Semester', 'SKS', 'Sesi Teori', 'Sesi Praktik', 'Peserta'];
  const sampleRows = [
    ['IF318', 'Statistika', 3, 2, 14, 14, 90],
    ['PK31F', 'Pendidikan Kewarganegaraan', 3, 5, 14, 14, 90],
    ['IF314', 'Proyek Inovasi Agile', 3, 6, 14, 14, 90],
    ['IF317', 'Interaksi Manusia Komputer', 1, 4, 14, 14, 100]
  ];

  const wsData = [headers, ...sampleRows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  ws['!cols'] = [
    { wch: 15 },
    { wch: 35 },
    { wch: 12 },
    { wch: 10 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template Kurikulum');
  XLSX.writeFile(wb, 'templat_kurikulum_siap_pbm.xlsx');
};

export const importCurriculumFromExcel = async (file, defaultProdi = 'Teknik Informatika') => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (!json || json.length < 2) {
          return resolve({
            success: false,
            errors: [{ row: 1, reason: 'File Excel kosong atau tidak memiliki baris data.' }]
          });
        }

        const headers = json[0].map((h) => (h ? String(h).trim().toLowerCase() : ''));
        const codeIdx = headers.findIndex((h) => h.includes('kode'));
        const nameIdx = headers.findIndex((h) => h.includes('mata kuliah') || h.includes('nama'));
        const semIdx = headers.findIndex((h) => h.includes('semester'));
        const sksIdx = headers.findIndex((h) => h.includes('sks'));
        const teoriIdx = headers.findIndex((h) => h.includes('teori'));
        const praktikIdx = headers.findIndex((h) => h.includes('praktik'));
        const pesertaIdx = headers.findIndex((h) => h.includes('peserta'));

        if (codeIdx === -1 || nameIdx === -1 || semIdx === -1 || sksIdx === -1) {
          return resolve({
            success: false,
            errors: [
              {
                row: 1,
                reason: 'Format kolom salah. Kolom harus berisi minimal: Kode, Mata Kuliah, Semester, SKS.'
              }
            ]
          });
        }

        const existingCourses = getStoredCurriculum();
        const existingCodes = new Set(existingCourses.map((c) => c.code.toUpperCase()));

        const fileCodes = new Set();
        const errors = [];
        const validRows = [];

        for (let i = 1; i < json.length; i++) {
          const row = json[i];
          const rowNumber = i + 1;

          // Skip completely blank rows
          if (!row || row.length === 0 || row.every((cell) => cell === undefined || cell === '')) {
            continue;
          }

          const rawCode = row[codeIdx] !== undefined ? String(row[codeIdx]).trim().toUpperCase() : '';
          const rawName = row[nameIdx] !== undefined ? String(row[nameIdx]).trim() : '';
          const rawSem = row[semIdx] !== undefined ? String(row[semIdx]).trim() : '';
          const rawSks = row[sksIdx] !== undefined ? String(row[sksIdx]).trim() : '';
          const rawTeori = teoriIdx !== -1 && row[teoriIdx] !== undefined ? String(row[teoriIdx]).trim() : '14';
          const rawPraktik = praktikIdx !== -1 && row[praktikIdx] !== undefined ? String(row[praktikIdx]).trim() : '14';
          const rawPeserta = pesertaIdx !== -1 && row[pesertaIdx] !== undefined ? String(row[pesertaIdx]).trim() : '90';

          if (!rawCode) {
            errors.push({ row: rowNumber, reason: 'Kode mata kuliah wajib diisi.' });
            continue;
          }

          if (fileCodes.has(rawCode)) {
            errors.push({ row: rowNumber, reason: `Kode mata kuliah "${rawCode}" duplikat dalam file.` });
            continue;
          }

          if (existingCodes.has(rawCode)) {
            errors.push({ row: rowNumber, reason: `Kode mata kuliah "${rawCode}" sudah terdaftar di sistem.` });
            continue;
          }

          if (!rawName) {
            errors.push({ row: rowNumber, reason: 'Nama mata kuliah wajib diisi.' });
            continue;
          }

          const semNumber = Number(rawSem);
          if (!rawSem || isNaN(semNumber) || semNumber < 1 || semNumber > 8) {
            errors.push({ row: rowNumber, reason: 'Semester harus berupa angka antara 1 sampai 8.' });
            continue;
          }

          const sksNumber = Number(rawSks);
          if (!rawSks || isNaN(sksNumber) || sksNumber < 1 || sksNumber > 10) {
            errors.push({ row: rowNumber, reason: 'SKS harus berupa angka antara 1 sampai 10.' });
            continue;
          }

          fileCodes.add(rawCode);
          validRows.push({
            code: rawCode,
            name: rawName,
            semester: semNumber,
            sks: sksNumber,
            sesiTeori: Number(rawTeori) || 14,
            sesiPraktik: Number(rawPraktik) || 14,
            peserta: Number(rawPeserta) || 90,
            prodi: defaultProdi,
            academicYear: '2026/2027'
          });
        }

        // All-or-nothing: if any errors occurred, do not save any rows
        if (errors.length > 0) {
          return resolve({ success: false, errors });
        }

        let currentId = existingCourses.length > 0 ? Math.max(...existingCourses.map((c) => c.id || 0)) + 1 : 1;
        const newCoursesWithId = validRows.map((item) => ({
          ...item,
          id: currentId++
        }));

        const updated = [...existingCourses, ...newCoursesWithId];
        saveCurriculum(updated);

        return resolve({ success: true, count: validRows.length });
      } catch {
        return resolve({
          success: false,
          errors: [{ row: 1, reason: 'Gagal membaca berkas Excel. Pastikan format berkas valid (.xlsx).' }]
        });
      }
    };

    reader.onerror = () => {
      resolve({
        success: false,
        errors: [{ row: 1, reason: 'Terjadi kesalahan saat membaca berkas.' }]
      });
    };

    reader.readAsArrayBuffer(file);
  });
};
