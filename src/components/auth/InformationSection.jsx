import React from 'react';
import { Users, ClipboardList, ShieldCheck } from 'lucide-react';

const InformationSection = () => {
  return (
    <div className="flex w-full flex-col">
      <h2 className="mb-[30px] text-[40px] font-extrabold leading-[1.08] tracking-[-0.035em] text-white sm:text-[50px] lg:text-[58px]">
        Sistem Perencanaan<br />Proses Belajar<br />Mengajar Terpadu
      </h2>

      <div className="flex flex-col gap-5">
        {/* Top 2 Cards Row */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {/* Card 1: 6 Peran */}
          <div className="min-h-[176px] rounded-[16px] border border-white/10 bg-[#203A68] p-5 sm:p-6">
            <div className="mb-4 text-amber">
              <Users size={25} fill="currentColor" strokeWidth={2.2} />
            </div>
            <h3 className="mb-1.5 text-[19px] font-bold leading-tight text-white">6 Peran Terintegrasi</h3>
            <p className="text-[15px] leading-relaxed text-[#D1D9E8]">
              Admin(TU), KPS, Laboran, Sekjur, Kajur, Dosen
            </p>
          </div>

          {/* Card 2: Rekap */}
          <div className="min-h-[176px] rounded-[16px] border border-white/10 bg-[#203A68] p-5 sm:p-6">
            <div className="mb-4 text-amber">
              <ClipboardList size={25} fill="currentColor" strokeWidth={2.2} />
            </div>
            <h3 className="mb-1.5 text-[19px] font-bold leading-tight text-white">Rekap Kompetensi</h3>
            <p className="text-[15px] leading-relaxed text-[#D1D9E8]">
              Skala 0–8 per dosen, terverifikasi
            </p>
          </div>
        </div>

        {/* Card 3: Semester Status */}
        <div className="flex min-h-[204px] flex-col justify-between rounded-[16px] border border-white/10 bg-[#203A68] p-6 sm:p-[30px]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="text-[15px] font-semibold text-[#D1D9E8]">
              Status semester berjalan
            </span>
            <span className="rounded-full bg-[#DDF5E6] px-4 py-1.5 text-[13px] font-bold text-[#0E5A2B]">
              Aktif &amp; Berjalan
            </span>
          </div>
          
          <div>
            <h3 className="mb-4 text-[32px] font-bold leading-tight tracking-tight text-white sm:text-[36px]">
              TA 2026/2027 Ganjil
            </h3>

            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <ShieldCheck size={19} fill="#FFB020" className="shrink-0 text-[#0E2857]" />
              <span className="text-[15px] text-[#D1D9E8]">
                Pangkalan data terenkripsi SSL Polibatam
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
