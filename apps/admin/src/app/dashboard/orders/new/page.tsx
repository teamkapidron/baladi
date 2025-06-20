import { Metadata } from 'next';

import NewOrder from '@/components/dashboard/orders/new/new-order';

export const metadata: Metadata = {
  title: 'Opprett Ny Ordre',
};

export default function NewOrderPage() {
  return <NewOrder />;
}
