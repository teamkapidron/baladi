import { Metadata } from 'next';

import NewCustomer from '@/components/dashboard/customers/new/new-customer';

export const metadata: Metadata = {
  title: 'Legg til kunde',
};

export default function NewCustomerPage() {
  return <NewCustomer />;
}
