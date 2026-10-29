import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, BarChart2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TuSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isFormActive = location.pathname === '/tu' || location.pathname.startsWith('/tu/buat') || location.pathname.startsWith('/tu/formulir');
  const isRecapActive = location.pathname.startsWith('/tu/rekap');

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-deep/60 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-[74px] bottom-0 left-0 w-64 bg-navy z-30 flex flex-col justify-between p-4 border-r border-navy-deep transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Menu Items */}
        <div>
          <div className="px-3 mb-2.5">
            <p className="text-[11px] font-bold text-white/60 tracking-wider">
              MENU UTAMA
            </p>
          </div>

          <nav className="space-y-1.5" aria-label="Menu Utama TU">
            <button
              type="button"
              onClick={() => {
                navigate('/tu');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-[10px] text-[14px] transition-colors cursor-pointer text-left ${
                isFormActive
                  ? 'bg-amber text-amber-ink font-bold shadow-xs'
                  : 'text-white/80 hover:bg-white/10 hover:text-white font-semibold'
              }`}
            >
              <FileText size={18} />
              <span>Formulir Kompetensi</span>
            </button>

            <button
              type="button"
              onClick={() => {
                navigate('/tu/rekap');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-[10px] text-[14px] transition-colors cursor-pointer text-left ${
                isRecapActive
                  ? 'bg-amber text-amber-ink font-bold shadow-xs'
                  : 'text-white/80 hover:bg-white/10 hover:text-white font-semibold'
              }`}
            >
              <BarChart2 size={18} />
              <span>Rekap Kompetensi</span>
            </button>
          </nav>
        </div>

        {/* Bottom: User Info & Keluar button */}
        <div className="pt-4 border-t border-white/15">
          <div className="px-1 mb-3">
            <h4 className="text-[14px] font-bold text-white leading-tight">
              TU (Tata Usaha)
            </h4>
            <p className="text-[12px] text-white/70 font-medium mt-0.5">
              Jurusan Teknik Informatika
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full h-[40px] bg-white hover:bg-white/90 text-danger font-bold text-[14px] rounded-[10px] transition-colors flex items-center justify-center cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-danger"
          >
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
};

export default TuSidebar;
