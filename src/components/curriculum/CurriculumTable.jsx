import React from 'react';
import { BookOpen } from 'lucide-react';

const CurriculumTable = ({ courses = [], onDetail, isLoading = false }) => {
  return (
    <div className="w-full bg-[#F4F7FC] rounded-[14px] border border-[#E2E8F0] overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-[#0F1B33]">
              <th className="py-3.5 px-4 text-[14px] font-bold tracking-tight text-center w-14">
                No
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight">
                Kode
              </th>
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight">
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
              <th className="py-3.5 px-5 text-[14px] font-bold tracking-tight text-center">
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
              courses.map((course, index) => (
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

                  {/* Mata Kuliah */}
                  <td className="py-3.5 px-5 text-[14px] font-medium text-[#0F1B33]">
                    {course.name}
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

                  {/* Aksi */}
                  <td className="py-3.5 px-5 text-center">
                    <button
                      type="button"
                      onClick={() => onDetail(course)}
                      className="px-5 py-1 text-[13px] font-semibold text-[#1B4FD8] bg-[#EFF4FE] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-[8px] transition-colors cursor-pointer"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurriculumTable;
