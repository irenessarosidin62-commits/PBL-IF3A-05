export const USER_ROLES = [
  'Admin',
  'Tata Usaha',
  'KPS',
  'Laboran',
  'Sekjur',
  'Kajur',
  'Dosen'
];

export const FILTER_ROLES = ['Semua Peran', ...USER_ROLES];

export const USER_STATUS = {
  ACTIVE: 'Aktif',
  INACTIVE: 'Nonaktif'
};

export const PAGE_SIZE = 10;

export const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Nama lengkap wajib diisi.',
  NIP_REQUIRED: 'NIP / NIK wajib diisi.',
  NIP_DIGITS_ONLY: 'NIP / NIK hanya boleh berisi angka.',
  USERNAME_REQUIRED: 'Nama pengguna wajib diisi.',
  USERNAME_EXISTS: 'Nama pengguna sudah terdaftar.',
  EMAIL_REQUIRED: 'Surel wajib diisi.',
  EMAIL_INVALID: 'Format surel salah.',
  EMAIL_EXISTS: 'Surel sudah terdaftar.',
  PASSWORD_REQUIRED: 'Kata sandi awal wajib diisi.',
  PASSWORD_MIN_LENGTH: 'Kata sandi minimal 8 karakter.',
  ROLE_REQUIRED: 'Peran wajib dipilih.',
  STATUS_REQUIRED: 'Status akun wajib dipilih.'
};

export const TOAST_MESSAGES = {
  SAVED: 'Data pengguna berhasil disimpan.',
  DELETED: 'Pengguna berhasil dihapus.',
  STATUS_UPDATED: 'Status akun berhasil diperbarui.',
  IMPORT_SUCCESS: (count) => `${count} data berhasil diimpor.`
};
