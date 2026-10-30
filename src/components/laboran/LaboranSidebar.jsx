import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, FileEdit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LaboranSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isSarprasActive =
    location.pathname === '/laboran' ||
    location.pathname.startsWith('/laboran/sarpras');
  const isCompetencyActive = location.pathname.startsWith('/laboran/kompetensi');

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[74px] bg-navy-deep/60 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-[74px] bottom-0 left-0 w-64 h-[calc(100vh-74px)] bg-navy z-40 flex flex-col justify-between p-4 border-r border-navy-deep overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Menu Items */}
        <div>
          <div className="px-3 mb-2.5">
            <p className="text-[11px] font-bold text-white/60 tracking-wider">
              MENU UTAMA
            </p>
          </div>

          <nav className="space-y-1.5" aria-label="Menu Utama Laboran">
            <button
              type="button"
              onClick={() => {
                navigate('/laboran/sarpras');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-[10px] text-[14px] transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer text-left ${
                isSarprasActive
                  ? 'bg-amber text-amber-ink font-bold shadow-xs'
                  : 'text-white/80 hover:bg-white/10 hover:text-white font-semibold'
              }`}
            >
              <Building2 size={18} />
              <span>Sarana dan Prasarana</span>
            </button>

            <button
              type="button"
              onClick={() => {
                navigate('/laboran/kompetensi');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-[10px] text-[14px] transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer text-left ${
                isCompetencyActive
                  ? 'bg-amber text-amber-ink font-bold shadow-xs'
                  : 'text-white/80 hover:bg-white/10 hover:text-white font-semibold'
              }`}
            >
              <FileEdit size={18} />
              <span>Formulir Kompetensi</span>
            </button>
          </nav>
        </div>

        {/* Bottom: User Info & Keluar button */}
        <div className="pt-4 border-t border-white/15">
          <div className="px-1 mb-3">
            <h4 className="text-[14px] font-bold text-white leading-tight">
              Laboran
            </h4>
            <p className="text-[12px] text-white/70 font-medium mt-0.5">
              Jurusan Teknik Informatika
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full h-[40px] bg-white hover:bg-white/90 active:scale-[0.98] text-danger font-bold text-[14px] rounded-[10px] transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-danger"
          >
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
};

export default LaboranSidebar;
