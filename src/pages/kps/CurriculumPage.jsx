import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, FileSpreadsheet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CurriculumNavbar from '../../components/curriculum/CurriculumNavbar';
import CurriculumFilterBar from '../../components/curriculum/CurriculumFilterBar';
import CurriculumTable from '../../components/curriculum/CurriculumTable';
import CurriculumImportDialog from '../../components/curriculum/CurriculumImportDialog';
import CurriculumFormDialog from '../../components/curriculum/CurriculumFormDialog';
import CurriculumDeleteDialog from '../../components/curriculum/CurriculumDeleteDialog';
import Toast from '../../components/common/Toast';
import {
  fetchCurriculum,
  createCourse,
  updateCourse,
  deleteCourse
} from '../../services/curriculumService';

const CurriculumPage = () => {
  const { user } = useAuth();

  // User details with graceful fallbacks
  const userName = user?.name || 'Yeni Rokhayati';
  const userRole = user?.role || 'KPS';
  const userNik = user?.nik || user?.nip || '112093';
  const userProdi = user?.prodi || 'Program Studi Teknik Informatika';

  // Filters state
  const [selectedTahun, setSelectedTahun] = useState('2026/2027');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [searchQuery, setSearchQuery] = useState('');
  const [localSearch, setLocalSearch] = useState('');

  // Course list state
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialogs state
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]);

  // Load curriculum data
  const loadCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCurriculum({
        search: searchQuery,
        semester: selectedSemester,
        academicYear: selectedTahun
      });
      setCourses(data);
    } catch {
      showToast('Gagal memuat data kurikulum', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedSemester, selectedTahun]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Handle Add & Edit
  const handleOpenAdd = () => {
    setFormMode('add');
    setSelectedCourse(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (course) => {
    setFormMode('edit');
    setSelectedCourse(course);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmittingForm(true);
    try {
      if (formMode === 'add') {
        await createCourse({
          ...formData,
          academicYear: selectedTahun,
          prodi: formData.prodi || userProdi || 'Teknik Informatika'
        });
        showToast('Mata kuliah berhasil ditambahkan!');
      } else {
        await updateCourse(selectedCourse.id, formData);
        showToast('Mata kuliah berhasil diperbarui!');
      }
      setIsFormOpen(false);
      loadCourses();
    } catch (err) {
      showToast(err.message || 'Terjadi kesalahan saat menyimpan data.', 'error');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Handle Delete
  const handleOpenDelete = (course) => {
    setCourseToDelete(course);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deleteCourse(id);
      showToast('Mata kuliah berhasil dihapus!');
      setIsDeleteOpen(false);
      loadCourses();
    } catch (err) {
      showToast(err.message || 'Gagal menghapus mata kuliah.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Import Success
  const handleImportSuccess = (count) => {
    showToast(`${count} data kurikulum berhasil diimpor!`);
    loadCourses();
  };

  return (
    <div className="min-h-screen bg-[#F0F4F9] text-ink font-sans flex flex-col">
      {/* 1. Header & Navigation */}
      <CurriculumNavbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1140px] w-full mx-auto px-4 sm:px-8 py-7 sm:py-9">
        {/* 2. Informasi Pengguna & 3. Dropdown Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">
          {/* Sapaan Pengguna */}
          <div>
            <h2 className="text-2xl sm:text-[27px] font-extrabold text-navy tracking-tight leading-tight">
              Selamat datang, {userName}
            </h2>
            <p className="text-xs sm:text-[14px] font-medium text-slate mt-1">
              {userRole} • {userProdi} • NIK {userNik}
            </p>
          </div>

          {/* Dropdown Filters (Tahun Ajaran & Semester) */}
          <CurriculumFilterBar
            selectedTahun={selectedTahun}
            onTahunChange={setSelectedTahun}
            selectedSemester={selectedSemester}
            onSemesterChange={setSelectedSemester}
          />
        </div>

        {/* 4. Kartu Data Kurikulum */}
        <div className="bg-white rounded-[20px] border border-line p-6 sm:p-8 shadow-[0_4px_24px_rgba(10,35,82,0.04)]">
          {/* Judul Kartu */}
          <div className="mb-5">
            <h3 className="text-2xl sm:text-[26px] font-bold text-navy tracking-tight">
              Data Kurikulum
            </h3>
          </div>

          {/* Pencarian dan Tombol Aksi */}
          <div className="flex flex-col md:flex-row items-center gap-3.5 mb-6">
            {/* Input Pencarian */}
            <div className="relative w-full md:flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Cari mata kuliah"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full h-[44px] bg-white border border-line rounded-[10px] pl-10 pr-4 text-[14px] text-ink placeholder:text-slate/70 focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring transition-shadow"
              />
            </div>

            {/* Tombol Aksi Kanan */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              {/* Tombol Import Excel */}
              <button
                type="button"
                onClick={() => setIsImportOpen(true)}
                className="flex-1 md:flex-initial h-[44px] px-5 bg-amber hover:bg-[#FFBA3D] text-amber-ink font-bold text-[14px] rounded-[10px] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber"
              >

                <span>Import Excel</span>
              </button>

              {/* Tombol + Tambah Mata Kuliah */}
              <button
                type="button"
                onClick={handleOpenAdd}
                className="flex-1 md:flex-initial h-[44px] px-5 bg-royal-blue hover:bg-[#153eb5] text-white font-bold text-[14px] rounded-[10px] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue"
              >
                <Plus size={18} />
                <span> Tambah Mata Kuliah </span>
              </button>
            </div>
          </div>

          {/* 5. Tabel Data Kurikulum */}
          <CurriculumTable
            courses={courses}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Dialogs */}
      <CurriculumImportDialog
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSuccess={handleImportSuccess}
        selectedProdi={userProdi || 'Teknik Informatika'}
      />

      <CurriculumFormDialog
        isOpen={isFormOpen}
        mode={formMode}
        initialData={selectedCourse}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmittingForm}
      />

      <CurriculumDeleteDialog
        isOpen={isDeleteOpen}
        course={courseToDelete}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Toast Alert */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default CurriculumPage;
