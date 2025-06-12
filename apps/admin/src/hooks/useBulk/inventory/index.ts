import { useBulk } from '@/hooks/useBulk';
import { csvInventorySchema, csvConfig } from './types';

export function useBulkInventory() {
  return useBulk(csvConfig, csvInventorySchema);
}
