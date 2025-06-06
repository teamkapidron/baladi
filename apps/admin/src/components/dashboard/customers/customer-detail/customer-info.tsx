'use client';

import { memo, useState } from 'react';

function CustomerInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    userType: 'External',
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
          Customer Information
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Full Name
            </label>
            {isEditing ? (
              <input
                className="focus:ring-[var(--color-primary)]/50 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                name="name"
                value={editedUser.name || ''}
                onChange={handleInputChange}
                disabled={isSaving}
              />
            ) : (
              <p className="text-gray-800">{currentUser.name}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Email Address
            </label>
            {isEditing ? (
              <input
                className="focus:ring-[var(--color-primary)]/50 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                name="email"
                value={editedUser.email || ''}
                onChange={handleInputChange}
                disabled={isSaving}
              />
            ) : (
              <p className="text-gray-800">{currentUser.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Phone Number
            </label>
            {isEditing ? (
              <input
                className="focus:ring-[var(--color-primary)]/50 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                name="phoneNumber"
                value={editedUser.phoneNumber || ''}
                onChange={handleInputChange}
                disabled={isSaving}
              />
            ) : (
              <p className="text-gray-800">
                {currentUser.phoneNumber || 'Not provided'}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Customer Type
            </label>
            <p className="text-gray-800">
              {currentUser.userType || 'External'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomerInfo);
