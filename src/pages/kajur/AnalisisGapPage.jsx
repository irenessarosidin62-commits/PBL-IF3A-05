import React, { useState } from 'react';
import KajurNavbar from '../../components/kajur/KajurNavbar';
import KajurSidebar from '../../components/kajur/KajurSidebar';
import GapSummaryCards from '../../components/kajur/GapSummaryCards';
import GapCourseTable from '../../components/kajur/GapCourseTable';
import Toast from '../../components/common/Toast';

const AnalisisGapPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('gap');
  const [toast, setToast] = useState({ show: false, message: '', isError: false });

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
  };

  return (
    <div className="min-h-screen bg-[#F3F6FB] flex flex-col font-sans">
      {/* Toast Alert Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.isError ? 'error' : 'success'}
          onClose={() => setToast({ show: false, message: '', isError: false })}
        />
      )}

      {/* Top Navbar */}
      <KajurNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Main Container: Sidebar + Page Content */}
      <div className="flex-1 flex w-full relative">
        {/* Sidebar Component */}
        <KajurSidebar
          isOpen={isSidebarOpen}
          activeMenu={activeMenu}
          onSelectMenu={(menuId) => setActiveMenu(menuId)}
        />

        {/* Main Content Area: Smooth proportional expansion when sidebar collapses */}
        <main className="flex-1 min-w-0 transition-all duration-300 ease-in-out pl-4 pr-6 sm:pl-6 sm:pr-10 lg:pl-8 lg:pr-12 py-6 sm:py-8 w-full">
          <div className="w-full">
            {/* Page Heading */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-[27px] font-bold text-[#0A2352] tracking-tight leading-tight">
                Analisis Gap Sumber Daya
              </h2>
            </div>

            <div className="space-y-6">
              {/* 1. Sumber Data Analisis & Ringkasan Kebutuhan Sumber Daya */}
              <GapSummaryCards />

              {/* 2. Rincian per Mata Kuliah Table */}
              <GapCourseTable onExportSuccess={showToast} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalisisGapPage;
