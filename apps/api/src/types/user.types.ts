import { UserType } from '@repo/types/user';

export interface FilterUserQuery {
  $or?: { [key: string]: RegExp }[];
  email?: RegExp;
  userType?: UserType;
  isApprovedByAdmin?: boolean;
  isEmailVerified?: boolean;
}
