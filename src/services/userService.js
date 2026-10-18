import * as XLSX from 'xlsx';
import { USER_ROLES, USER_STATUS, PAGE_SIZE, ERROR_MESSAGES } from '../constants/userConstants';

const STORAGE_KEY = 'siap_pbm_users';

const INITIAL_USERS = [
  { id: 1, name: 'Ahmad Hamim Thohari', nipNik: '115143', username: 'hamim.t', email: 'hamim.t@polibatam.ac.id', role: 'Kajur', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 2, name: 'Yeni Rokhayati', nipNik: '112093', username: 'yeni.r', email: 'yeni.r@polibatam.ac.id', role: 'KPS', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 3, name: 'Festy Winda Sari', nipNik: '122288', username: 'festy.w', email: 'festy.w@polibatam.ac.id', role: 'Sekjur', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 4, name: 'Happy Yugo Prasetiya', nipNik: '112092', username: 'happy.y', email: 'happy.y@polibatam.ac.id', role: 'KPS', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 5, name: 'Andri Albertha Pratama', nipNik: '211100', username: 'andri.a', email: 'andri.a@polibatam.ac.id', role: 'Laboran', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 6, name: 'Irenessa Rosidin', nipNik: '123456', username: 'irenessa.r', email: 'irenessa.r@polibatam.ac.id', role: 'Tata Usaha', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 7, name: 'Nadya Satya Handayani', nipNik: '125351', username: 'nadya.s', email: 'nadya.s@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.ACTIVE, hasCompetencyRecord: true },
  { id: 8, name: 'Swono Sibagariang', nipNik: '119224', username: 'swono.s', email: 'swono.s@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 9, name: 'Dwi Amalia Purnamasari', nipNik: '121248', username: 'dwi.a', email: 'dwi.a@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.INACTIVE, hasCompetencyRecord: false },
  { id: 10, name: 'Muhamad Sahrul Nizan', nipNik: '221320', username: 'nizan.s', email: 'nizan.s@polibatam.ac.id', role: 'Laboran', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 11, name: 'Bambang Sudarsono', nipNik: '118301', username: 'bambang.s', email: 'bambang.s@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 12, name: 'Nurul Hidayati', nipNik: '119402', username: 'nurul.h', email: 'nurul.h@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 13, name: 'Rahmat Hidayat', nipNik: '120503', username: 'rahmat.h', email: 'rahmat.h@polibatam.ac.id', role: 'Admin', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 14, name: 'Siti Aisyah', nipNik: '121604', username: 'siti.a', email: 'siti.a@polibatam.ac.id', role: 'Tata Usaha', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 15, name: 'Eko Prasetyo', nipNik: '212705', username: 'eko.p', email: 'eko.p@polibatam.ac.id', role: 'Laboran', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 16, name: 'Fitri Handayani', nipNik: '123806', username: 'fitri.h', email: 'fitri.h@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 17, name: 'Gede Arya Wijaya', nipNik: '124907', username: 'gede.a', email: 'gede.a@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 18, name: 'Hadi Susanto', nipNik: '125018', username: 'hadi.s', email: 'hadi.s@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.INACTIVE, hasCompetencyRecord: false },
  { id: 19, name: 'Indah Permata Sari', nipNik: '126129', username: 'indah.p', email: 'indah.p@polibatam.ac.id', role: 'Tata Usaha', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 20, name: 'Joko Widodo', nipNik: '127230', username: 'joko.w', email: 'joko.w@polibatam.ac.id', role: 'Admin', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 21, name: 'Kartika Sari', nipNik: '128341', username: 'kartika.s', email: 'kartika.s@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 22, name: 'Lukman Hakim', nipNik: '129452', username: 'lukman.h', email: 'lukman.h@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 23, name: 'Maya Anggraini', nipNik: '130563', username: 'maya.a', email: 'maya.a@polibatam.ac.id', role: 'Laboran', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false },
  { id: 24, name: 'Nugroho Adi', nipNik: '131674', username: 'nugroho.a', email: 'nugroho.a@polibatam.ac.id', role: 'Dosen', status: USER_STATUS.ACTIVE, hasCompetencyRecord: false }
];

const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USERS;
  }
};

const saveUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch {
    // LocalStorage quota fallback
  }
};

export const fetchUsers = async ({ search = '', role = 'Semua Peran', page = 1, limit = PAGE_SIZE } = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...getStoredUsers()];

      if (search && search.trim() !== '') {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter((u) =>
          u.name.toLowerCase().includes(q) ||
          u.nipNik.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
        );
      }

      if (role && role !== 'Semua Peran') {
        filtered = filtered.filter((u) => u.role === role);
      }

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const validPage = Math.max(1, Math.min(page, totalPages));
      const startIndex = (validPage - 1) * limit;
      const users = filtered.slice(startIndex, startIndex + limit);

      resolve({
        users,
        total,
        page: validPage,
        totalPages,
        limit
      });
    }, 50);
  });
};

