import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const DashboardPlaceholder = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-ice flex flex-col items-center justify-center p-4">
      <div className="bg-white border border-line rounded-xl p-8 shadow-sm w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-navy mb-2">Dashboard {user?.role}</h1>
        <p className="text-slate mb-8">
          Selamat datang, <span className="font-semibold text-ink">{user?.name}</span>.
          <br />Ini adalah halaman placeholder.
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
};

export default DashboardPlaceholder;
