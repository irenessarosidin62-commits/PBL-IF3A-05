import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LaboranNavbar from './LaboranNavbar';
import LaboranSidebar from './LaboranSidebar';

const LaboranLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-ice flex flex-col font-sans selection:bg-amber selection:text-amber-ink">
      <LaboranNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex-1 flex flex-col relative">
        <LaboranSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main
          className={`flex-1 min-w-0 px-4 sm:px-8 py-8 transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
          }`}
        >
          <div key={location.pathname} className="max-w-[1140px] mx-auto animate-page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LaboranLayout;
