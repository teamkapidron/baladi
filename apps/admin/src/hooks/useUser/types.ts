import { ApiData } from '@/utils/types.util';
import type { User, UserType } from '@repo/types/user';

export type GetAllCustomersRequest = ApiData<
  {
    name?: string;
    email?: string;
    userType?: UserType;
    page?: string;
    limit?: string;
    sort?: 'asc' | 'desc';
  },
  {
    users: User[];
    totalRecords: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetCustomerDetailsRequest = ApiData<
  {
    userId: string;
  },
  {
    user: User;
  }
>;

export type ApproveCustomerRequest = ApiData<
  {
    userId: string;
    userType: UserType;
  },
  undefined
>;

export type GetUserRegistrationGraphDataRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    data: {
      date: string;
      newRegistrations: number;
      totalUsers: number;
    }[];
  }
>;

export type GetUserStatsRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    totalUsers: number;
    approvedUsers: number;
    pendingUsers: number;
    unverifiedUsers: number;
  }
>;
