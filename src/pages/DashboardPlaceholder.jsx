import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, ChevronDown, Pen, Trash2, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  // Jika bukan Admin(TU), tampilkan placeholder sederhana
  if (user?.role !== 'Admin(TU)') {
    return (
      <div className="min-h-screen bg-ice flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-line rounded-xl p-8 shadow-sm w-full max-w-lg text-center">
          <h1 className="text-3xl font-bold text-navy mb-2">Dashboard {user?.role}</h1>
          <p className="text-slate mb-8">
            Selamat datang, <span className="font-semibold text-ink">{user?.name}</span>.
            <br/>Ini adalah halaman placeholder.
          </p>
          <button
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 bg-danger/10 hover:bg-danger/20 text-danger font-semibold py-2 px-6 rounded-md transition-colors"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </div>
    );
  }

  // Data Dummy untuk Tabel Admin
  const tableData = [
    { name: 'Rina Marlina', nip: '12345678910', username: 'rina.m', email: 'rina.m@polibatam.ac.id', role: 'Admin(TU)', status: 'Aktif' },
    { name: 'Budi Santoso', nip: '12345678910', username: 'budi.s', email: 'budi.s@polibatam.ac.id', role: 'KPS', status: 'Aktif' },
    { name: 'Suci Wulandari', nip: '12345678910', username: 'sari.w', email: 'sari.w@polibatam.ac.id', role: 'Laboran', status: 'Aktif' },
    { name: 'Dedi Kurniawan', nip: '12345678910', username: 'dedi.k', email: 'dedi.k@polibatam.ac.id', role: 'Laboran', status: 'Aktif' },
    { name: 'Hendra Wijaya', nip: '12345678910', username: 'hendra.w', email: 'hendra.w@polibatam.ac.id', role: 'Kajur', status: 'Aktif' },
    { name: 'Anita Putri', nip: '12345678910', username: 'anita.p', email: 'anita.p@polibatam.ac.id', role: 'Dosen', status: 'Aktif' },
    { name: 'Fajar Ramadhan', nip: '12345678910', username: 'fajar.r', email: 'fajar.r@polibatam.ac.id', role: 'Dosen', status: 'Aktif' },
    { name: 'Maya Lestari', nip: '12345678910', username: 'maya.l', email: 'maya.l@polibatam.ac.id', role: 'Dosen', status: 'Aktif' },
    { name: 'Toni Hartono', nip: '12345678910', username: 'toni.h', email: 'toni.h@polibatam.ac.id', role: 'Dosen', status: 'Nonaktif' },
  ];

  return (
    <div className="flex h-screen bg-ice overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-navy h-full flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-amber rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
              <div className="flex gap-1 mt-1.5">
                 <div className="w-2 h-3.5 bg-navy rounded-t-sm"></div>
                 <div className="w-2 h-3.5 bg-navy rounded-t-sm"></div>
              </div>
              <div className="absolute top-1.5 w-1.5 h-1.5 bg-navy rounded-full"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">SIAP - PBM</h1>
              <p className="text-[10px] text-slate">Politeknik Negeri Batam</p>
            </div>
          </div>

          <nav className="space-y-3">
            <a href="#" className="block w-full bg-amber text-amber-ink font-bold py-3 px-5 rounded-[10px] text-sm">
              Data Pengguna
            </a>
            <a href="#" className="block w-full border border-white/20 text-white font-semibold py-3 px-5 rounded-[10px] text-sm hover:bg-white/5 transition-colors">
              Formulir Kompetensi
            </a>
            <a href="#" className="block w-full border border-white/20 text-white font-semibold py-3 px-5 rounded-[10px] text-sm hover:bg-white/5 transition-colors">
              Rekap Kompetensi
            </a>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/10">
          <div className="mb-4">
            <p className="text-white font-bold text-sm">Admin(TU)</p>
            <p className="text-slate text-xs">Jurusan Teknik Informatika</p>
          </div>
          <button 
            onClick={logout}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-4 rounded-[10px] text-sm transition-colors"
          >
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto px-6 py-8 lg:px-10 lg:py-8">
        <div className="max-w-[1120px] mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-[30px] font-bold text-navy leading-[1.2] mb-1">Data pengguna</h2>
              <p className="text-[15px] text-slate">Kelola akun enam kategori pengguna SIAP-PBM</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="bg-white border border-line text-navy font-semibold text-sm py-2 px-4 rounded-[10px] hover:bg-slate/5 transition-colors">
                Impor Excel
              </button>
              <button className="bg-white border border-line text-navy font-semibold text-sm py-2 px-4 rounded-[10px] hover:bg-slate/5 transition-colors">
                Ekspor data
              </button>
              <button className="bg-amber hover:bg-[#FFBA3D] text-amber-ink font-bold text-sm py-2 px-4 rounded-[10px] transition-colors">
                Tambah pengguna
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate" />
              </div>
              <input
                type="text"
                placeholder="Cari nama, nama pengguna atau surel"
                className="w-full h-11 bg-white border border-line text-ink rounded-[10px] pl-11 pr-4 focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring text-sm"
              />
            </div>
            <div className="relative">
              <select className="w-full md:w-[160px] h-11 appearance-none bg-white border border-line text-ink rounded-[10px] pl-4 pr-10 focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring text-sm font-medium">
                <option>Semua peran</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
            </div>
            <div className="relative">
              <select className="w-full md:w-[180px] h-11 appearance-none bg-white border border-line text-ink rounded-[10px] pl-4 pr-10 focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring text-sm font-medium">
                <option>2026/2027 Ganjil</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-line rounded-[14px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-line bg-white">
                    <th className="py-4 px-6 text-sm font-bold text-slate whitespace-nowrap">Nama lengkap</th>
                    <th className="py-4 px-6 text-sm font-bold text-slate whitespace-nowrap">Nama pengguna</th>
                    <th className="py-4 px-6 text-sm font-bold text-slate whitespace-nowrap">Surel</th>
                    <th className="py-4 px-6 text-sm font-bold text-slate whitespace-nowrap text-center">Peran</th>
                    <th className="py-4 px-6 text-sm font-bold text-slate whitespace-nowrap text-center">Status akun</th>
                    <th className="py-4 px-6 text-sm font-bold text-slate whitespace-nowrap text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="border-b border-line last:border-b-0 hover:bg-slate/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="text-[14px] font-semibold text-ink">{row.name}</div>
                        <div className="text-[13px] text-slate">{row.nip}</div>
                      </td>
                      <td className="py-4 px-6 text-[14px] text-ink">{row.username}</td>
                      <td className="py-4 px-6 text-[14px] text-ink">{row.email}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex px-3 py-1 bg-tint text-royal-blue text-[13px] font-semibold rounded-full">
                          {row.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.status === 'Aktif' ? (
                          <span className="inline-flex px-3 py-1 bg-success-bg text-success-text text-[13px] font-semibold rounded-full">
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 bg-disabled-bg text-slate text-[13px] font-semibold rounded-full">
                            Nonaktif
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-lg text-navy text-[13px] font-semibold hover:bg-slate/5 transition-colors">
                            <Pen size={14} /> Ubah
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-lg text-danger text-[13px] font-semibold hover:bg-danger/5 transition-colors">
                            <Trash2 size={14} /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
