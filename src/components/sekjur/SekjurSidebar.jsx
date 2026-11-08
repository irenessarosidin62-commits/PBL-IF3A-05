import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Circle } from 'lucide-react';

const MENU_ITEMS = [
  {
    id: 'gap',
    label: 'Analisis Gap',
    icon: BarChart3,
    path: '/sekjur/analisis-gap'
  },
  {
    id: 'ibppr',
    label: 'Distribusi IBPPR',
    icon: Circle,
    path: '/sekjur/distribusi-ibppr'
  }
];

const SekjurSidebar = ({ isOpen = true, activeMenu = 'gap', onSelectMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (item) => {
    if (onSelectMenu) {
      onSelectMenu(item.id);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  const getIsActive = (itemId) => {
    if (activeMenu === itemId) return true;

    if (
      itemId === 'gap' &&
      (location.pathname === '/sekjur' ||
        location.pathname.includes('/analisis-gap') ||
        location.pathname === '/sekjur/analisis-gap')
    ) {
      return true;
    }
    if (itemId === 'ibppr' && location.pathname.includes('/distribusi-ibppr')) {
      return true;
    }
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden transition-opacity duration-300"
          onClick={() => onSelectMenu && onSelectMenu(activeMenu, true)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`bg-[#0A2352] text-white shrink-0 border-r border-[#071A3D] z-30 font-sans transition-[width,transform,opacity] duration-300 ease-in-out select-none ${
          'fixed md:sticky top-[72px] h-[calc(100vh-72px)]'
        } ${
          isOpen
            ? 'w-[240px] translate-x-0 opacity-100'
            : 'w-0 -translate-x-full md:translate-x-0 md:w-0 overflow-hidden opacity-0 pointer-events-none border-r-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="w-[240px] h-full flex flex-col justify-between overflow-y-auto">
          {/* Navigation Menu List */}
          <div className="p-4 space-y-2">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = getIsActive(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-[12px] text-[14px] transition-all text-left cursor-pointer ${
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
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Footer in sidebar pinned at bottom */}
          <div className="p-4 text-[11px] text-white/40 text-center border-t border-white/5">
            <span>SIAP-PBM v1.0 • Sekjur</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SekjurSidebar;

