import { useState, useEffect, useCallback } from 'react';
import { User, ApiUser, FilterOptions, PaginationOptions, SortOptions } from '../types/User';
import { transformApiUser, transformToApiUser } from '../utils/userHelpers';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [sort, setSort] = useState<SortOptions>({
    field: '',
    direction: 'asc',
  });

  /**
   * Fetches all users from the API
   */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const apiUsers: ApiUser[] = await response.json();
      const transformedUsers = apiUsers.map(transformApiUser);
      
      setUsers(transformedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Creates a new user
   */
  const createUser = async (userData: Omit<User, 'id'>): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);

      const apiUserData = transformToApiUser({ ...userData, id: 0 });
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiUserData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.statusText}`);
      }

      const createdApiUser: ApiUser = await response.json();
      const newUser = transformApiUser(createdApiUser);
      
      // Since JSONPlaceholder doesn't actually save data, we'll add it locally
      const userWithId = { ...newUser, id: Math.max(...users.map(u => u.id)) + 1 };
      setUsers(prev => [...prev, userWithId]);
      
      return userWithId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
      console.error('Error creating user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates an existing user
   */
  const updateUser = async (id: number, userData: Partial<User>): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);

      const existingUser = users.find(u => u.id === id);
      if (!existingUser) {
        throw new Error('User not found');
      }

      const updatedUserData = { ...existingUser, ...userData };
      const apiUserData = transformToApiUser(updatedUserData);

      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiUserData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const updatedApiUser: ApiUser = await response.json();
      const updatedUser = transformApiUser(updatedApiUser);

      setUsers(prev => prev.map(user => 
        user.id === id ? { ...updatedUser, id } : user
      ));
      
      return { ...updatedUser, id };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      console.error('Error updating user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes a user
   */
  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      setUsers(prev => prev.filter(user => user.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      console.error('Error deleting user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Applies filters, search, and sorting to the user list
   */
  const applyFiltersAndSearch = useCallback(() => {
    let result = [...users];

    // Apply filters
    if (filters.firstName) {
      result = result.filter(user => 
        user.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }
    if (filters.lastName) {
      result = result.filter(user => 
        user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    }
    if (filters.email) {
      result = result.filter(user => 
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.department) {
      result = result.filter(user => 
        user.department.toLowerCase().includes(filters.department.toLowerCase())
      );
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.department.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sort.field) {
      result.sort((a, b) => {
        const aValue = a[sort.field] || '';
        const bValue = b[sort.field] || '';
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sort.direction === 'asc' ? comparison : -comparison;
        }
        
        if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(result);
    setPagination(prev => ({ 
      ...prev, 
      total: result.length, 
      page: 1 
    }));
  }, [users, filters, searchTerm, sort]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    applyFiltersAndSearch();
  }, [applyFiltersAndSearch]);

  // Initialize data on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Get paginated users
  const paginatedUsers = filteredUsers.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  return {
    users: paginatedUsers,
    allUsers: filteredUsers,
    loading,
    error,
    filters,
    searchTerm,
    pagination,
    sort,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setFilters,
    setSearchTerm,
    setPagination,
    setSort,
    clearError: () => setError(null),
  };
};