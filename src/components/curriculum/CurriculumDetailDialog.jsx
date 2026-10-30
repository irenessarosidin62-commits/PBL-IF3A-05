import React from 'react';
import { X, Pencil, Trash2, BookOpen } from 'lucide-react';

const CurriculumDetailDialog = ({
  isOpen,
  course,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A2352]/60 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-dialog-title"
    >
      <div className="w-full max-w-[560px] max-h-[92vh] flex flex-col bg-white rounded-[20px] shadow-2xl relative overflow-hidden border border-[#E2E8F0] animate-in zoom-in-95">
        {/* Header */}
        <div className="px-6 sm:px-7 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 id="detail-dialog-title" className="text-[19px] sm:text-[20px] font-bold text-[#0D2554] leading-tight">
                Detail Data Kurikulum
              </h2>
              <p className="text-xs text-[#51607A] mt-0.5">
                Mata kuliah {course.code} • {course.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Tutup dialog"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content Details Grid */}
        <div className="px-6 sm:px-7 py-5 overflow-y-auto space-y-4 text-ink flex-1">
          {/* Section 1: Informasi Pokok */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] p-4.5 space-y-2.5 text-[13px] sm:text-[14px]">
            <h4 className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-2">
              Informasi Mata Kuliah
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Kode</span>
              <span className="col-span-2 font-bold text-[#0F1B33]">{course.code}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Nama Mata Kuliah</span>
              <span className="col-span-2 font-semibold text-[#0F1B33]">{course.name}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Semester</span>
              <span className="col-span-2 font-bold text-[#0F1B33]">Semester {course.semester}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">SKS</span>
              <span className="col-span-2 font-bold text-[#0F1B33]">{course.sks} SKS</span>
            </div>

            {course.description && (
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-200/60">
                <span className="font-semibold text-[#51607A]">Deskripsi Singkat</span>
                <span className="col-span-2 text-[#0F1B33] leading-relaxed text-[13px]">
                  {course.description}
                </span>
              </div>
            )}
          </div>

          {/* Section 2: Rencana Sesi */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] p-4.5 space-y-2 text-[13px] sm:text-[14px]">
            <h4 className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-2">
              Rencana Sesi (Jumlah Pertemuan)
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                <p className="text-[11px] font-bold text-[#64748B] uppercase">Teori – Luring</p>
                <p className="font-bold text-[#0F1B33] text-[15px]">{course.teoriLuring ?? course.sesiTeori ?? 14} Sesi</p>
              </div>
              <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                <p className="text-[11px] font-bold text-[#64748B] uppercase">Teori – Daring</p>
                <p className="font-bold text-[#0F1B33] text-[15px]">{course.teoriDaring ?? 0} Sesi</p>
              </div>
              <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                <p className="text-[11px] font-bold text-[#64748B] uppercase">Praktik – Luring</p>
                <p className="font-bold text-[#0F1B33] text-[15px]">{course.praktikLuring ?? course.sesiPraktik ?? 14} Sesi</p>
              </div>
              <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                <p className="text-[11px] font-bold text-[#64748B] uppercase">Praktik – Daring</p>
                <p className="font-bold text-[#0F1B33] text-[15px]">{course.praktikDaring ?? 0} Sesi</p>
              </div>
            </div>
          </div>

          {/* Section 3: Peserta, Kelas & Peralatan */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] p-4.5 space-y-2.5 text-[13px] sm:text-[14px]">
            <h4 className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-2">
              Peserta, Kelas & Kebutuhan Peralatan
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Jumlah Peserta</span>
              <span className="col-span-2 font-bold text-[#0F1B33]">{course.peserta ?? 90} Mahasiswa</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Kelas Teori (Luring)</span>
              <span className="col-span-2 font-bold text-[#0F1B33]">{course.kelasTeoriLuring ?? 3} Kelas</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Kelas Praktik (Luring)</span>
              <span className="col-span-2 font-bold text-[#0F1B33]">{course.kelasPraktikLuring ?? 3} Kelas</span>
            </div>

            {course.peralatan && (
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-200/60">
                <span className="font-semibold text-[#51607A]">Daftar Peralatan</span>
                <span className="col-span-2 font-medium text-[#0F1B33] text-[13px]">
                  {course.peralatan}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 sm:px-7 py-4 border-t border-gray-100 flex items-center justify-between gap-3 shrink-0 bg-white">
          <button
            type="button"
            onClick={() => onDelete(course)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-[13px] font-bold text-red-600 hover:bg-red-50 rounded-[8px] transition-colors cursor-pointer"
          >
            <Trash2 size={15} />
            <span>Hapus Mata Kuliah</span>
          </button>

          <button
            type="button"
            onClick={() => onEdit(course)}
            className="flex items-center gap-1.5 px-5 py-2 text-xs sm:text-[13px] font-bold text-white bg-[#0045C7] hover:bg-[#0038A8] rounded-[8px] transition-colors shadow-xs cursor-pointer"
          >
            <Pencil size={14} />
            <span>Ubah Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurriculumDetailDialog;
