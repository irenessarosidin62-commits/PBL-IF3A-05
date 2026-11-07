import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';

const INITIAL_GAP_COURSES = [
  {
    id: 1,
    no: 1,
    code: 'IF318',
    mataKuliah: 'Statistika',
    semester: 3,
    sks: 2,
    dosenKompeten: 2,
    kebutuhanRuang: 'Laboratorium',
    ruangTersedia: 6,
    status: 'Cukup'
  },
  {
    id: 2,
    no: 2,
    code: 'IF315',
    mataKuliah: 'Rekayasa Perangkat Lunak Lanjut',
    semester: 3,
    sks: 3,
    dosenKompeten: 2,
    kebutuhanRuang: 'Laboratorium',
    ruangTersedia: 6,
    status: 'Cukup'
  },
  {
    id: 3,
    no: 3,
    code: 'PK31F',
    mataKuliah: 'Pendidikan Kewarganegaraan',
    semester: 3,
    sks: 2,
    dosenKompeten: 1,
    kebutuhanRuang: 'Ruang Kelas',
    ruangTersedia: 7,
    status: 'Cukup'
  },
  {
    id: 4,
    no: 4,
    code: 'IF317',
    mataKuliah: 'Interaksi Manusia Komputer',
    semester: 3,
    sks: 4,
    dosenKompeten: 1,
    kebutuhanRuang: 'Laboratorium',
    ruangTersedia: 6,
    status: 'Cukup'
  },
  {
    id: 5,
    no: 5,
    code: 'IF314',
    mataKuliah: 'Proyek Inovasi Agile',
    semester: 3,
    sks: 6,
    dosenKompeten: 0,
    kebutuhanRuang: 'Laboratorium',
    ruangTersedia: 6,
    status: 'Kurang'
  },
  {
    id: 6,
    no: 6,
    code: 'IF316',
    mataKuliah: 'Mata Kuliah Pilihan WEB',
    semester: 3,
    sks: 2,
    dosenKompeten: 0,
    kebutuhanRuang: 'Ruang Kelas',
    ruangTersedia: 8,
    status: 'Kurang'
  }
];

