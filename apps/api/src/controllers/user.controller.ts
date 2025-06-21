// Node Modules

// Schemas
import User from '@/models/user.model';
import Order from '@/models/order.model';

// Utils
import {
  getUserFiltersFromQuery,
  getUsersCountBeforeFromDate,
} from '@/utils/user.utils';
import {
  fillMissingDates,
  formatDate,
  getDateMatchStage,
} from '@/utils/common/date.util';
import { sendMail } from '@/utils/common/mail.util';
import { sendResponse } from '@/utils/common/response.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type { Request, Response } from 'express';
import type {
  GetAllUsersSchema,
  GetUserDetailsSchema,
  UpdateUserSchema,
  GetUserRegistrationGraphDataSchema,
  GetUserStatsSchema,
  TopUsersSchema,
} from '@/validators/user.validator';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as GetAllUsersSchema['query'];

  const { queryObject, perPage, currentPage, skip } =
    getUserFiltersFromQuery(query);

  const users = await User.find(queryObject)
    .select('-password -otp -otpExpiry -resetToken -resetTokenExpiry')
    .limit(perPage)
    .skip(skip);

  const totalRecords = await User.countDocuments(queryObject);

  sendResponse(res, 200, 'Users fetched successfully', {
    users,
    totalRecords,
    currentPage,
    perPage,
    totalPages: Math.ceil(totalRecords / perPage),
  });
});

export const getUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params as GetUserDetailsSchema['params'];

    const user = await User.findById(userId)
      .select('-password -otp -otpExpiry -resetToken -resetTokenExpiry')
      .lean();

    if (!user) {
      throw new ErrorHandler(404, 'User not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'User details fetched successfully', { user });
  },
);

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId, userType, isApprovedByAdmin } =
    req.body as UpdateUserSchema['body'];

  const user = await User.findById(userId);
  if (!user) {
    throw new ErrorHandler(404, 'User not found', 'NOT_FOUND');
  }

  user.userType = userType;
  user.isApprovedByAdmin = isApprovedByAdmin ?? true;
  await user.save();

  if (isApprovedByAdmin) {
    await sendMail({
      to: user.email,
      subject: 'Din konto har blitt godkjent',
      template: {
        type: 'userApprovalConfirmation',
        data: {
          name: user.name,
          email: user.email,
        },
      },
    });
  }

  sendResponse(res, 200, 'User updated successfully');
});

export const getUserRegistrationGraphData = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } =
      req.query as GetUserRegistrationGraphDataSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);
    const initialTotal = await getUsersCountBeforeFromDate(from);

    let totalUsers = initialTotal;

    const registrationData = await User.aggregate([
      {
        $match: {
          ...matchStage,
          isApprovedByAdmin: true,
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          },
          newRegistrations: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id.date',
          newRegistrations: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const formattedData = registrationData.map((item) => {
      totalUsers += item.newRegistrations;

      return {
        date: formatDate(item.date),
        newRegistrations: item.newRegistrations,
        totalUsers,
      };
    });

    const preFilledData = fillMissingDates(
      formattedData,
      from,
      to,
      30,
      'date',
      ['newRegistrations'],
    );

    let cumulativeTotal = initialTotal;
    const finalData = preFilledData.map((item) => {
      cumulativeTotal += item.newRegistrations;
      return {
        ...item,
        totalUsers: cumulativeTotal,
      };
    });

    sendResponse(
      res,
      200,
      'User registration graph data fetched successfully',
      {
        data: finalData,
      },
    );
  },
);

export const getUserStats = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetUserStatsSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const totalUsers = await User.countDocuments({ ...matchStage });
    const approvedUsers = await User.countDocuments({
      ...matchStage,
      isEmailVerified: true,
      isApprovedByAdmin: true,
    });
    const pendingUsers = await User.countDocuments({
      ...matchStage,
      isEmailVerified: true,
      isApprovedByAdmin: false,
    });
    const unverifiedUsers = await User.countDocuments({
      ...matchStage,
      isEmailVerified: false,
      isApprovedByAdmin: false,
    });

    sendResponse(res, 200, 'User stats fetched successfully', {
      totalUsers,
      approvedUsers,
      pendingUsers,
      unverifiedUsers,
    });
  },
);

export const getTopUsers = asyncHandler(async (req: Request, res: Response) => {
  const { from, to } = req.query as TopUsersSchema['query'];

  const matchStage = getDateMatchStage('createdAt', from, to);

  const topUsers = await Order.aggregate([
    {
      $match: {
        ...matchStage,
      },
    },
    {
      $group: {
        _id: '$userId',
        totalAmount: { $sum: '$totalAmount' },
        totalOrders: { $sum: 1 },
      },
    },
    {
      $sort: { totalAmount: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        _id: 0,
        user: {
          _id: '$user._id',
          userName: '$user.name',
          userEmail: '$user.email',
        },
        totalAmount: 1,
        totalOrders: 1,
      },
    },
  ]);

  sendResponse(res, 200, 'Top users fetched successfully', {
    topUsers,
  });
});
