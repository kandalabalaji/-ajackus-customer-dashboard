import { User, ApiUser } from '../types/User';

/**
 * Converts API user format to application user format
 */
export const transformApiUser = (apiUser: ApiUser): User => {
  const nameParts = apiUser.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return {
    id: apiUser.id,
    firstName,
    lastName,
    email: apiUser.email,
    department: apiUser.company.name,
    phone: apiUser.phone,
    website: apiUser.website,
  };
};

/**
 * Converts application user format to API user format
 */
export const transformToApiUser = (user: User): Partial<ApiUser> => {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    phone: user.phone || '',
    website: user.website || '',
    company: {
      name: user.department,
      catchPhrase: '',
      bs: '',
    },
  };
};

/**
 * Validates user data
 */
export const validateUser = (user: Partial<User>): string[] => {
  const errors: string[] = [];

  if (!user.firstName?.trim()) {
    errors.push('First name is required');
  }

  if (!user.lastName?.trim()) {
    errors.push('Last name is required');
  }

  if (!user.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push('Invalid email format');
  }

  if (!user.department?.trim()) {
    errors.push('Department is required');
  }

  return errors;
};