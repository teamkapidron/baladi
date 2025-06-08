import InventoryHeader from '@/components/dashboard/inventory/inventory-header';
import InventoryMetrics from '@/components/dashboard/inventory/inventory-metrics';
import InventoryTable from '@/components/dashboard/inventory/inventory-table';

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <InventoryHeader />
      <InventoryMetrics />
      <InventoryTable />
    </div>
  );
}
