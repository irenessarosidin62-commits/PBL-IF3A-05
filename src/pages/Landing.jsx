import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, CheckSquare, Search, UserCheck } from 'lucide-react';
import logo from '../assets/logo.png';

const Landing = () => {
  return (
    <div className="min-h-screen bg-ice font-sans text-ink flex flex-col selection:bg-amber selection:text-amber-ink">
      {/* Hero & Navigation Section */}
      <div className="bg-navy text-white">
        {/* Navbar */}
        <div className="border-b border-white/10">
          <header className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <img
                src={logo}
                alt="SIAP-PBM Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-contain shadow-sm"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                  SIAP–PBM
                </h1>
                <p className="text-xs sm:text-sm font-medium text-line/80 mt-1">
                  Politeknik Negeri Batam
                </p>
              </div>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-amber text-amber-ink font-bold px-6 py-2.5 rounded-lg text-sm sm:text-base shadow-sm hover:bg-[#ffb936] transition-colors focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-navy"
            >
              Masuk
            </Link>
          </header>
        </div>

        {/* Hero Banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Perencanaan PBM Polibatam
            </h2>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-200/90 font-normal leading-relaxed max-w-3xl">
              SIAP-PBM membantu mengelola kompetensi dosen, menganalisis gap sumber daya, dan menyusun jadwal pengajaran — dari data Excel sampai jadwal jadi, dalam satu sistem.
            </p>
          </div>
        </section>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Fitur Utama Section */}
        <section id="fitur" className="bg-ice py-16 sm:py-24 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-tint text-royal-blue text-xs sm:text-sm font-semibold border border-royal-blue/15">
                Fitur Utama
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight max-w-2xl mx-auto leading-snug">
                Semua kebutuhan perencanaan PBM, <br className="hidden sm:inline" />
                dalam satu tempat
              </h2>
              <p className="mt-3 text-slate text-sm sm:text-base max-w-2xl mx-auto">
                Dirancang mengikuti SOP PR.8.1 dan borang BO.8.1.1 yang berlaku di PoliBatam.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {/* Card 1 */}
              <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-200 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Upload className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink mb-1.5">
                    Import Data Excel
                  </h3>
                  <p className="text-slate text-sm sm:text-base leading-relaxed">
                    Unggah data dosen dan mata kuliah langsung dari data yang sudah ada menjadi Excel.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-200 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-amber text-amber-ink flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckSquare className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink mb-1.5">
                    Rekap Kompetensi Dosen
                  </h3>
                  <p className="text-slate text-sm sm:text-base leading-relaxed">
                    Form penilaian kompetensi dengan skala 0–8 per dosen, tersimpan rapi dan mudah dibandingkan.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-200 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-amber text-amber-ink flex items-center justify-center shrink-0 shadow-2xs">
                  <Search className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink mb-1.5">
                    Analisis Gap Sumber Daya
                  </h3>
                  <p className="text-slate text-sm sm:text-base leading-relaxed">
                    Sistem otomatis menyoroti mata kuliah yang belum memiliki pengampu sesuai kompetensi.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-200 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <UserCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink mb-1.5">
                    Penentuan Koordinator
                  </h3>
                  <p className="text-slate text-sm sm:text-base leading-relaxed">
                    Tetapkan koordinator dan pengampu mata kuliah berbasis hasil rekap kompetensi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Support / About */}
        <section id="tentang" className="bg-white py-16 sm:py-20 px-6 lg:px-12 border-t border-line/60">
          <div className="max-w-5xl mx-auto">
            <div className="border-l-4 sm:border-l-[6px] border-amber pl-6 sm:pl-8 py-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ink tracking-tight">
                Mendukung Perencanaan PBM yang Lebih Terstruktur
              </h2>
              <p className="mt-4 text-slate text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl">
                SIAP-PBM merupakan aplikasi yang dikembangkan sebagai bagian dari proyek Rekayasa Perangkat Lunak Lanjut, guna membantu program studi dalam merencanakan proses belajar mengajar secara lebih sistematis dan terdokumentasi.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy-deep text-white pt-16 pb-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Branding Column */}
            <div className="md:col-span-6 lg:col-span-6">
              <div className="flex items-center gap-3.5">
                <img
                  src={logo}
                  alt="SIAP-PBM Logo"
                  className="h-10 w-10 rounded-xl object-contain bg-amber p-0.5"
                />
                <span className="text-xl font-bold tracking-tight text-white">
                  SIAP – PBM
                </span>
              </div>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed max-w-md">
                Sistem Informasi Perencanaan PBM — dikembangkan untuk mendukung perencanaan proses belajar mengajar di Politeknik Negeri Batam.
              </p>
            </div>

            {/* Menu Links Column */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="text-xs font-extrabold tracking-wider text-white uppercase mb-4">
                MENU
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#fitur" className="text-slate-300 hover:text-white transition-colors">
                    Fitur
                  </a>
                </li>
                <li>
                  <a href="#tentang" className="text-slate-300 hover:text-white transition-colors">
                    Tentang
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="text-xs font-extrabold tracking-wider text-white uppercase mb-4">
                KONTAK
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-2.5">
                Jl. Ahmad Yani, Batam Kota, Kepulauan Riau
              </p>
              <p className="text-slate-300 text-sm">
                Email:{' '}
                <a href="mailto:siap-pbm@polibatam.ac.id" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                  siap-pbm@polibatam.ac.id
                </a>
              </p>
            </div>
          </div>

          {/* Sub-footer Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <p>© 2025 Politeknik Negeri Batam • SIAP-PBM</p>
            <p>Pusat Data dan Informasi Polibatam</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
