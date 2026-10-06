// DUMMY AUTHENTICATION SERVICE
// TODO: Ganti semua fungsi di file ini dengan pemanggilan API Node.js yang sebenarnya.

const dummyUsers = [
  { id: 1, role: 'Admin(TU)', nip: 'admin123', password: 'password123', name: 'Budi (Admin)' },
  { id: 2, role: 'KPS', nip: 'kps123', password: 'password123', name: 'Siti (KPS)' },
  { id: 3, role: 'Laboran', nip: 'laboran123', password: 'password123', name: 'Andi (Laboran)' },
  { id: 4, role: 'Sekjur', nip: 'sekjur123', password: 'password123', name: 'Rini (Sekjur)' },
  { id: 5, role: 'Kajur', nip: 'kajur123', password: 'password123', name: 'Agus (Kajur)' },
  { id: 6, role: 'Dosen', nip: 'dosen123', password: 'password123', name: 'Dina (Dosen)' },
];

export const loginApi = async (role, nip, password) => {
  // Simulasi delay jaringan
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = dummyUsers.find(
        (u) => u.role === role && u.nip === nip && u.password === password
      );

      if (user) {
        // Mengembalikan token dummy dan data user (tanpa password)
        const { password, ...userData } = user;
        resolve({
          status: 'success',
          token: 'dummy-jwt-token-12345',
          user: userData
        });
      } else {
        reject(new Error('NIK/NIP atau kata sandi salah'));
      }
    }, 800);
  });
};
