import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import TuLayout from '../../components/tu/TuLayout';
import DeleteFormDialog from '../../components/tu/DeleteFormDialog';
import Toast from '../../components/common/Toast';
import { fetchForms, deleteForm, publishForm } from '../../services/competencyService';
import { FORM_STATUS } from '../../constants/competencyConstants';

const CompetencyFormPage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog & Toast states
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchForms();
      setForms(data);
    } catch {
      showToast('Gagal memuat formulir kompetensi.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteForm(deleteTarget.id);
      showToast('Formulir berhasil dihapus.');
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      showToast(err.message || 'Gagal menghapus formulir.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePublish = async (form) => {
    try {
      await publishForm(form.id);
      showToast(`Formulir periode ${form.academicYear} berhasil dipublikasikan ke Dosen.`);
      loadData();
    } catch (err) {
      showToast(err.message || 'Gagal mempublikasikan formulir.', 'error');
    }
  };

  const handleViewRecap = (form) => {
    navigate('/tu/rekap', {
      state: {
        academicYear: form.academicYear,
        semester: form.semester,
        curriculum: form.curriculum
      }
    });
  };

  return (
    <TuLayout>
      {/* Title & Action Button Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[26px] sm:text-[28px] font-bold text-navy leading-tight">
            Formulir Kompetensi
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate mt-1 font-normal">
            Kelola form matriks kompetensi dosen wali dan dosen pengajar, lalu publikasikan ke Dosen.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/tu/buat')}
          className="h-[44px] px-5 bg-royal-blue hover:bg-[#153eb5] text-white font-bold text-[14px] rounded-[10px] transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs focus:outline-none focus:ring-2 focus:ring-royal-blue"
        >
          + Buat Form
        </button>
      </div>

      {/* Table Card */}
      <div className={`bg-white rounded-[14px] border border-line overflow-hidden shadow-2xs transition-opacity duration-150 ${isLoading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-line bg-white text-slate">
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                  Tahun akademik
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                  Semester
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                  Kurikulum
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold whitespace-nowrap">
                  Mata kuliah
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                  Status
                </th>
                <th scope="col" className="py-3.5 px-6 text-[13px] font-bold text-center whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {forms.map((row) => {
                const isDraft = row.status === FORM_STATUS.DRAFT;

                return (
                  <tr key={row.id} className="hover:bg-slate/5 transition-colors">
                    {/* Tahun akademik */}
                    <td className="py-4 px-6 text-[14px] font-semibold text-ink">
                      {row.academicYear}
                    </td>

                    {/* Semester */}
                    <td className="py-4 px-6 text-[14px] text-slate font-medium">
                      {row.semester}
                    </td>

                    {/* Kurikulum */}
                    <td className="py-4 px-6 text-[14px] text-slate font-medium">
                      {row.curriculum}
                    </td>

                    {/* Mata kuliah */}
                    <td className="py-4 px-6 text-[14px] text-slate font-medium">
                      {row.courseCount} mata kuliah
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center">
                      {isDraft ? (
                        <span className="inline-flex px-3 py-1 bg-disabled-bg text-slate text-[12px] font-semibold rounded-full">
                          Draf
                        </span>
                      ) : (
                        <span className="inline-flex px-3 py-1 bg-success-bg text-success-text text-[12px] font-semibold rounded-full">
                          Dipublikasikan
                        </span>
                      )}
                    </td>

                    {/* Aksi */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Tombol Ubah */}
                        <button
                          type="button"
                          disabled={!isDraft}
                          onClick={() => navigate('/tu/buat', { state: { editForm: row } })}
                          className={`h-[32px] px-3 border border-line rounded-[8px] bg-white text-[13px] font-semibold transition-colors inline-flex items-center gap-1.5 ${
                            isDraft
                              ? 'text-navy hover:bg-slate/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue'
                              : 'opacity-40 cursor-not-allowed text-slate'
                          }`}
                          title={isDraft ? 'Ubah formulir' : 'Formulir sudah dipublikasikan'}
                        >
                          <Pencil size={13} />
                          <span>Ubah</span>
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          type="button"
                          disabled={!isDraft}
                          onClick={() => setDeleteTarget(row)}
                          className={`h-[32px] px-3 border border-line rounded-[8px] bg-white text-[13px] font-semibold transition-colors inline-flex items-center gap-1.5 ${
                            isDraft
                              ? 'text-danger hover:bg-danger/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-danger'
                              : 'opacity-40 cursor-not-allowed text-danger/50'
                          }`}
                          title={isDraft ? 'Hapus formulir' : 'Formulir sudah dipublikasikan'}
                        >
                          <Trash2 size={13} />
                          <span>Hapus</span>
                        </button>

                        {/* Tombol Publikasikan ke Dosen (Draf) / Lihat rekap (Dipublikasikan) */}
                        {isDraft ? (
                          <button
                            type="button"
                            onClick={() => handlePublish(row)}
                            className="h-[32px] px-3.5 border border-line rounded-[8px] bg-white hover:bg-slate/5 text-navy hover:text-royal-blue text-[13px] font-semibold transition-colors inline-flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue"
                          >
                            Publikasikan ke Dosen
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleViewRecap(row)}
                            className="h-[32px] px-3.5 border border-line rounded-[8px] bg-white hover:bg-slate/5 text-navy hover:text-royal-blue text-[13px] font-semibold transition-colors inline-flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue"
                          >
                            Lihat rekap
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note below table */}
      <p className="text-[13px] text-slate mt-4 font-normal">
        Ubah dan Hapus hanya tersedia saat status Draf. Hapus meminta konfirmasi lebih dulu.
      </p>

      {/* Delete Confirmation Dialog */}
      <DeleteFormDialog
        isOpen={Boolean(deleteTarget)}
        form={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </TuLayout>
  );
};

export default CompetencyFormPage;