const GapCourseTable = ({ onExportSuccess }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered course items based on search input (name or code)
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return INITIAL_GAP_COURSES;
    const query = searchQuery.trim().toLowerCase();
    return INITIAL_GAP_COURSES.filter(
      (item) =>
        item.mataKuliah.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Export to Excel function using xlsx
  const handleExportExcel = () => {
    try {
      const dataToExport = filteredCourses.map((c, idx) => ({
        'No.': idx + 1,
        'Kode': c.code,
        'Mata Kuliah': c.mataKuliah,
        'Semester': c.semester,
        'SKS': c.sks,
        'Dosen Kompeten': `${c.dosenKompeten} Dosen`,
        'Kebutuhan Ruang': c.kebutuhanRuang,
        'Ruang Tersedia': c.ruangTersedia,
        'Status': c.status
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      // Auto-fit column widths
      worksheet['!cols'] = [
        { wch: 6 },
        { wch: 12 },
        { wch: 35 },
        { wch: 12 },
        { wch: 10 },
        { wch: 18 },
        { wch: 20 },
        { wch: 16 },
        { wch: 14 }
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Rincian Gap MK');

      XLSX.writeFile(workbook, 'Analisis_Gap_Sumber_Daya.xlsx');

      if (onExportSuccess) {
        onExportSuccess('Data analisis gap berhasil diekspor ke Excel');
      }
    } catch {
      if (onExportSuccess) {
        onExportSuccess('Gagal mengekspor data ke Excel', true);
      }
    }
  };

  return (
    <div className="bg-white rounded-[16px] border border-[#D8E0EE] p-5 sm:p-6 shadow-[0_2px_12px_rgba(10,35,82,0.03)]">
      {/* Card Header Title */}
      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0A2352] mb-4">
        Rincian per Mata Kuliah
      </h3>

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
        <input
          type="text"
          placeholder="Cari nama mata kuliah atau kode MK"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:flex-1 h-[42px] bg-white border border-[#CBD5E1] rounded-[9px] px-4 text-[14px] text-[#0F1B33] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8] transition"
        />

        <button
          type="button"
          onClick={handleExportExcel}
          className="w-full sm:w-auto h-[42px] px-6 bg-[#FFB020] hover:bg-[#EAA11A] text-[#0A2352] font-bold text-[13.5px] rounded-[9px] transition-colors shadow-xs shrink-0 cursor-pointer text-center"
        >
          Export Excel
        </button>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto border border-[#E2E8F0] rounded-[10px]">
        <table className="w-full text-left border-collapse text-[13.5px]">
          <thead>
            <tr className="bg-[#F8FAFC] text-[#0A2352] font-bold border-b border-[#E2E8F0]">
              <th className="py-3.5 px-3 text-center border-r border-[#E2E8F0] w-14 font-bold text-[13px]">
                No.
              </th>
              <th className="py-3.5 px-4 text-left border-r border-[#E2E8F0] font-bold text-[13px] min-w-[240px]">
                Mata Kuliah
              </th>
              <th className="py-3.5 px-4 text-center border-r border-[#E2E8F0] font-bold text-[13px] min-w-[140px]">
                Dosen Kompeten
              </th>
              <th className="py-3.5 px-4 text-center border-r border-[#E2E8F0] font-bold text-[13px] min-w-[150px]">
                Kebutuhan Ruang
              </th>
              <th className="py-3.5 px-4 text-center border-r border-[#E2E8F0] font-bold text-[13px] min-w-[130px]">
                Ruang Tersedia
              </th>
              <th className="py-3.5 px-4 text-center font-bold text-[13px] min-w-[120px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] bg-white text-[#1E293B]">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((item, index) => {
                const isZeroDosen = item.dosenKompeten === 0;
                const isKurang = item.status === 'Kurang';

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#F8FAFC]/80 transition-colors"
                  >
                    {/* No. */}
                    <td className="py-3.5 px-3 text-center border-r border-[#E2E8F0] text-gray-600 font-medium">
                      {index + 1}
                    </td>

                    {/* Mata Kuliah + Info Singkat sesuai KPS (Kode, Semester, SKS) */}
                    <td className="py-3.5 px-4 border-r border-[#E2E8F0] text-left">
                      <div className="font-bold text-[#0A2352] text-[14px] leading-snug">
                        {item.mataKuliah}
                      </div>
                      <div className="text-[12px] text-[#51607A] font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-[#0A2352]">{item.code}</span>
                        <span className="text-gray-300">•</span>
                        <span>Semester {item.semester}</span>
                        <span className="text-gray-300">•</span>
                        <span>{item.sks} SKS</span>
                      </div>
                    </td>

                    {/* Dosen Kompeten */}
                    <td className="py-3.5 px-4 text-center border-r border-[#E2E8F0]">
                      <span
                        className={
                          isZeroDosen
                            ? 'text-[#DC2626] font-bold'
                            : 'text-gray-700 font-medium'
                        }
                      >
                        {item.dosenKompeten} Dosen
                      </span>
                    </td>

                    {/* Kebutuhan Ruang */}
                    <td className="py-3.5 px-4 text-center border-r border-[#E2E8F0] text-gray-700 font-medium">
                      {item.kebutuhanRuang}
                    </td>

                    {/* Ruang Tersedia */}
                    <td className="py-3.5 px-4 text-center border-r border-[#E2E8F0] text-gray-700 font-medium">
                      {item.ruangTersedia}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          isKurang
                            ? 'bg-[#FEE2E2] text-[#DC2626]'
                            : 'bg-[#DCFCE7] text-[#15803D]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 px-4 text-center text-gray-400 font-medium text-sm"
                >
                  Mata kuliah tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GapCourseTable;
