'use client';

// Node Modules
import { memo } from 'react';
import { useRouter } from 'next/navigation';

// Components
import CustomerForm from '@/components/dashboard/customers/customer-form/customer-form';
import { CustomerFormValues } from '@/components/dashboard/customers/customer-form/customer-form';

// Hooks
import { useUsers } from '@/hooks/useUsers';

function NewCustomer() {
  const { createUserMutation } = useUsers();
  const router = useRouter();

  function onSubmit(data: CustomerFormValues) {
    createUserMutation.mutate(data, {
      onSuccess: () => {
        router.push('/dashboard/customers');
      },
    });
  }

  return (
    <div className="bg-background rounded-xl p-5 shadow-md">
      <CustomerForm
        onSubmit={onSubmit}
        isPending={createUserMutation.isPending}
      />
    </div>
  );
}

export default memo(NewCustomer);
