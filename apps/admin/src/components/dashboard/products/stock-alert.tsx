import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@repo/ui/components/base/alert';
import { PackageX } from '@repo/ui/lib/icons';

export function StockAlert() {
  const outOfStockProducts: number = 10;
  const lowStockProducts: number = 20;

  if (outOfStockProducts === 0 && lowStockProducts === 0) {
    return null;
  }

  return (
    <Alert
      variant="default"
      className="rounded-none border-0 border-amber-500 bg-amber-500/5 shadow-sm"
    >
      <PackageX className="h-5 w-5 text-amber-500" />
      <AlertTitle>Inventory Alert</AlertTitle>
      <AlertDescription>
        {outOfStockProducts > 0 && (
          <span className="text-destructive font-medium">
            {outOfStockProducts} product{outOfStockProducts !== 1 ? 's' : ''}{' '}
            out of stock.
          </span>
        )}
        {lowStockProducts > 0 && (
          <span className="font-medium text-amber-600">
            {lowStockProducts} product{lowStockProducts !== 1 ? 's' : ''} with
            low stock.
          </span>
        )}
        <span>Please review your inventory and restock as needed.</span>
      </AlertDescription>
    </Alert>
  );
}
