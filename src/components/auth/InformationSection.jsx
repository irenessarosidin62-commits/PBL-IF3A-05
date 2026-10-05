import React from 'react';
import { Users, ClipboardList, CheckCircle2 } from 'lucide-react';

const InformationSection = () => {
  return (
    <div className="flex flex-col justify-center h-full max-w-xl">
      <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight mb-12">
        Sistem Perencanaan Proses Belajar Mengajar Terpadu
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Card 1: 6 Peran */}
        <div className="bg-surface border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-surface-blue rounded-lg flex items-center justify-center text-primary mb-4">
            <Users size={24} />
          </div>
          <h3 className="font-bold text-primary mb-2 text-lg">6 Peran Terintegrasi</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Admin(TU), KPS, Laboran, Sekjur, Kajur, Dosen
          </p>
        </div>

        {/* Card 2: Rekap */}
        <div className="bg-surface border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-surface-blue rounded-lg flex items-center justify-center text-primary mb-4">
            <ClipboardList size={24} />
          </div>
          <h3 className="font-bold text-primary mb-2 text-lg">Rekap Kompetensi</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Skala 0-8 per dosen, terverifikasi
          </p>
        </div>
      </div>

      {/* Card 3: Semester Status */}
      <div className="bg-surface border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-surface-blue rounded-full opacity-50 blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <span className="text-xs font-bold text-secondary tracking-wider uppercase">
            Status Semester Berjalan
          </span>
          <span className="text-xs font-bold bg-primary text-white px-3 py-1 rounded-full">
            Aktif & Berjalan
          </span>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-primary mb-6">
            TA 2026/2027 Ganjil
          </h3>
          
          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            <CheckCircle2 size={16} className="text-secondary" />
            <span className="text-sm text-secondary">
              Pangkalan Data Terenkripsi SSL Polibatam
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