export const createUser = async (payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();

      // Uniqueness check
      const usernameExists = users.some(
        (u) => u.username.toLowerCase() === payload.username.trim().toLowerCase()
      );
      if (usernameExists) {
        return reject(new Error(ERROR_MESSAGES.USERNAME_EXISTS));
      }

      const emailExists = users.some(
        (u) => u.email.toLowerCase() === payload.email.trim().toLowerCase()
      );
      if (emailExists) {
        return reject(new Error(ERROR_MESSAGES.EMAIL_EXISTS));
      }

      const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = {
        id: nextId,
        name: payload.name.trim(),
        nipNik: payload.nipNik.trim(),
        username: payload.username.trim(),
        email: payload.email.trim(),
        role: payload.role,
        status: payload.status || USER_STATUS.ACTIVE,
        hasCompetencyRecord: false
      };

      const updated = [newUser, ...users];
      saveUsers(updated);
      resolve(newUser);
    }, 250);
  });
};

export const updateUser = async (id, payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const index = users.findIndex((u) => u.id === Number(id));

      if (index === -1) {
        return reject(new Error('Pengguna tidak ditemukan.'));
      }

      // Uniqueness check for username & email against other users
      const usernameExists = users.some(
        (u) => u.id !== Number(id) && u.username.toLowerCase() === payload.username.trim().toLowerCase()
      );
      if (usernameExists) {
        return reject(new Error(ERROR_MESSAGES.USERNAME_EXISTS));
      }

      const emailExists = users.some(
        (u) => u.id !== Number(id) && u.email.toLowerCase() === payload.email.trim().toLowerCase()
      );
      if (emailExists) {
        return reject(new Error(ERROR_MESSAGES.EMAIL_EXISTS));
      }

      const updatedUser = {
        ...users[index],
        name: payload.name.trim(),
        nipNik: payload.nipNik.trim(),
        username: payload.username.trim(),
        email: payload.email.trim(),
        role: payload.role,
        status: payload.status
      };

      users[index] = updatedUser;
      saveUsers(users);
      resolve(updatedUser);
    }, 250);
  });
};

export const deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const user = users.find((u) => u.id === Number(id));

      if (!user) {
        return reject(new Error('Pengguna tidak ditemukan.'));
      }

      // Check relation to competency form (simulate 409 conflict)
      if (user.hasCompetencyRecord) {
        const error = new Error('Pengguna sudah mengisi form kompetensi, datanya masih terhubung.');
        error.status = 409;
        error.user = user;
        return reject(error);
      }

      const updated = users.filter((u) => u.id !== Number(id));
      saveUsers(updated);
      resolve({ success: true, id: Number(id) });
    }, 250);
  });
};

export const updateUserStatus = async (id, status) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const index = users.findIndex((u) => u.id === Number(id));

      if (index === -1) {
        return reject(new Error('Pengguna tidak ditemukan.'));
      }

      users[index].status = status;
      saveUsers(users);
      resolve(users[index]);
    }, 200);
  });
};

