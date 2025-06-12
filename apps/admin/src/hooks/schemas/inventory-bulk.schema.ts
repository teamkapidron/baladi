import { z } from '@repo/ui/lib/form';

// Inventory-specific CSV validation schema
export const csvInventorySchema = z.object({
  productId: z.string().trim().min(1, 'Produkt ID er påkrevd'),
  sku: z.string().trim().min(1, 'SKU er påkrevd'),
  quantity: z
    .string()
    .trim()
    .transform((val: string) => {
      if (!val || val.trim() === '') throw new Error('Antall er påkrevd');
      const num = parseInt(val);
      if (isNaN(num)) throw new Error('Antall må være et gyldig nummer');
      if (num < 0) throw new Error('Antall må være positivt');
      return num;
    }),
  location: z.string().optional().default(''),
  batchNumber: z.string().optional().default(''),
  expiryDate: z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val || val.trim() === '') return undefined;
      const date = new Date(val);
      if (isNaN(date.getTime())) throw new Error('Ugyldig utløpsdato format');
      return date.toISOString();
    }),
  costPrice: z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val || val.trim() === '') return undefined;
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error('Kostpris må være et gyldig nummer');
      if (num < 0) throw new Error('Kostpris må være positiv');
      return num;
    }),
  notes: z.string().optional().default(''),
  warehouse: z.string().optional().default(''),
  supplier: z.string().optional().default(''),
  receivedDate: z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val || val.trim() === '') return undefined;
      const date = new Date(val);
      if (isNaN(date.getTime())) throw new Error('Ugyldig mottaksdato format');
      return date.toISOString();
    }),
  isActive: z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val || val.trim() === '') return true; // Default to active
      const lower = val.toLowerCase();
      if (lower === 'true' || lower === '1' || lower === 'ja') return true;
      if (lower === 'false' || lower === '0' || lower === 'nei') return false;
      throw new Error('Aktiv må være true/false, 1/0, eller ja/nei');
    })
    .default('true'),
});

// Required columns for CSV
export const INVENTORY_REQUIRED_COLUMNS = ['productId', 'sku', 'quantity'];

// All possible columns (for validation)
export const INVENTORY_ALL_COLUMNS = [
  'productId',
  'sku',
  'quantity',
  'location',
  'batchNumber',
  'expiryDate',
  'costPrice',
  'notes',
  'warehouse',
  'supplier',
  'receivedDate',
  'isActive',
];

// Template data for CSV generation
export const INVENTORY_TEMPLATE_DATA: Record<string, string> = {
  productId: '64a1b2c3d4e5f6789abc1234',
  sku: 'EKS001',
  quantity: '100',
  location: 'A1-B2-C3',
  batchNumber: 'BATCH001',
  expiryDate: '2024-12-31',
  costPrice: '100',
  notes: 'Kommentar om lageret',
  warehouse: 'Hovedlager',
  supplier: 'Leverandør AS',
  receivedDate: '2024-01-15',
  isActive: 'true',
};

export type CsvInventoryData = z.infer<typeof csvInventorySchema>;
