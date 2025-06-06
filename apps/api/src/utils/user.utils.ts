import User from '@/models/user.model';

import type { FilterUserQuery } from '@/types/user.types';
import type { GetAllUsersSchema } from '@/validators/user.validator';

export function getUserFiltersFromQuery(query: GetAllUsersSchema['query']) {
  const { name, email, userType, page, limit, sort } = query;

  let sortObject = {};
  let queryObject: FilterUserQuery = {};
  const perPage = parseInt(limit ?? '10', 10);
  const currentPage = parseInt(page ?? '1', 10);

  if (name) {
    queryObject['$or'] = [
      { name: new RegExp(name, 'i') },
      { username: new RegExp(name, 'i') },
    ];
  }
  if (email) {
    queryObject['email'] = new RegExp(email, 'i');
  }
  if (userType) {
    queryObject['userType'] = userType;
  }
  if (sort) {
    sortObject = { createdAt: sort === 'asc' ? 1 : -1 };
  }

  return {
    queryObject,
    sortObject,
    perPage,
    currentPage,
  };
}

export async function getUsersCountBeforeFromDate(from?: string) {
  const initialTotal = from
    ? await User.countDocuments({
        createdAt: { $lt: new Date(new Date(from).setHours(0, 0, 0, 0)) },
        isApprovedByAdmin: true,
      })
    : 0;

  return initialTotal;
}
