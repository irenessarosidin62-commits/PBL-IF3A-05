// DUMMY AUTHENTICATION SERVICE
// TODO: Ganti semua fungsi di file ini dengan pemanggilan API Node.js yang sebenarnya.

const dummyUsers = [
  { id: 1, role: 'Admin', nip: 'admin123', password: 'password123', name: 'Admin', email: 'admin@polibatam.ac.id' },
  { id: 2, role: 'Tata Usaha', nip: 'tu123', password: 'password123', name: 'Irenessa Rosidin', email: 'irenessa.r@polibatam.ac.id' },
  { id: 3, role: 'KPS', nip: 'kps123', password: 'password123', name: 'Yeni Rokhayati', email: 'yeni.r@polibatam.ac.id' },
  { id: 4, role: 'Laboran', nip: 'laboran123', nik: '221320', password: 'password123', name: 'Muhammad Sahrul Nizan', email: 'sahrul.n@polibatam.ac.id', unit: 'Laboran Teknik Informatika' },
  { id: 5, role: 'Sekjur', nip: 'sekjur123', password: 'password123', name: 'Festy Winda Sari', email: 'festy.w@polibatam.ac.id' },
  { id: 6, role: 'Kajur', nip: 'kajur123', password: 'password123', name: 'Ahmad Hamim Thohari', email: 'hamim.t@polibatam.ac.id' },
  { id: 7, role: 'Dosen', nip: 'dosen123', password: 'password123', name: 'Nadya Satya Handayani', email: 'nadya.s@polibatam.ac.id' }
];

export const loginApi = async (role, nip, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = dummyUsers.find(
        (u) => u.role === role && (u.nip === nip || u.nik === nip) && u.password === password
      );

      if (user) {
        const { password: _password, ...userData } = user;
        resolve({
          status: 'success',
          token: 'dummy-jwt-token-12345',
          user: userData
        });
      } else {
        reject(new Error('NIK/NIP atau kata sandi salah'));
      }
    }, 400);
  });
};
