import React, { useState } from 'react';
import { Pencil, Check, X, Plus } from 'lucide-react';

// Color formatting for Dosen Wali scale (1-5)
const getScoreBadgeWali = (score) => {
  if (score === '-' || score === null || score === undefined) {
    return <span className="text-[#64748B] font-medium">-</span>;
  }

  const num = Number(score);
  if (num >= 4) {
    // 4-5: Kompetensi kuat (hijau)
    return <span className="text-[#16A34A] font-bold">{num}</span>;
  }
  if (num === 3) {
    // 3: Cukup (biru)
    return <span className="text-[#2563EB] font-bold">{num}</span>;
  }
  // 1-2: Perlu pembinaan (cokelat / amber)
  return <span className="text-[#B45309] font-bold">{num}</span>;
};

const RekapWaliTable = ({
  data = [],
  emptyMessage = 'Tidak ada data dosen wali yang ditemukan.',
  onUpdateTindakLanjut
}) => {
  // Inline edit state for Rencana Tindak Lanjut
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.tindakLanjut === 'Belum Diisi' ? '' : item.tindakLanjut);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleSaveEdit = (itemId) => {
    const finalValue = editValue.trim() || 'Belum Diisi';
    if (onUpdateTindakLanjut) {
      onUpdateTindakLanjut(itemId, finalValue);
    }
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="w-full font-sans">
      {/* Table Card Container */}
      <div className="bg-white rounded-[16px] border border-[#D8E0EE] shadow-[0_2px_12px_rgba(10,35,82,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center text-[13px] sm:text-[14px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#F8FAFC] text-[#0F1B33] border-b border-[#E2E8F0]">
                <th className="py-3.5 px-3 sm:px-4 font-bold text-center border-r border-[#E2E8F0] w-[50px]">
                  No
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-bold text-left border-r border-[#E2E8F0] min-w-[210px]">
                  Dosen
                </th>
                <th className="py-3.5 px-2.5 sm:px-3 font-bold text-center border-r border-[#E2E8F0] min-w-[85px]">
                  <div>A.</div>
                  <div className="text-[12px] font-semibold text-[#51607A]">Perwalian</div>
                </th>
                <th className="py-3.5 px-2.5 sm:px-3 font-bold text-center border-r border-[#E2E8F0] min-w-[95px]">
                  <div>B.</div>
                  <div className="text-[12px] font-semibold text-[#51607A]">Biaya Kuliah</div>
                </th>
                <th className="py-3.5 px-2.5 sm:px-3 font-bold text-center border-r border-[#E2E8F0] min-w-[85px]">
                  <div>C.</div>
                  <div className="text-[12px] font-semibold text-[#51607A]">Kurikulum</div>
                </th>
                <th className="py-3.5 px-2.5 sm:px-3 font-bold text-center border-r border-[#E2E8F0] min-w-[85px]">
                  <div>D.</div>
                  <div className="text-[12px] font-semibold text-[#51607A]">Peraturan</div>
                </th>
                <th className="py-3.5 px-2.5 sm:px-3 font-bold text-center border-r border-[#E2E8F0] min-w-[95px]">
                  <div>E.</div>
                  <div className="text-[12px] font-semibold text-[#51607A]">Komunikasi</div>
                </th>
                <th className="py-3.5 px-2.5 sm:px-3 font-bold text-center border-r border-[#E2E8F0] min-w-[85px]">
                  <div>F.</div>
                  <div className="text-[12px] font-semibold text-[#51607A]">Motivasi</div>
                </th>
                <th className="py-3.5 px-3 font-bold text-center border-r border-[#E2E8F0] min-w-[85px]">
                  Rata-rata
                </th>
                <th className="py-3.5 px-3 font-bold text-center border-r border-[#E2E8F0] min-w-[120px]">
                  Hasil Evaluasi
                </th>
                <th className="py-3.5 px-4 font-bold text-left min-w-[240px]">
                  Rencana tindak lanjut
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E2E8F0]">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="py-12 text-center text-[#51607A] text-[14px] font-medium"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => {
                  const isEditing = editingId === item.id;
                  const isBelumDiisi = item.tindakLanjut === 'Belum Diisi';

                  return (
                    <tr
                      key={item.id || index}
                      className="hover:bg-[#F8FAFC]/80 transition-colors"
                    >
                      {/* No */}
                      <td className="py-4 px-3 text-center font-bold text-[#0F1B33] border-r border-[#E2E8F0]">
                        {item.no || index + 1}
                      </td>

                      {/* Dosen: Nama + NIP */}
                      <td className="py-4 px-4 sm:px-6 text-left border-r border-[#E2E8F0]">
                        <div className="font-bold text-[#0A2352] text-[14px] leading-snug">
                          {item.name}
                        </div>
                        <div className="text-[12px] text-[#51607A] font-medium mt-0.5">
                          {item.nip}
                        </div>
                      </td>

                      {/* A. Perwalian */}
                      <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                        {getScoreBadgeWali(item.scores?.perwalian)}
                      </td>

                      {/* B. Biaya Kuliah */}
                      <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                        {getScoreBadgeWali(item.scores?.biayaKuliah)}
                      </td>

                      {/* C. Kurikulum */}
                      <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                        {getScoreBadgeWali(item.scores?.kurikulum)}
                      </td>

                      {/* D. Peraturan */}
                      <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                        {getScoreBadgeWali(item.scores?.peraturan)}
                      </td>

                      {/* E. Komunikasi */}
                      <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                        {getScoreBadgeWali(item.scores?.komunikasi)}
                      </td>

                      {/* F. Motivasi */}
                      <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                        {getScoreBadgeWali(item.scores?.motivasi)}
                      </td>

                      {/* Rata-rata */}
                      <td className="py-4 px-3 text-center font-bold text-[#0F1B33] border-r border-[#E2E8F0]">
                        {typeof item.average === 'number'
                          ? item.average.toFixed(1)
                          : item.average}
                      </td>

                      {/* Hasil Evaluasi */}
                      <td className="py-4 px-3 text-center font-semibold text-[13px] text-[#0F1B33] border-r border-[#E2E8F0]">
                        {item.evaluasi}
                      </td>

                      {/* Rencana Tindak Lanjut (Dapat diinput / diedit oleh Kajur) */}
                      <td className="py-3.5 px-4 text-left">
                        {isEditing ? (
                          <div className="flex items-center gap-1.5 max-w-[280px]">
                            <input
                              type="text"
                              list="rencana-suggestions"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit(item.id);
                                if (e.key === 'Escape') handleCancelEdit();
                              }}
                              autoFocus
                              placeholder="Masukkan rencana tindak lanjut..."
                              className="h-[34px] w-full bg-white border border-[#1B4FD8] rounded-[8px] px-2.5 text-xs text-[#0F1B33] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/20 transition"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(item.id)}
                              className="h-[34px] w-[34px] flex items-center justify-center bg-[#1B4FD8] hover:bg-[#153eb5] text-white rounded-[8px] shrink-0 transition cursor-pointer shadow-2xs"
                              title="Simpan"
                            >
                              <Check size={14} strokeWidth={2.4} />
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="h-[34px] w-[34px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-[8px] shrink-0 transition cursor-pointer"
                              title="Batal"
                            >
                              <X size={14} strokeWidth={2.4} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleStartEdit(item)}
                            className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-medium border transition cursor-pointer text-left ${
                              isBelumDiisi
                                ? 'border-[#CBD5E1] hover:border-[#1B4FD8] text-[#94A3B8] hover:text-[#1B4FD8] bg-white hover:bg-blue-50/40'
                                : 'border-[#CBD5E1] hover:border-[#1B4FD8] text-[#0F1B33] bg-white shadow-2xs hover:bg-blue-50/20'
                            }`}
                            title={
                              isBelumDiisi
                                ? 'Klik untuk mengisi rencana tindak lanjut'
                                : 'Klik untuk mengubah rencana tindak lanjut'
                            }
                          >
                            <span>{item.tindakLanjut}</span>
                            {isBelumDiisi ? (
                              <Plus
                                size={12}
                                strokeWidth={2.4}
                                className="text-[#94A3B8] group-hover:text-[#1B4FD8] shrink-0 transition-colors"
                              />
                            ) : (
                              <Pencil
                                size={12}
                                className="opacity-0 group-hover:opacity-100 text-[#1B4FD8] transition-opacity shrink-0 ml-1"
                              />
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Datalist saran untuk mempercepat input Kajur */}
      <datalist id="rencana-suggestions">
        <option value="Pendampingan peraturan akademik" />
        <option value="Pelatihan perwalian" />
        <option value="Bimbingan konseling mahasiswa" />
        <option value="Sosialisasi kurikulum dan silabus" />
        <option value="Peningkatan motivasi & komunikasi" />
      </datalist>

      {/* Skala Kompetensi Dosen Wali (Skala 1–5, matching Figma design) */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] sm:text-[13px] text-[#0F1B33]">
        <span className="font-bold text-[#0F1B33]">Skala 1–5:</span>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#16A34A]">4–5</span>
          <span className="text-[#334155] font-medium">Kompetensi kuat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#2563EB]">3</span>
          <span className="text-[#334155] font-medium">Cukup</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#B45309]">1–2</span>
          <span className="text-[#334155] font-medium">Perlu pembinaan</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#64748B]">"-"</span>
          <span className="text-[#51607A] font-medium">
            = Belum terkirim (belum menginput atau masih Draf)
          </span>
        </div>
      </div>
    </div>
  );
};

export default RekapWaliTable;
