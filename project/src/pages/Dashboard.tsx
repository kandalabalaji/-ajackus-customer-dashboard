import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UserTable } from '../components/UserTable';
import { UserForm } from '../components/UserForm';
import { FilterModal } from '../components/FilterModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { ErrorMessage } from '../components/ErrorMessage';
import { useUsers } from '../hooks/useUsers';
import { User, FilterOptions } from '../types/User';

export const Dashboard: React.FC = () => {
  const {
    users,
    loading,
    error,
    filters,
    searchTerm,
    pagination,
    sort,
    createUser,
    updateUser,
    deleteUser,
    setFilters,
    setSearchTerm,
    setPagination,
    setSort,
    clearError,
  } = useUsers();

  const [showUserForm, setShowUserForm] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Handle user form submission
  const handleUserSubmit = async (userData: Omit<User, 'id'> | User) => {
    setFormLoading(true);
    try {
      if ('id' in userData) {
        // Update existing user
        await updateUser(userData.id, userData);
      } else {
        // Create new user
        await createUser(userData);
      }
      setShowUserForm(false);
      setSelectedUser(null);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit user
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  // Handle delete user
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Confirm delete user
  const handleConfirmDelete = async () => {
    if (selectedUser) {
      const success = await deleteUser(selectedUser.id);
      if (success) {
        setShowDeleteModal(false);
        setSelectedUser(null);
      }
    }
  };

  // Handle add new user
  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserForm(true);
  };

  // Handle sorting
  const handleSort = (field: keyof User) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }));
  };

  // Handle filters
  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Handle search
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Error Message */}
        {error && (
          <ErrorMessage message={error} onClose={clearError} />
        )}

        {/* User Table */}
        <UserTable
          users={users}
          loading={loading}
          sort={sort}
          pagination={pagination}
          filters={filters}
          onSort={handleSort}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onAddUser={handleAddUser}
          onShowFilters={() => setShowFilterModal(true)}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </main>

      <Footer />

      {/* Modals */}
      <UserForm
        isOpen={showUserForm}
        onClose={() => {
          setShowUserForm(false);
          setSelectedUser(null);
        }}
        onSubmit={handleUserSubmit}
        user={selectedUser}
        loading={formLoading}
      />

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirmDelete}
        user={selectedUser}
        loading={loading}
      />
    </div>
  );
};