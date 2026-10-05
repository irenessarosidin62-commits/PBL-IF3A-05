import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-surface border-b border-gray-200 py-4 px-8 flex justify-between items-center z-10 relative">
      <div className="flex items-center gap-4">
        {/* Logo Placeholder */}
        <div className="w-12 h-12 bg-secondary text-white font-bold flex items-center justify-center rounded text-xs">
          LOGO
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary leading-tight">SIAP-PBM</h1>
          <p className="text-sm text-secondary">Politeknik Negeri Batam</p>
        </div>
      </div>
      
      {/* SSO Badge */}
      <div className="flex items-center gap-2 bg-surface-blue px-4 py-1.5 rounded-full border border-accent">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <span className="text-xs font-semibold text-primary">SSO Hub Active</span>
      </div>
    </header>
  );
};

export default Header;
