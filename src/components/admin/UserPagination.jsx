import React from 'react';
import { PAGE_SIZE } from '../../constants/userConstants';

const UserPagination = ({ currentPage, totalPages, totalItems, onPageChange }) => {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);

  // Helper to generate pagination numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      {/* Left count text */}
      <p className="text-[14px] text-ink font-medium">
        Menampilkan {startItem}–{endItem} dari {totalItems} pengguna
      </p>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Sebelumnya */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`h-[38px] px-3.5 rounded-[8px] border text-[13px] font-semibold transition-colors cursor-pointer ${
            currentPage === 1
              ? 'border-line/60 text-slate/40 cursor-not-allowed bg-transparent'
              : 'border-line bg-white text-ink hover:bg-slate/5 focus:outline-none focus:ring-2 focus:ring-royal-blue'
          }`}
        >
          Sebelumnya
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1.5">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-[38px] h-[38px] flex items-center justify-center text-slate text-[14px] select-none"
                >
                  ...
                </span>
              );
            }

            const isActive = currentPage === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-[38px] h-[38px] rounded-[8px] text-[14px] font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-white border border-line text-ink hover:bg-slate/5 focus:outline-none focus:ring-2 focus:ring-royal-blue'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Berikutnya */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`h-[38px] px-3.5 rounded-[8px] border text-[13px] font-semibold transition-colors cursor-pointer ${
            currentPage >= totalPages
              ? 'border-line/60 text-slate/40 cursor-not-allowed bg-transparent'
              : 'border-line bg-white text-ink hover:bg-slate/5 focus:outline-none focus:ring-2 focus:ring-royal-blue'
          }`}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default UserPagination;
