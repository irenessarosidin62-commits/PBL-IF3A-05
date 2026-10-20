import React from 'react';
import { Pencil, Trash2, Loader2, UserX } from 'lucide-react';
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
    <div className={`w-full bg-white rounded-[14px] border border-line overflow-hidden shadow-2xs relative transition-opacity duration-150 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-[#F0F5FF] border-b border-line text-ink">
              <th scope="col" className="py-3.5 px-6 text-[14px] font-bold text-ink tracking-tight whitespace-nowrap">
                Nama lengkap
              </th>
              <th scope="col" className="py-3.5 px-6 text-[14px] font-bold text-ink tracking-tight whitespace-nowrap">
                Nama pengguna
              </th>
              <th scope="col" className="py-3.5 px-6 text-[14px] font-bold text-ink tracking-tight whitespace-nowrap">
                Surel
              </th>
              <th scope="col" className="py-3.5 px-6 text-[14px] font-bold text-ink tracking-tight text-center whitespace-nowrap">
                Peran
              </th>
              <th scope="col" className="py-3.5 px-6 text-[14px] font-bold text-ink tracking-tight text-center whitespace-nowrap">
                Status akun
              </th>
              <th scope="col" className="py-3.5 px-6 text-[14px] font-bold text-ink tracking-tight text-center whitespace-nowrap">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {users.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#F9FBFF] transition-colors"
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
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EFF4FE] hover:bg-[#E0EBFE] text-royal-blue text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue/30"
                      title="Ubah data pengguna"
                    >
                      <Pencil size={14} />
                      <span>Ubah</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FEE4E2] hover:bg-[#FECDCA] text-danger text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-danger/30"
                      title="Hapus data pengguna"
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
