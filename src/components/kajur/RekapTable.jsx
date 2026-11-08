import React, { useState } from 'react';
import { Info } from 'lucide-react';
import CourseDetailDialog from './CourseDetailDialog';

// Color formatting based on the competency scale
const getScoreBadge = (score) => {
  if (score === '-' || score === null || score === undefined) {
    return <span className="text-[#64748B] font-medium">-</span>;
  }

  const num = Number(score);
  if (num >= 6) {
    // 6-8: Kompetensi kuat (hijau)
    return <span className="text-[#16A34A] font-bold">{num}</span>;
  }
  if (num >= 3) {
    // 3-5: Cukup (biru)
    return <span className="text-[#2563EB] font-bold">{num}</span>;
  }
  // 0-2: Perlu pengampu (cokelat / amber)
  return <span className="text-[#B45309] font-bold">{num}</span>;
};

const RekapTable = ({
  data = [],
  emptyMessage = 'Tidak ada data mata kuliah yang ditemukan.'
}) => {
  const [detailCourse, setDetailCourse] = useState(null);
  return (
    <div className="w-full">
      {/* Table Card Container */}
      <div className="bg-white rounded-[16px] border border-[#D8E0EE] shadow-[0_2px_12px_rgba(10,35,82,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center text-[13px] sm:text-[14px]">
            {/* Table Headers */}
            <thead>
              {/* Row 1: Group Headers */}
              <tr className="bg-[#F8FAFC] text-[#0F1B33] border-b border-[#E2E8F0]">
                <th
                  rowSpan={2}
                  className="py-3 px-3 sm:px-4 font-bold text-center border-r border-[#E2E8F0] w-[50px]"
                >
                  No
                </th>
                <th
                  rowSpan={2}
                  className="py-3 px-4 sm:px-6 font-bold text-left border-r border-[#E2E8F0] min-w-[200px]"
                >
                  Mata Kuliah
                </th>
                <th
                  colSpan={4}
                  className="py-2.5 px-3 font-bold text-center border-r border-[#E2E8F0]"
                >
                  Rekapitulasi Kompetensi Dosen
                </th>
                <th
                  colSpan={2}
                  className="py-2.5 px-3 font-bold text-center border-r border-[#E2E8F0]"
                >
                  Nilai Minimal
                </th>
                <th
                  colSpan={5}
                  className="py-2.5 px-3 font-bold text-center"
                >
                  Koordinator dan Pengajar
                </th>
              </tr>

              {/* Row 2: Sub Headers */}
              <tr className="bg-[#F8FAFC] text-[#0F1B33] border-b border-[#E2E8F0] text-[12px] sm:text-[13px]">
                {/* Under Rekapitulasi */}
                <th className="py-2 px-2.5 font-bold border-r border-[#E2E8F0] w-[58px]">
                  Dwi A.
                </th>
                <th className="py-2 px-2.5 font-bold border-r border-[#E2E8F0] w-[62px]">
                  Swono S.
                </th>
                <th className="py-2 px-2.5 font-bold border-r border-[#E2E8F0] w-[62px]">
                  Nadya S.
                </th>
                <th className="py-2 px-2.5 font-bold border-r border-[#E2E8F0] w-[58px]">
                  Sri R.
                </th>

                {/* Under Nilai Minimal */}
                <th className="py-2 px-3 font-bold border-r border-[#E2E8F0] min-w-[85px]">
                  Koordinator
                </th>
                <th className="py-2 px-3 font-bold border-r border-[#E2E8F0] min-w-[75px]">
                  Pengajar
                </th>

                {/* Under Koordinator dan Pengajar */}
                <th className="py-2 px-3 font-bold border-r border-[#E2E8F0] min-w-[95px]">
                  Koordinator
                </th>
                <th className="py-2 px-3 font-bold border-r border-[#E2E8F0] min-w-[85px]">
                  Pengajar 1
                </th>
                <th className="py-2 px-3 font-bold border-r border-[#E2E8F0] min-w-[85px]">
                  Pengajar 2
                </th>
                <th className="py-2 px-3 font-bold border-r border-[#E2E8F0] min-w-[85px]">
                  Pengajar 3
                </th>
                <th className="py-2 px-3 font-bold min-w-[85px]">
                  Pengajar 4
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E2E8F0]">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={13}
                    className="py-12 text-center text-[#51607A] text-[14px] font-medium"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-[#F8FAFC]/80 transition-colors"
                  >
                    {/* No */}
                    <td className="py-4 px-3 text-center font-bold text-[#0F1B33] border-r border-[#E2E8F0]">
                      {item.no || index + 1}
                    </td>

                    {/* Mata Kuliah + Info Singkat sesuai KPS (Kode, Semester, SKS) */}
                    <td className="py-4 px-4 sm:px-6 text-left border-r border-[#E2E8F0]">
                      <div className="flex items-center gap-1.5 font-bold text-[#0A2352] text-[14px] leading-snug">
                        <span>{item.name}</span>
                        <button
                          type="button"
                          onClick={() => setDetailCourse(item)}
                          className="text-[#2563EB] hover:text-[#1D4ED8] p-0.5 rounded-full hover:bg-blue-50 transition cursor-pointer"
                          title="Detail Mata Kuliah"
                          aria-label={`Detail ${item.name}`}
                        >
                          <Info size={15} strokeWidth={2.2} />
                        </button>
                      </div>
                      <div className="text-[12px] text-[#51607A] font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-[#0A2352]">{item.code}</span>
                        <span className="text-gray-300">•</span>
                        <span>Semester {item.semester}</span>
                        <span className="text-gray-300">•</span>
                        <span>{item.sks || 3} SKS</span>
                      </div>
                    </td>

                    {/* Rekapitulasi Kompetensi Dosen */}
                    <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                      {getScoreBadge(item.rekap?.dwi)}
                    </td>
                    <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                      {getScoreBadge(item.rekap?.swono)}
                    </td>
                    <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                      {getScoreBadge(item.rekap?.nadya)}
                    </td>
                    <td className="py-4 px-2.5 text-center border-r border-[#E2E8F0]">
                      {getScoreBadge(item.rekap?.sri)}
                    </td>

                    {/* Nilai Minimal */}
                    <td className="py-4 px-3 text-center font-semibold text-[#0F1B33] border-r border-[#E2E8F0]">
                      {item.nilaiMinimal?.koordinator ?? 6}
                    </td>
                    <td className="py-4 px-3 text-center font-semibold text-[#0F1B33] border-r border-[#E2E8F0]">
                      {item.nilaiMinimal?.pengajar ?? 4}
                    </td>

                    {/* Koordinator dan Pengajar */}
                    <td className="py-4 px-3 text-center font-medium text-[#0F1B33] border-r border-[#E2E8F0]">
                      {item.penugasan?.koordinator || '-'}
                    </td>
                    <td className="py-4 px-3 text-center font-medium text-[#0F1B33] border-r border-[#E2E8F0]">
                      {item.penugasan?.pengajar1 || '-'}
                    </td>
                    <td className="py-4 px-3 text-center font-medium text-[#0F1B33] border-r border-[#E2E8F0]">
                      {item.penugasan?.pengajar2 || '-'}
                    </td>
                    <td className="py-4 px-3 text-center font-medium text-[#0F1B33] border-r border-[#E2E8F0]">
                      {item.penugasan?.pengajar3 || '-'}
                    </td>
                    <td className="py-4 px-3 text-center font-medium text-[#0F1B33]">
                      {item.penugasan?.pengajar4 || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skala Kompetensi Legend (matching Figma footer) */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] sm:text-[13px] text-[#0F1B33]">
        <span className="font-bold text-[#0F1B33]">Skala 0–8:</span>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#16A34A]">6–8</span>
          <span className="text-[#334155] font-medium">Kompetensi kuat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#2563EB]">3–5</span>
          <span className="text-[#334155] font-medium">Cukup</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#B45309]">0–2</span>
          <span className="text-[#334155] font-medium">Perlu pengampu</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#64748B]">"-"</span>
          <span className="text-[#51607A] font-medium">
            = belum terkirim (belum menginput atau masih Draf)
          </span>
        </div>
      </div>

      {/* Detail Mata Kuliah Dialog Modal */}
      {detailCourse && (
        <CourseDetailDialog
          isOpen={Boolean(detailCourse)}
          course={detailCourse}
          onClose={() => setDetailCourse(null)}
        />
      )}
    </div>
  );
};

export default RekapTable;

