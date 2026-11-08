import React, { useEffect, useRef } from 'react';
import { X, BookOpen, CheckCircle2, Clock } from 'lucide-react';

const CourseDetailDialog = ({
  isOpen,
  course,
  onClose
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const courseName = course.name || course.mataKuliah || 'Mata Kuliah';
  const courseCode = course.code || 'IF318';
  const semester = course.semester || 1;
  const sks = course.sks || 3;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A2352]/60 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-dialog-title"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[560px] max-h-[90vh] flex flex-col bg-white rounded-[18px] shadow-2xl relative overflow-hidden border border-[#D8E0EE] animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#1B4FD8] shrink-0">
              <BookOpen size={18} />
            </div>
            <div>
              <h3 id="detail-dialog-title" className="text-[17px] sm:text-[18px] font-bold text-[#0A2352] leading-tight">
                Detail Data Kurikulum
              </h3>
              <p className="text-[12px] text-[#51607A] mt-0.5">
                {courseCode} • {courseName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Tutup dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Details Grid */}
        <div className="px-5 sm:px-6 py-4.5 overflow-y-auto space-y-3.5 flex-1">
          {/* Section 1: Informasi Pokok */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 space-y-2 text-[13px] sm:text-[13.5px]">
            <h4 className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1.5">
              Informasi Mata Kuliah
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Kode MK</span>
              <span className="col-span-2 font-bold text-[#0A2352]">{courseCode}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Nama Mata Kuliah</span>
              <span className="col-span-2 font-semibold text-[#0F1B33]">{courseName}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Semester</span>
              <span className="col-span-2 font-bold text-[#0F1B33]">Semester {semester}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Bobot SKS</span>
              <span className="col-span-2 font-bold text-[#0F1B33]">{sks} SKS</span>
            </div>

            {course.status && (
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-[#51607A]">Status Analisis</span>
                <span className="col-span-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      course.status === 'Kurang'
                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                        : 'bg-[#DCFCE7] text-[#15803D]'
                    }`}
                  >
                    {course.status}
                  </span>
                </span>
              </div>
            )}

            {course.description && (
              <div className="grid grid-cols-3 gap-2 pt-1.5 border-t border-gray-200/70">
                <span className="font-semibold text-[#51607A]">Deskripsi</span>
                <span className="col-span-2 text-[#0F1B33] leading-relaxed text-[12.5px]">
                  {course.description}
                </span>
              </div>
            )}
          </div>

          {/* Section 2: Rencana Sesi (Sesuai KPS) */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 space-y-2 text-[13px]">
            <h4 className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1.5">
              Rencana Sesi (Jumlah Pertemuan)
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                <p className="text-[10.5px] font-bold text-[#64748B] uppercase">Teori – Luring</p>
                <p className="font-bold text-[#0F1B33] text-[14px]">
                  {course.sesiTeori ?? 14} Sesi
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                <p className="text-[10.5px] font-bold text-[#64748B] uppercase">Teori – Daring</p>
                <p className="font-bold text-[#0F1B33] text-[14px]">
                  {course.teoriDaring ?? 0} Sesi
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                <p className="text-[10.5px] font-bold text-[#64748B] uppercase">Praktik – Luring</p>
                <p className="font-bold text-[#0F1B33] text-[14px]">
                  {course.sesiPraktik ?? 14} Sesi
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                <p className="text-[10.5px] font-bold text-[#64748B] uppercase">Praktik – Daring</p>
                <p className="font-bold text-[#0F1B33] text-[14px]">
                  {course.praktikDaring ?? 0} Sesi
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Peserta & Kebutuhan Ruang */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 space-y-2 text-[13px] sm:text-[13.5px]">
            <h4 className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1.5">
              Peserta & Sarana Prasarana
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-[#51607A]">Estimasi Peserta</span>
              <span className="col-span-2 font-bold text-[#0F1B33]">
                {course.peserta ?? 90} Mahasiswa
              </span>
            </div>

            {course.kebutuhanRuang && (
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-[#51607A]">Kebutuhan Ruang</span>
                <span className="col-span-2 font-bold text-[#0F1B33]">
                  {course.kebutuhanRuang}
                </span>
              </div>
            )}

            {course.ruangTersedia !== undefined && (
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-[#51607A]">Ruang Tersedia</span>
                <span className="col-span-2 font-bold text-[#0F1B33]">
                  {course.ruangTersedia} Ruang
                </span>
              </div>
            )}
          </div>

          {/* Section 4: Penugasan Dosen (jika ada pada data) */}
          {(course.koordinator || course.pengajar || course.penugasan) && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 space-y-2 text-[13px]">
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                  Penugasan Dosen
                </h4>
                {course.approved !== undefined && (
                  course.approved ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#15803D]">
                      <CheckCircle2 size={12} />
                      Disetujui
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B45309]">
                      <Clock size={12} />
                      Belum Disetujui
                    </span>
                  )
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                  <span className="block text-[10.5px] font-bold text-[#64748B] uppercase">
                    Koordinator
                  </span>
                  <p className="text-[13px] font-bold text-[#0A2352] mt-0.5">
                    {course.koordinator || course.penugasan?.koordinator || '-'}
                  </p>
                </div>
                <div className="bg-white p-2.5 rounded-[8px] border border-gray-200">
                  <span className="block text-[10.5px] font-bold text-[#64748B] uppercase">
                    Pengajar
                  </span>
                  <p className="text-[13px] font-bold text-[#0A2352] mt-0.5">
                    {course.pengajar || course.penugasan?.pengajar1 || '-'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3 border-t border-[#E2E8F0] flex justify-end bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] px-5 bg-[#0A2352] hover:bg-[#071A3D] text-white rounded-[8px] text-[13px] font-bold transition-all shadow-xs cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailDialog;