export const downloadExcelTemplate = () => {
  const headers = ['nama lengkap', 'NIP/NIK', 'nama pengguna', 'surel', 'peran'];
  const sampleRows = [
    ['Budi Santoso', '118231', 'budi.s', 'budi.s@polibatam.ac.id', 'Dosen'],
    ['Siti Aminah', '118232', 'siti.a', 'siti.a@polibatam.ac.id', 'Tata Usaha'],
    ['Rian Pratama', '218233', 'rian.p', 'rian.p@polibatam.ac.id', 'Laboran']
  ];

  const wsData = [headers, ...sampleRows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  ws['!cols'] = [
    { wch: 25 },
    { wch: 15 },
    { wch: 20 },
    { wch: 28 },
    { wch: 16 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template Pengguna');
  XLSX.writeFile(wb, 'templat_pengguna_siap_pbm.xlsx');
};

export const exportUsersToExcel = async ({ search = '', role = 'Semua Peran' } = {}) => {
  let filtered = [...getStoredUsers()];

  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter((u) =>
      u.name.toLowerCase().includes(q) ||
      u.nipNik.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }

  if (role && role !== 'Semua Peran') {
    filtered = filtered.filter((u) => u.role === role);
  }

  // Column mapping (password excluded strictly!)
  const exportData = filtered.map((u) => ({
    'Nama Lengkap': u.name,
    'NIP/NIK': u.nipNik,
    'Nama Pengguna': u.username,
    'Surel': u.email,
    'Peran': u.role,
    'Status Akun': u.status
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  ws['!cols'] = [
    { wch: 28 },
    { wch: 16 },
    { wch: 20 },
    { wch: 30 },
    { wch: 16 },
    { wch: 14 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data Pengguna');
  XLSX.writeFile(wb, 'data_pengguna_siap_pbm.xlsx');
};

export const importUsersFromExcel = async (file) => {
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
        const nameIdx = headers.findIndex((h) => h.includes('nama lengkap') || h === 'nama');
        const nipIdx = headers.findIndex((h) => h.includes('nip') || h.includes('nik'));
        const usernameIdx = headers.findIndex((h) => h.includes('nama pengguna') || h.includes('username'));
        const emailIdx = headers.findIndex((h) => h.includes('surel') || h.includes('email'));
        const roleIdx = headers.findIndex((h) => h.includes('peran') || h.includes('role'));

        if (nameIdx === -1 || nipIdx === -1 || usernameIdx === -1 || emailIdx === -1 || roleIdx === -1) {
          return resolve({
            success: false,
            errors: [
              {
                row: 1,
                reason: 'Format kolom salah. Kolom harus berisi: nama lengkap, NIP/NIK, nama pengguna, surel, peran.'
              }
            ]
          });
        }

        const existingUsers = getStoredUsers();
        const existingUsernames = new Set(existingUsers.map((u) => u.username.toLowerCase()));
        const existingEmails = new Set(existingUsers.map((u) => u.email.toLowerCase()));

        const fileUsernames = new Set();
        const fileEmails = new Set();
        const errors = [];
        const validRows = [];

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Iterate data rows (1-indexed row number in Excel: header is row 1, data starts row 2)
        for (let i = 1; i < json.length; i++) {
          const row = json[i];
          const rowNumber = i + 1;

          // Skip completely empty row
          if (!row || row.length === 0 || row.every((cell) => cell === undefined || cell === '')) {
            continue;
          }

          const rawName = row[nameIdx] !== undefined ? String(row[nameIdx]).trim() : '';
          const rawNip = row[nipIdx] !== undefined ? String(row[nipIdx]).trim() : '';
          const rawUsername = row[usernameIdx] !== undefined ? String(row[usernameIdx]).trim() : '';
          const rawEmail = row[emailIdx] !== undefined ? String(row[emailIdx]).trim() : '';
          const rawRole = row[roleIdx] !== undefined ? String(row[roleIdx]).trim() : '';

          if (!rawName) {
            errors.push({ row: rowNumber, reason: 'Nama lengkap wajib diisi.' });
            continue;
          }

          if (!rawNip) {
            errors.push({ row: rowNumber, reason: 'NIP/NIK wajib diisi.' });
            continue;
          } else if (!/^\d+$/.test(rawNip)) {
            errors.push({ row: rowNumber, reason: 'NIP/NIK hanya boleh berisi angka.' });
            continue;
          }

          if (!rawUsername) {
            errors.push({ row: rowNumber, reason: 'Nama pengguna wajib diisi.' });
            continue;
          } else if (existingUsernames.has(rawUsername.toLowerCase()) || fileUsernames.has(rawUsername.toLowerCase())) {
            errors.push({ row: rowNumber, reason: 'Nama pengguna sudah terdaftar.' });
            continue;
          }

          if (!rawEmail) {
            errors.push({ row: rowNumber, reason: 'Surel wajib diisi.' });
            continue;
          } else if (!emailRegex.test(rawEmail)) {
            errors.push({ row: rowNumber, reason: 'Format surel salah.' });
            continue;
          } else if (existingEmails.has(rawEmail.toLowerCase()) || fileEmails.has(rawEmail.toLowerCase())) {
            errors.push({ row: rowNumber, reason: 'Surel sudah terdaftar.' });
            continue;
          }

          const matchedRole = USER_ROLES.find((r) => r.toLowerCase() === rawRole.toLowerCase());
          if (!matchedRole) {
            errors.push({ row: rowNumber, reason: `Peran "${rawRole}" tidak valid.` });
            continue;
          }

          fileUsernames.add(rawUsername.toLowerCase());
          fileEmails.add(rawEmail.toLowerCase());

          validRows.push({
            name: rawName,
            nipNik: rawNip,
            username: rawUsername,
            email: rawEmail,
            role: matchedRole,
            status: USER_STATUS.ACTIVE,
            hasCompetencyRecord: false
          });
        }

        // All-or-nothing rule
        if (errors.length > 0) {
          return resolve({ success: false, errors });
        }

        let currentId = existingUsers.length > 0 ? Math.max(...existingUsers.map((u) => u.id)) + 1 : 1;
        const newUsersWithId = validRows.map((item) => ({
          ...item,
          id: currentId++
        }));

        const updatedUsers = [...newUsersWithId, ...existingUsers];
        saveUsers(updatedUsers);

        return resolve({ success: true, count: validRows.length });
      } catch {
        return resolve({
          success: false,
          errors: [{ row: 1, reason: 'Gagal membaca berkas Excel. Pastikan format berkas valid.' }]
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
