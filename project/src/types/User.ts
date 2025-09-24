export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  phone?: string;
  website?: string;
}

export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface FilterOptions {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface SortOptions {
  field: keyof User | '';
  direction: 'asc' | 'desc';
}