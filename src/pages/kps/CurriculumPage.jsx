import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CurriculumNavbar from '../../components/curriculum/CurriculumNavbar';
import CurriculumFilterBar from '../../components/curriculum/CurriculumFilterBar';
import CurriculumTable from '../../components/curriculum/CurriculumTable';
import CurriculumDetailDialog from '../../components/curriculum/CurriculumDetailDialog';
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

  // User details with fallbacks matching wireframe
  const userName = user?.name || 'Irenessa Rosidin';
  const userNik = user?.nik || user?.nip || '213452';
  const userRole = user?.role === 'KPS' || !user ? 'Kepala Program Studi' : user.role;
  const userProdi = user?.prodi || 'Teknik Informatika';

  // Filters state
  const [selectedTahun, setSelectedTahun] = useState('2026/2027');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [cardSemesterFilter, setCardSemesterFilter] = useState('Semua Semester');
  const [searchQuery, setSearchQuery] = useState('');
  const [localSearch, setLocalSearch] = useState('');

  // Derive available semester options based on selected header semester (Ganjil/Genap)
  const availableCardSemesters =
    selectedSemester === 'Ganjil'
      ? [1, 3, 5, 7]
      : selectedSemester === 'Genap'
      ? [2, 4, 6, 8]
      : [1, 2, 3, 4, 5, 6, 7, 8];

  // Reset card semester filter when top-level semester changes
  useEffect(() => {
    setCardSemesterFilter('Semua Semester');
  }, [selectedSemester]);

  // Course list state
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialogs state
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailCourse, setDetailCourse] = useState(null);

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
        cardSemester: cardSemesterFilter,
        academicYear: selectedTahun
      });
      setCourses(data);
    } catch {
      showToast('Gagal memuat data kurikulum', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedSemester, cardSemesterFilter, selectedTahun]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Handle Detail
  const handleOpenDetail = (course) => {
    setDetailCourse(course);
    setIsDetailOpen(true);
  };

  // Handle Add & Edit
  const handleOpenAdd = () => {
    setFormMode('add');
    setSelectedCourse(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (course) => {
    setIsDetailOpen(false);
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
        showToast('Data kurikulum berhasil ditambahkan!');
      } else {
        await updateCourse(selectedCourse.id, formData);
        showToast('Data kurikulum berhasil diperbarui!');
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
    setIsDetailOpen(false);
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
            <h2 className="text-2xl sm:text-[27px] font-extrabold text-[#0A2352] tracking-tight leading-tight">
              Selamat datang, {userName}
            </h2>
            <p className="text-xs sm:text-[14px] font-medium text-[#51607A] mt-1">
              {userRole} {userProdi} • NIK {userNik}
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
        <div className="bg-white rounded-[20px] border border-[#D8E0EE] p-6 sm:p-8 shadow-[0_4px_24px_rgba(10,35,82,0.04)]">
          {/* Judul Kartu */}
          <div className="mb-5">
            <h3 className="text-2xl sm:text-[27px] font-bold text-[#0D2554] tracking-tight">
              Data Kurikulum
            </h3>
          </div>

          {/* Pencarian, Filter Semester & Tombol Aksi */}
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            {/* Input Pencarian */}
            <div className="relative w-full md:flex-1">
              <input
                type="text"
                placeholder="Cari mata kuliah"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full h-[42px] bg-white border border-[#CBD5E1] rounded-[9px] px-4 text-[14px] text-ink placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1B4FD8] focus:ring-2 focus:ring-[#1B4FD8]/15 transition"
              />
            </div>

            {/* Dropdown Semester dalam Card */}
            <div className="relative w-full md:w-auto shrink-0">
              <select
                value={cardSemesterFilter}
                onChange={(e) => setCardSemesterFilter(e.target.value)}
                className="h-[42px] w-full md:w-auto appearance-none bg-white border border-[#CBD5E1] rounded-[9px] pl-4 pr-9 text-[14px] font-medium text-[#0F1B33] cursor-pointer hover:border-[#1B4FD8] focus:outline-none focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8] transition"
              >
                <option value="Semua Semester">Semua Semester</option>
                {availableCardSemesters.map((sem) => (
                  <option key={sem} value={String(sem)}>Semester {sem}</option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>

            {/* Tombol Import Excel */}
            <button
              type="button"
              onClick={() => setIsImportOpen(true)}
              className="w-full md:w-auto h-[42px] px-5 bg-[#FFA800] hover:bg-[#F59E0B] text-#4A3000 font-bold text-[14px] rounded-[9px] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              Import Excel
            </button>

            {/* Tombol + Tambah Mata Kuliah */}
            <button
              type="button"
              onClick={handleOpenAdd}
              className="w-full md:w-auto h-[42px] px-5 bg-[#0045C7] hover:bg-[#0038A8] text-white font-bold text-[14px] rounded-[9px] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer whitespace-nowrap"
            >
              + Tambah Mata Kuliah
            </button>
          </div>

          {/* 5. Tabel Data Kurikulum */}
          <CurriculumTable
            courses={courses}
            onDetail={handleOpenDetail}
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Dialog Detail */}
      <CurriculumDetailDialog
        isOpen={isDetailOpen}
        course={detailCourse}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* Dialogs Form, Delete & Import */}
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
