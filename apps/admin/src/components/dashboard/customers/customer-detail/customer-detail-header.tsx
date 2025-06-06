'use client';

import {
  ArrowLeft,
  Download,
  MoreHorizontal,
  Printer,
} from '@repo/ui/lib/icons';
import { memo } from 'react';

function CustomerDetailHeader() {
  const goBack = () => {
    console.log('goBack');
  };

  const currentUser = {
    _id: '1234567890',
    name: 'John Doe',
    isApprovedByAdmin: true,
    createdAt: new Date(),
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center text-sm text-gray-500">
          <button
            onClick={goBack}
            className="flex items-center hover:text-gray-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            <span>Customers</span>
          </button>
          <span className="mx-2">/</span>
          <span>#{currentUser._id.slice(-7)}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">
                {currentUser.name}
              </h1>
              <div className="bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                {currentUser.isApprovedByAdmin
                  ? 'Approved'
                  : 'Pending Approval'}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Registered on {formatDate(currentUser.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>
            <button className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="border border-gray-300 bg-white p-2 hover:bg-gray-50">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomerDetailHeader);
