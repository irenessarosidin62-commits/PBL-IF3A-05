import React, { useState, useEffect, useCallback } from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import UserFilterBar from '../../components/admin/UserFilterBar';
import UserTable from '../../components/admin/UserTable';
import UserPagination from '../../components/admin/UserPagination';
import UserFormDialog from '../../components/admin/UserFormDialog';
import UserDeleteDialog from '../../components/admin/UserDeleteDialog';
import UserConflictDialog from '../../components/admin/UserConflictDialog';
import UserImportDialog from '../../components/admin/UserImportDialog';
import Toast from '../../components/common/Toast';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  exportUsersToExcel
} from '../../services/userService';
import { USER_STATUS, TOAST_MESSAGES } from '../../constants/userConstants';

const UserManagementPage = () => {
  // Data list states
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('Semua Peran');
  const [isLoading, setIsLoading] = useState(true);

  // Dialog states
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isConflictDialogOpen, setIsConflictDialogOpen] = useState(false);
  const [conflictUser, setConflictUser] = useState(null);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load users from service
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchUsers({
        search,
        role: selectedRole,
        page: currentPage
      });
      setUsers(response.users);
      setTotalItems(response.total);
      setTotalPages(response.totalPages);
    } catch {
      showToast('Gagal memuat data pengguna.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedRole, currentPage]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Handle Search & Filter changes
  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    setCurrentPage(1);
  }, []);

  const handleRoleChange = useCallback((role) => {
    setSelectedRole(role);
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearch('');
    setSelectedRole('Semua Peran');
    setCurrentPage(1);
  }, []);

  // Add / Edit Handlers
  const handleOpenAdd = () => {
    setSelectedUser(null);
    setFormMode('add');
    setIsFormDialogOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setFormMode('edit');
    setIsFormDialogOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmittingForm(true);
    try {
      if (formMode === 'add') {
        await createUser(formData);
      } else {
        await updateUser(selectedUser.id, formData);
      }
      setIsFormDialogOpen(false);
      showToast(TOAST_MESSAGES.SAVED);
      loadUsers();
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Delete Handlers
  const handleOpenDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await deleteUser(userToDelete.id);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      showToast(TOAST_MESSAGES.DELETED);
      loadUsers();
    } catch (err) {
      setIsDeleteDialogOpen(false);
      if (err.status === 409) {
        setConflictUser(userToDelete);
        setIsConflictDialogOpen(true);
      } else {
        showToast(err.message || 'Gagal menghapus pengguna.', 'error');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Conflict Deactivate Handler
  const handleDeactivateUser = async (user) => {
    setIsDeactivating(true);
    try {
      await updateUserStatus(user.id, USER_STATUS.INACTIVE);
      setIsConflictDialogOpen(false);
      setConflictUser(null);
      showToast(TOAST_MESSAGES.STATUS_UPDATED);
      loadUsers();
    } catch {
      showToast('Gagal menonaktifkan pengguna.', 'error');
    } finally {
      setIsDeactivating(false);
    }
  };

  // Export Excel Handler
  const handleExport = async () => {
    try {
      await exportUsersToExcel({ search, role: selectedRole });
    } catch {
      showToast('Gagal mengekspor data pengguna.', 'error');
    }
  };

  // Import Success Handler
  const handleImportSuccess = (count) => {
    showToast(TOAST_MESSAGES.IMPORT_SUCCESS(count));
    loadUsers();
  };

  return (
    <div className="min-h-screen bg-ice font-sans flex flex-col selection:bg-amber selection:text-amber-ink">
      {/* 1. Header Navigation */}
      <AdminNavbar />

      {/* 2. Main Content Area */}
      <main className="flex-1 w-full max-w-[1120px] mx-auto px-6 sm:px-10 pt-8 pb-14">
        {/* Page Title & Action Buttons Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[28px] sm:text-[30px] font-bold text-navy leading-[1.2]">
              Data pengguna
            </h2>
            <p className="text-[15px] text-slate mt-1 font-normal">
              Kelola akun pengguna SIAP-PBM
            </p>
          </div>

          {/* Action Buttons: Impor Excel, Ekspor data, + Tambah pengguna */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsImportDialogOpen(true)}
              className="h-[44px] px-5 bg-amber hover:bg-[#FFBA3D] text-amber-ink font-bold text-[14px] rounded-[10px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber cursor-pointer"
            >
              Impor Excel
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="h-[44px] px-5 bg-amber hover:bg-[#FFBA3D] text-amber-ink font-bold text-[14px] rounded-[10px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber cursor-pointer"
            >
              Ekspor data
            </button>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="h-[44px] px-5 bg-royal-blue hover:bg-[#1642B5] text-white font-bold text-[14px] rounded-[10px] transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
            >
              + Tambah pengguna
            </button>
          </div>
        </div>

        {/* 3. Search & Filter Bar */}
        <UserFilterBar
          search={search}
          onSearchChange={handleSearchChange}
          selectedRole={selectedRole}
          onRoleChange={handleRoleChange}
        />

        {/* 4. Table Card */}
        <UserTable
          users={users}
          isLoading={isLoading}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onResetFilters={handleResetFilters}
        />

        {/* 5. Pagination */}
        <UserPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>

      {/* Dialogs */}
      <UserFormDialog
        isOpen={isFormDialogOpen}
        mode={formMode}
        initialData={selectedUser}
        onClose={() => setIsFormDialogOpen(false)}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmittingForm}
      />

      <UserDeleteDialog
        isOpen={isDeleteDialogOpen}
        user={userToDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      <UserConflictDialog
        isOpen={isConflictDialogOpen}
        user={conflictUser}
        onClose={() => setIsConflictDialogOpen(false)}
        onDeactivate={handleDeactivateUser}
        isDeactivating={isDeactivating}
      />

      <UserImportDialog
        isOpen={isImportDialogOpen}
        onClose={() => setIsImportDialogOpen(false)}
        onSuccess={handleImportSuccess}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default UserManagementPage;
