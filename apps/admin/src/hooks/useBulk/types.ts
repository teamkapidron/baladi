import { ApiData } from '@/utils/types.util';
import { csvProductSchema } from '@/components/dashboard/products/bulk/schema';
import { csvInventorySchema } from '@/components/dashboard/inventory/bulk/schema';

export interface CsvConfigType {
  requiredColumns: string[];
  allColumns: string[];
  templateData: Record<string, string>;
  maxFileSize: number;
  acceptedFileTypes: string[];
}

export interface CsvValidationError {
  row: number;
  column: string;
  value: string;
  error: string;
}

export interface CsvParseResult<T = unknown> {
  success: boolean;
  data?: T[];
  errors: CsvValidationError[];
  missingColumns: string[];
  totalRows: number;
  validRows: number;
}

export type BulkAddProductsRequest = ApiData<
  typeof csvProductSchema,
  undefined
>;
export type BulkAddInventoryRequest = ApiData<
  typeof csvInventorySchema,
  undefined
>;
