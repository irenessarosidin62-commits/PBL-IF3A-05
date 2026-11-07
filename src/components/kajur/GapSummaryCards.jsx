import React from 'react';

const GapSummaryCards = () => {
  return (
    <div className="space-y-6">
      {/* 1. Card Sumber Data Analisis */}
      <div className="bg-white rounded-[16px] border border-[#D8E0EE] p-5 sm:p-6 shadow-[0_2px_12px_rgba(10,35,82,0.03)]">
        <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0A2352] mb-4">
          Sumber Data Analisis
        </h3>

        {/* 4 Mini Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
          {/* Subcard 1: Rekap Kompetensi */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex flex-col justify-center min-h-[92px]">
            <span className="text-[14px] sm:text-[15px] font-bold text-[#0A2352]">
              Rekap Kompetensi
            </span>
            <span className="text-[12.5px] sm:text-[13px] text-gray-500 font-medium mt-1">
              14 dari 16 dosen sudah mengisi
            </span>
          </div>

          {/* Subcard 2: Data Kurikulum */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex flex-col justify-center min-h-[92px]">
            <span className="text-[14px] sm:text-[15px] font-bold text-[#0A2352]">
              Data Kurikulum
            </span>
            <span className="text-[13px] sm:text-[14px] font-semibold text-[#0D9488] mt-1">
              Lengkap
            </span>
          </div>

          {/* Subcard 3: SDM */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex flex-col justify-center min-h-[92px]">
            <span className="text-[14px] sm:text-[15px] font-bold text-[#0A2352]">
              SDM
            </span>
            <span className="text-[13px] sm:text-[14px] font-semibold text-[#0D9488] mt-1">
              Lengkap
            </span>
          </div>

          {/* Subcard 4: Sarana dan Prasarana */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex flex-col justify-center min-h-[92px]">
            <span className="text-[14px] sm:text-[15px] font-bold text-[#0A2352]">
              Sarana dan Prasarana
            </span>
            <span className="text-[13px] sm:text-[14px] font-semibold text-[#0D9488] mt-1">
              Lengkap
            </span>
          </div>
        </div>

        {/* Update note */}
        <p className="text-[11.5px] sm:text-xs text-gray-400 font-normal mb-3.5">
          Dihitung otomatis saat menu dibuka. Terakhir diperbarui 16 Okt 2026, 17.06.
        </p>

        {/* Warning notification banner */}
        <div className="bg-[#FEF9C3] border border-[#FDE047] rounded-[10px] px-4 py-3 text-xs sm:text-[13px] text-[#854D0E] font-medium leading-relaxed">
          Rekap kompetensi belum lengkap. Hasil analisis dapat berubah setelah semua dosen mengirim form kompetensi.
        </div>
      </div>

      {/* 2. 3 Horizontal Summary Cards: Ringkasan Kebutuhan Sumber Daya */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Card A: Dosen */}
        <div className="bg-white rounded-[16px] border border-[#D8E0EE] p-5 sm:p-6 shadow-[0_2px_12px_rgba(10,35,82,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-[17px] font-bold text-[#0A2352]">
              Dosen
            </h4>
            <span className="bg-[#FEE2E2] text-[#DC2626] text-xs font-bold px-3 py-1 rounded-full">
              Kurang 2
            </span>
          </div>

          <div className="space-y-4">
            {/* Row Kebutuhan */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="text-gray-500">Kebutuhan</span>
                <span className="font-bold text-[#0A2352]">8</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A2352] rounded-full transition-all duration-500"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Row Tersedia (Kompeten) */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="text-gray-500">Tersedia (Kompeten)</span>
                <span className="font-bold text-[#0A2352]">6</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFB020] rounded-full transition-all duration-500"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card B: Ruang Kelas */}
        <div className="bg-white rounded-[16px] border border-[#D8E0EE] p-5 sm:p-6 shadow-[0_2px_12px_rgba(10,35,82,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-[17px] font-bold text-[#0A2352]">
              Ruang Kelas
            </h4>
            <span className="bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-3 py-1 rounded-full">
              Cukup
            </span>
          </div>

          <div className="space-y-4">
            {/* Row Kebutuhan */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="text-gray-500">Kebutuhan</span>
                <span className="font-bold text-[#0A2352]">6</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFB020] rounded-full transition-all duration-500"
                  style={{ width: '75%' }}
                />
              </div>
            </div>

            {/* Row Tersedia */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="text-gray-500">Tersedia</span>
                <span className="font-bold text-[#0A2352]">8</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A2352] rounded-full transition-all duration-500"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card C: Laboratorium */}
        <div className="bg-white rounded-[16px] border border-[#D8E0EE] p-5 sm:p-6 shadow-[0_2px_12px_rgba(10,35,82,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-[17px] font-bold text-[#0A2352]">
              Laboratorium
            </h4>
            <span className="bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-3 py-1 rounded-full">
              Cukup
            </span>
          </div>

          <div className="space-y-4">
            {/* Row Kebutuhan */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="text-gray-500">Kebutuhan</span>
                <span className="font-bold text-[#0A2352]">4</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFB020] rounded-full transition-all duration-500"
                  style={{ width: '50%' }}
                />
              </div>
            </div>

            {/* Row Tersedia */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="text-gray-500">Tersedia</span>
                <span className="font-bold text-[#0A2352]">8</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A2352] rounded-full transition-all duration-500"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GapSummaryCards;

