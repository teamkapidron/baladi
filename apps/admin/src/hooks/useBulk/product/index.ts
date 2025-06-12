import { useBulk } from '@/hooks/useBulk';
import { csvProductSchema, csvConfig } from './types';

export function useBulkProduct() {
  return useBulk(csvConfig, csvProductSchema);
}
