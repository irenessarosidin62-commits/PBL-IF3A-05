import React from 'react';
import InformationSection from '../components/auth/InformationSection';
import LoginForm from '../components/auth/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Login = () => {
  const { user } = useAuth();

  // If already logged in, redirect based on role
  if (user) {
    const routeMap = {
      'Admin(TU)': '/admin',
      'KPS': '/kps',
      'Laboran': '/laboran',
      'Sekjur': '/sekjur',
      'Kajur': '/kajur',
      'Dosen': '/dosen'
    };
    return <Navigate to={routeMap[user.role] || '/'} replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0E2857] text-white">
      <div
        aria-hidden="true"
        className="absolute -right-[145px] -top-[220px] h-[545px] w-[545px] rounded-full bg-[#1A3D83]"
      />

      <header className="relative z-10 mx-auto flex h-[76px] w-full max-w-[1124px] items-center justify-between px-6 sm:px-8 lg:px-8 xl:px-0">
        <div className="flex items-center gap-[14px]">
          <img src={logo} alt="SIAP-PBM" className="h-[52px] w-[52px] rounded-[13px] object-contain" />
          <div>
            <h1 className="text-[22px] font-bold leading-[26px] tracking-tight">SIAP - PBM</h1>
            <p className="text-[14px] leading-[19px] text-[#D1D9E8]">Politeknik Negeri Batam</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[14px] font-bold text-white">
          <span className="h-[9px] w-[9px] rounded-full bg-[#4ADE80]" />
          SSO Hub Active
        </div>
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-[1124px] grid-cols-1 items-start gap-10 px-6 pb-8 pt-8 sm:px-8 lg:px-8 lg:pt-[64px] xl:grid-cols-[612px_453px] xl:gap-[59px] xl:px-0">
        <section className="w-full">
            <InformationSection />
        </section>
        <section className="w-full xl:mt-[7px]">
          <LoginForm />
        </section>
      </main>
    </div>
  );
};

export default Login;
