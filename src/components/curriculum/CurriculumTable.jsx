import React from 'react';
import { Pencil, Trash2, BookOpen } from 'lucide-react';

const CurriculumTable = ({ courses = [], onEdit, onDelete, isLoading = false }) => {
  return (
    <div className="w-full bg-white rounded-[14px] border border-line overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="bg-[#F0F5FF] border-b border-line text-ink">
              <th className="py-3.5 px-6 text-[14px] font-bold tracking-tight w-28">
                Kode
              </th>
              <th className="py-3.5 px-6 text-[14px] font-bold tracking-tight">
                Mata Kuliah
              </th>
              <th className="py-3.5 px-6 text-[14px] font-bold tracking-tight text-center w-28">
                Semester
              </th>
              <th className="py-3.5 px-6 text-[14px] font-bold tracking-tight text-center w-24">
                SKS
              </th>
              <th className="py-3.5 px-6 text-[14px] font-bold tracking-tight text-center w-44">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate text-[14px]">
                  Memuat data kurikulum...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <BookOpen size={32} className="text-slate/40" />
                    <p className="text-[14px] font-medium text-slate">
                      Tidak ada mata kuliah yang cocok dengan filter atau pencarian.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course.id || course.code}
                  className="hover:bg-[#F9FBFF] transition-colors"
                >
                  {/* Kode */}
                  <td className="py-4 px-6 text-[14px] font-bold text-navy whitespace-nowrap">
                    {course.code}
                  </td>

                  {/* Mata Kuliah */}
                  <td className="py-4 px-6 text-[14px] font-semibold text-ink">
                    {course.name}
                  </td>

                  {/* Semester */}
                  <td className="py-4 px-6 text-[14px] text-center font-medium text-slate">
                    {course.semester}
                  </td>

                  {/* SKS */}
                  <td className="py-4 px-6 text-[14px] text-center font-medium text-slate">
                    {course.sks}
                  </td>

                  {/* Aksi */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(course)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EFF4FE] hover:bg-[#E0EBFE] text-royal-blue text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue/30"
                        title="Ubah mata kuliah"
                      >
                        <Pencil size={14} />
                        <span>Ubah</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(course)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FEE4E2] hover:bg-[#FECDCA] text-danger text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-danger/30"
                        title="Hapus mata kuliah"
                      >
                        <Trash2 size={14} />
                        <span>Hapus</span>
                      </button>
                    </div>
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
