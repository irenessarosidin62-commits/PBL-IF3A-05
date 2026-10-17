import React from 'react';
import { Pen, Trash2, Loader2, UserX } from 'lucide-react';
import { USER_STATUS } from '../../constants/userConstants';

const UserTable = ({
  users,
  isLoading,
  onEdit,
  onDelete,
  onResetFilters
}) => {
  // Only show full placeholder loader on initial empty load
  if (isLoading && (!users || users.length === 0)) {
    return (
      <div className="bg-white border border-line rounded-[14px] p-12 flex flex-col items-center justify-center text-slate min-h-[360px]">
        <Loader2 size={32} className="animate-spin text-royal-blue mb-3" />
        <p className="text-[14px] font-medium">Memuat data pengguna...</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="bg-white border border-line rounded-[14px] p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="w-12 h-12 rounded-full bg-slate/10 flex items-center justify-center text-slate mb-3.5">
          <UserX size={24} />
        </div>
        <p className="text-[15px] font-semibold text-ink mb-1">
          Pengguna tidak ditemukan.
        </p>
        <p className="text-[13px] text-slate mb-4">
          Ubah kata kunci atau saringan peran.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-[13px] font-bold text-royal-blue hover:underline cursor-pointer"
        >
          Hapus saringan
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-line rounded-[14px] overflow-hidden relative transition-opacity duration-150 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-line bg-white">
              <th scope="col" className="py-4 px-6 text-[13px] font-bold text-slate whitespace-nowrap">
                Nama lengkap
              </th>
              <th scope="col" className="py-4 px-6 text-[13px] font-bold text-slate whitespace-nowrap">
                Nama pengguna
              </th>
              <th scope="col" className="py-4 px-6 text-[13px] font-bold text-slate whitespace-nowrap">
                Surel
              </th>
              <th scope="col" className="py-4 px-6 text-[13px] font-bold text-slate whitespace-nowrap text-center">
                Peran
              </th>
              <th scope="col" className="py-4 px-6 text-[13px] font-bold text-slate whitespace-nowrap text-center">
                Status akun
              </th>
              <th scope="col" className="py-4 px-6 text-[13px] font-bold text-slate whitespace-nowrap text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((row) => (
              <tr
                key={row.id}
                className="border-b border-line last:border-b-0 hover:bg-slate/5 transition-colors"
              >
                {/* Nama lengkap + NIP/NIK */}
                <td className="py-4 px-6">
                  <div className="text-[14px] font-semibold text-ink leading-tight">
                    {row.name}
                  </div>
                  <div className="text-[12px] text-slate font-medium mt-0.5">
                    {row.nipNik}
                  </div>
                </td>

                {/* Nama pengguna */}
                <td className="py-4 px-6 text-[14px] text-ink font-medium">
                  {row.username}
                </td>

                {/* Surel */}
                <td className="py-4 px-6 text-[14px] text-ink">
                  <a
                    href={`mailto:${row.email}`}
                    className="hover:text-royal-blue underline decoration-slate/30 underline-offset-2 transition-colors"
                  >
                    {row.email}
                  </a>
                </td>

                {/* Peran */}
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex px-3 py-1 bg-tint text-royal-blue text-[13px] font-semibold rounded-full">
                    {row.role}
                  </span>
                </td>

                {/* Status akun */}
                <td className="py-4 px-6 text-center">
                  {row.status === USER_STATUS.ACTIVE ? (
                    <span className="inline-flex px-3 py-1 bg-success-bg text-success-text text-[13px] font-semibold rounded-full">
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex px-3 py-1 bg-disabled-bg text-slate text-[13px] font-semibold rounded-full">
                      Nonaktif
                    </span>
                  )}
                </td>

                {/* Aksi */}
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="h-[32px] px-3 border border-line rounded-[8px] bg-white text-navy text-[13px] font-semibold hover:bg-slate/5 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
                    >
                      <Pen size={14} />
                      <span>Ubah</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="h-[32px] px-3 border border-danger rounded-[8px] bg-white text-danger text-[13px] font-semibold hover:bg-danger/5 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-danger cursor-pointer"
                    >
                      <Trash2 size={14} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
