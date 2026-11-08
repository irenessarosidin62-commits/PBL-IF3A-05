import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Info } from 'lucide-react';

const CurriculumTable = ({
  courses = [],
  onDetail,
  isLoading = false
}) => {
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const tableRef = useRef(null);

  // Close popover tooltip on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tableRef.current && !tableRef.current.contains(e.target)) {
        setActiveTooltipId(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveTooltipId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={tableRef}
      className="w-full bg-[#F4F7FC] rounded-[14px] border border-[#E2E8F0] overflow-visible shadow-2xs"
    >
      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-[#0F1B33]">
              <th className="py-3.5 px-4 text-[14px] font-bold tracking-tight text-center w-14">
                No
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight">
                Kode
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight min-w-[260px]">
                Mata kuliah
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight text-center">
                Semester
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight text-center">
                SKS
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight text-center">
                Sesi Teori
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight text-center">
                Sesi Praktik
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight text-center">
                Peserta
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight text-center w-28">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-[#51607A] text-[14px]">
                  Memuat data kurikulum...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-[#51607A]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <BookOpen size={32} className="text-[#51607A]/40" />
                    <p className="text-[14px] font-medium text-[#51607A]">
                      Tidak ada mata kuliah yang cocok dengan filter atau pencarian.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              courses.map((course, index) => {
                const isTooltipOpen = activeTooltipId === (course.id || course.code);

                return (
                  <tr
                    key={course.id || course.code}
                    className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-white/60 transition-colors"
                  >
                    {/* Nomor */}
                    <td className="py-3.5 px-4 text-[14px] text-center font-semibold text-[#51607A]">
                      {index + 1}
                    </td>

                    {/* Kode */}
                    <td className="py-3.5 px-5 text-[14px] font-medium text-[#0F1B33] whitespace-nowrap">
                      {course.code}
                    </td>

                    {/* Mata Kuliah + Deskripsi Singkat + (i) Tooltip */}
                    <td className="py-3.5 px-5 text-[14px] font-medium text-[#0F1B33] relative">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-[#0F1B33]">
                          {course.name}
                        </span>

                        {/* Info (i) Icon Button with Hover (Arahkan) Trigger */}
                        <div
                          className="relative inline-block"
                          onMouseEnter={() =>
                            setActiveTooltipId(course.id || course.code)
                          }
                          onMouseLeave={() => setActiveTooltipId(null)}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setActiveTooltipId(
                                isTooltipOpen ? null : (course.id || course.code)
                              )
                            }
                            className="inline-flex items-center justify-center text-[#1B4FD8] hover:text-[#0A2352] p-0.5 rounded-full hover:bg-blue-50 transition-colors cursor-pointer"
                            aria-label={`Deskripsi ${course.name}`}
                          >
                            <Info size={16} strokeWidth={2.2} />
                          </button>

                          {/* Tooltip Popover matching screenshot b15cc56f */}
                          {isTooltipOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 sm:w-80 bg-white border border-[#D8E0EE] rounded-[12px] p-3.5 shadow-xl z-50 animate-in fade-in zoom-in-95 text-left pointer-events-auto">
                              {/* Arrow Top */}
                              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-[#D8E0EE] rotate-45" />

                              <h4 className="font-bold text-[13px] text-[#0F1B33] relative z-10">
                                {course.name} ({course.code})
                              </h4>
                              <p className="text-[12px] text-[#51607A] leading-relaxed mt-1 relative z-10">
                                {course.description ||
                                  'Mata kuliah ini membahas capaian pembelajaran dan kompetensi inti program studi.'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Deskripsi Singkat Teks Langsung di Baris Tabel */}
                      {course.description && (
                        <p className="text-[12px] text-[#51607A] line-clamp-1 mt-0.5 leading-snug">
                          {course.description}
                        </p>
                      )}
                    </td>

                    {/* Semester */}
                    <td className="py-3.5 px-5 text-[14px] text-center font-bold text-[#0F1B33]">
                      {course.semester}
                    </td>

                    {/* SKS */}
                    <td className="py-3.5 px-5 text-[14px] text-center font-bold text-[#0F1B33]">
                      {course.sks}
                    </td>

                    {/* Sesi Teori */}
                    <td className="py-3.5 px-5 text-[14px] text-center font-bold text-[#0F1B33]">
                      {course.sesiTeori ?? 14}
                    </td>

                    {/* Sesi Praktik */}
                    <td className="py-3.5 px-5 text-[14px] text-center font-bold text-[#0F1B33]">
                      {course.sesiPraktik ?? 14}
                    </td>

                    {/* Peserta */}
                    <td className="py-3.5 px-5 text-[14px] text-center font-bold text-[#0F1B33]">
                      {course.peserta ?? 90}
                    </td>

                    {/* Aksi: Detail Button */}
                    <td className="py-3.5 px-5 text-center">
                      <button
                        type="button"
                        onClick={() => onDetail && onDetail(course)}
                        className="px-5 py-1 text-[13px] font-semibold text-[#1B4FD8] bg-[#EFF4FE] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-[8px] transition-colors cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
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

export default CurriculumTable;
