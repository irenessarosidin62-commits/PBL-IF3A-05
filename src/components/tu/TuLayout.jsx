import React, { useState } from 'react';
import TuNavbar from './TuNavbar';
import TuSidebar from './TuSidebar';

const TuLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-ice flex flex-col font-sans selection:bg-amber selection:text-amber-ink">
      <TuNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex-1 flex flex-col relative">
        <TuSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main
          className={`flex-1 min-w-0 px-4 sm:px-8 py-8 transition-[padding] duration-300 ease-in-out ${
            isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
          }`}
        >
          <div className="max-w-[1140px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TuLayout;
