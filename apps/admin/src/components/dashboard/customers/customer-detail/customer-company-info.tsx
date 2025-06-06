'use client';

import { memo, useState } from 'react';

function CustomerCompanyInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentUser = {
    companyName: 'John Doe',
    organizationNumber: '1234567890',
    address: '123 Main St, Anytown, USA',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleInputChange');
  };

  const handleSave = () => {
    console.log('save');
  };

  const handleCancel = () => {
    console.log('cancel');
  };

  const [editedUser, setEditedUser] = useState(currentUser);

  return (
    <div className="border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800">
          Company Information
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Company Name
            </label>
            {isEditing ? (
              <input
                className="focus:ring-[var(--color-primary)]/50 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                name="companyName"
                value={editedUser.companyName || ''}
                onChange={handleInputChange}
                disabled={isSaving}
              />
            ) : (
              <p className="text-gray-800">
                {currentUser.companyName || 'Not provided'}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Organization Number
            </label>
            {isEditing ? (
              <input
                className="focus:ring-[var(--color-primary)]/50 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                name="organizationNumber"
                value={editedUser.organizationNumber || ''}
                onChange={handleInputChange}
                disabled={isSaving}
              />
            ) : (
              <p className="font-mono text-gray-800">
                {currentUser.organizationNumber || 'Not provided'}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Address
            </label>
            {isEditing ? (
              <input
                className="focus:ring-[var(--color-primary)]/50 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                name="address"
                value={editedUser.address || ''}
                onChange={handleInputChange}
                disabled={isSaving}
              />
            ) : (
              <p className="text-gray-800">
                {currentUser.address || 'Not provided'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomerCompanyInfo);
