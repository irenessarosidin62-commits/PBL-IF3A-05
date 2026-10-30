import React from 'react';
import { Pencil, Building2 } from 'lucide-react';

const SarprasTable = ({
  rooms = [],
  onEdit,
  showActions = true,
  isLoading = false
}) => {
  return (
    <div className="w-full bg-white rounded-[14px] border border-line overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="border-b border-line bg-white text-slate">
              <th scope="col" className="py-3.5 px-4 text-[13px] font-bold text-center whitespace-nowrap w-12 sm:w-14">
                No
              </th>
              <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                Kode ruang
              </th>
              <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                Nama ruang
              </th>
              <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                Kategori
              </th>
              <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                Fasilitas
              </th>
              <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                Kapasitas
              </th>
              <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                Lokasi
              </th>
              <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                Status
              </th>
              {showActions && (
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {isLoading ? (
              <tr>
                <td colSpan={showActions ? 9 : 8} className="py-12 text-center text-slate text-[14px]">
                  Memuat data sarana dan prasarana...
                </td>
              </tr>
            ) : rooms.length === 0 ? (
              <tr>
                <td colSpan={showActions ? 9 : 8} className="py-12 text-center text-slate">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Building2 size={32} className="text-slate/40" />
                    <p className="text-[14px] font-medium text-slate">
                      Tidak ada data sarana dan prasarana yang cocok dengan filter atau pencarian.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              rooms.map((room, index) => {
                const isAvailable = room.status === 'tersedia';
                const locationText = `${room.building || 'Gedung Utama'}, lantai ${room.floor || 1}`;

                return (
                  <tr
                    key={room.id}
                    className="hover:bg-slate/5 transition-colors duration-150"
                  >
                    {/* No */}
                    <td className="py-4 px-4 text-[14px] text-slate font-medium text-center whitespace-nowrap">
                      {index + 1}
                    </td>

                    {/* Kode ruang */}
                    <td className="py-4 px-6 text-[14px] font-semibold text-ink whitespace-nowrap">
                      {room.code}
                    </td>

                    {/* Nama ruang */}
                    <td className="py-4 px-6 text-[14px] text-ink font-normal whitespace-nowrap">
                      {room.name}
                    </td>

                    {/* Kategori */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 bg-tint text-royal-blue text-[12px] font-semibold rounded-full">
                        {room.category}
                      </span>
                    </td>

                    {/* Fasilitas */}
                    <td className="py-4 px-6 text-[13px] text-slate max-w-[260px]">
                      {room.facilities || '—'}
                    </td>

                    {/* Kapasitas */}
                    <td className="py-4 px-6 text-[14px] text-slate text-center font-medium">
                      {room.capacity}
                    </td>

                    {/* Lokasi */}
                    <td className="py-4 px-6 text-[14px] text-slate whitespace-nowrap">
                      {locationText}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-[12px] font-semibold rounded-full ${
                          isAvailable
                            ? 'bg-success-bg text-success-text'
                            : 'bg-danger/10 text-danger'
                        }`}
                      >
                        {isAvailable ? 'Tersedia' : 'Bermasalah'}
                      </span>
                    </td>

                    {/* Aksi */}
                    {showActions && (
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onEdit(room)}
                          className="h-[32px] px-3 border border-line rounded-[8px] bg-white text-navy text-[13px] font-semibold hover:bg-slate/5 transition-colors inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
                          title="Ubah data ruang"
                        >
                          <Pencil size={13} />
                          <span>Ubah</span>
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SarprasTable;
