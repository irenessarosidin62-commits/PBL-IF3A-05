import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Landing = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-6 py-12 text-white">
      <div className="w-full max-w-5xl">
        <header className="mb-16 flex items-center gap-4">
          <img
            src={logo}
            alt="SIAP-PBM"
            className="h-[52px] w-[52px] rounded-2xl object-contain"
          />
          <div>
            <p className="text-xl font-bold tracking-tight">SIAP – PBM</p>
            <p className="text-sm font-semibold text-[#7DD3D0]">Politeknik Negeri Batam</p>
          </div>
        </header>

        <section className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#7DD3D0]">
            Politeknik Negeri Batam
          </p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Sistem Perencanaan Proses Belajar Mengajar Terpadu
          </h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Akses layanan akademik SIAP-PBM dalam satu sistem yang terintegrasi.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-3 rounded-lg bg-amber px-6 py-3 font-bold text-amber-ink transition-colors hover:bg-[#FFBA3D] focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-navy"
          >
            Masuk ke Sistem
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Landing;
