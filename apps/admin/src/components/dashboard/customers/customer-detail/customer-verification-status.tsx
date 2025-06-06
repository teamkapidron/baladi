'use client';

import { memo, useState } from 'react';
import { Check, CheckCircle, Clock, Loader2 } from '@repo/ui/lib/icons';

function CustomerVerificationStatus() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentUser = {
    isEmailVerified: true,
    isApprovedByAdmin: true,
  };

  const handleSave = () => {
    console.log('save');
  };

  const handleCancel = () => {
    console.log('cancel');
  };

  return (
    <div className="border border-gray-200 bg-white">
      <div className="flex items-center justify-between p-6">
        <div className="flex-1">
          <h2 className="text-lg font-medium text-gray-800">
            Customer Verification
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 ${currentUser.isEmailVerified ? 'bg-green-100' : 'bg-amber-100'}`}
              >
                {currentUser.isEmailVerified ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-amber-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">Email Verification</p>
                <p className="text-sm text-gray-500">
                  {currentUser.isEmailVerified
                    ? 'Verified'
                    : 'Pending verification'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`p-2 ${currentUser.isApprovedByAdmin ? 'bg-green-100' : 'bg-amber-100'}`}
              >
                {currentUser.isApprovedByAdmin ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-amber-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">Admin Approval</p>
                <p className="text-sm text-gray-500">
                  {currentUser.isApprovedByAdmin
                    ? 'Approved'
                    : 'Pending approval'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="hover:bg-[var(--color-primary)]/90 bg-[var(--color-primary)] px-4 py-2 text-white transition-colors"
          >
            Edit Customer
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-70"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CustomerVerificationStatus);
