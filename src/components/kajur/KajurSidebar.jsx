import React from 'react';
import { Users, BarChart3, Award } from 'lucide-react';

const MENU_ITEMS = [
  {
    id: 'rekap',
    label: 'Rekap Kompetensi',
    icon: Users,
    active: true
  },
  {
    id: 'gap',
    label: 'Analisis Gap',
    icon: BarChart3,
    active: false
  },
  {
    id: 'rekomendasi',
    label: 'Rekomendasi Penugasan',
    icon: Award,
    active: false
  }
];

const KajurSidebar = ({ isOpen, activeMenu = 'rekap', onSelectMenu }) => {
  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity"
          onClick={() => onSelectMenu && onSelectMenu(activeMenu, true)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`bg-[#0A2352] text-white shrink-0 border-r border-[#071A3D] transition-all duration-300 ease-in-out z-30 font-sans ${
          isOpen
            ? 'w-[240px] translate-x-0'
            : '-translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden'
        } fixed lg:static top-[72px] bottom-0 left-0 h-[calc(100vh-72px)] flex flex-col justify-between shadow-lg lg:shadow-none`}
      >
        {/* Navigation Menu List */}
        <div className="p-4 space-y-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeMenu;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectMenu && onSelectMenu(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-[12px] text-[14px] font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#FFB020] text-[#0A2352] shadow-sm font-extrabold'
                    : 'text-white/80 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                <Icon
                  size={20}
                  className={`shrink-0 ${
                    isActive ? 'text-[#0A2352]' : 'text-white/80'
                  }`}
                  strokeWidth={isActive ? 2.4 : 2}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer/Brand note in sidebar if needed (profile is placed in Navbar top-right as instructed) */}
        <div className="p-4 text-[11px] text-white/40 text-center border-t border-white/5">
          <span>SIAP-PBM v1.0 • Kajur</span>
        </div>
      </aside>
    </>
  );
};

export default KajurSidebar;

