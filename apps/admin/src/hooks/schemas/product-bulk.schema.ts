import { z } from '@repo/ui/lib/form';
import { Visibility } from '@repo/types/product';

// Product-specific CSV validation schema
export const csvProductSchema = z.object({
  name: z.string().trim().min(1, 'Produktnavn er påkrevd'),
  slug: z.string().trim().min(1, 'Slug er påkrevd'),
  description: z.string().optional().default(''),
  shortDescription: z.string().optional().default(''),
  sku: z.string().optional().default(''),
  barcode: z.string().optional().default(''),
  vat: z
    .string()
    .trim()
    .transform((val: string) => {
      if (!val || val.trim() === '') throw new Error('MVA er påkrevd');
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error('MVA må være et gyldig nummer');
      if (num < 0 || num > 100) throw new Error('MVA må være mellom 0 og 100');
      return num;
    }),
  costPrice: z
    .string()
    .trim()
    .transform((val: string) => {
      if (!val || val.trim() === '') throw new Error('Kostpris er påkrevd');
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error('Kostpris må være et gyldig nummer');
      if (num < 0) throw new Error('Kostpris må være positiv');
      return num;
    }),
  salePrice: z
    .string()
    .trim()
    .transform((val: string) => {
      if (!val || val.trim() === '') throw new Error('Salgspris er påkrevd');
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error('Salgspris må være et gyldig nummer');
      if (num < 0) throw new Error('Salgspris må være positiv');
      return num;
    }),
  noOfUnits: z
    .string()
    .trim()
    .transform((val: string) => {
      if (!val || val.trim() === '')
        throw new Error('Antall enheter er påkrevd');
      const num = parseInt(val);
      if (isNaN(num))
        throw new Error('Antall enheter må være et gyldig nummer');
      if (num < 0) throw new Error('Antall enheter må være positivt');
      return num;
    }),
  categories: z.string().optional().default(''),
  images: z.string().optional().default(''),
  isActive: z
    .string()
    .trim()
    .transform((val: string) => {
      if (!val || val.trim() === '') throw new Error('Aktiv status er påkrevd');
      const lower = val.toLowerCase();
      if (lower === 'true' || lower === '1' || lower === 'ja') return true;
      if (lower === 'false' || lower === '0' || lower === 'nei') return false;
      throw new Error('Aktiv må være true/false, 1/0, eller ja/nei');
    }),
  visibility: z
    .string()
    .trim()
    .transform((val: string) => {
      if (!val || val.trim() === '') throw new Error('Synlighet er påkrevd');
      const lower = val.toLowerCase();
      if (lower === 'both' || lower === 'begge') return Visibility.BOTH;
      if (lower === 'internal' || lower === 'intern')
        return Visibility.INTERNAL;
      if (lower === 'external' || lower === 'ekstern')
        return Visibility.EXTERNAL;
      throw new Error(
        'Synlighet må være: both/begge, internal/intern, eller external/ekstern',
      );
    }),
  hasVolumeDiscount: z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val || val.trim() === '') return false;
      const lower = val.toLowerCase();
      if (lower === 'true' || lower === '1' || lower === 'ja') return true;
      if (lower === 'false' || lower === '0' || lower === 'nei') return false;
      throw new Error('Volum rabatt må være true/false, 1/0, eller ja/nei');
    })
    .default('false'),
  weight: z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val || val.trim() === '') return undefined;
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error('Vekt må være et gyldig nummer');
      if (num < 0) throw new Error('Vekt må være positiv');
      return num;
    }),
  'dimensions.length': z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val || val.trim() === '') return undefined;
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error('Lengde må være et gyldig nummer');
      if (num < 0) throw new Error('Lengde må være positiv');
      return num;
    }),
  'dimensions.width': z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val || val.trim() === '') return undefined;
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error('Bredde må være et gyldig nummer');
      if (num < 0) throw new Error('Bredde må være positiv');
      return num;
    }),
  'dimensions.height': z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val || val.trim() === '') return undefined;
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error('Høyde må være et gyldig nummer');
      if (num < 0) throw new Error('Høyde må være positiv');
      return num;
    }),
  'supplier.number': z.string().optional().default(''),
  'supplier.name': z.string().optional().default(''),
  'supplier.location': z.string().optional().default(''),
  'supplier.countryOfOrigin': z.string().optional().default(''),
  'supplier.hsCode': z.string().optional().default(''),
});

// Required columns for CSV
export const PRODUCT_REQUIRED_COLUMNS = [
  'name',
  'slug',
  'vat',
  'costPrice',
  'salePrice',
  'noOfUnits',
  'isActive',
  'visibility',
];

// All possible columns (for validation)
export const PRODUCT_ALL_COLUMNS = [
  'name',
  'slug',
  'description',
  'shortDescription',
  'sku',
  'barcode',
  'vat',
  'costPrice',
  'salePrice',
  'noOfUnits',
  'categories',
  'images',
  'isActive',
  'visibility',
  'hasVolumeDiscount',
  'weight',
  'dimensions.length',
  'dimensions.width',
  'dimensions.height',
  'supplier.number',
  'supplier.name',
  'supplier.location',
  'supplier.countryOfOrigin',
  'supplier.hsCode',
];

// Template data for CSV generation
export const PRODUCT_TEMPLATE_DATA: Record<string, string> = {
  name: 'Eksempel Produkt',
  slug: 'eksempel-produkt',
  description: 'Detaljert beskrivelse av produktet',
  shortDescription: 'Kort beskrivelse',
  sku: 'EKS001',
  barcode: '1234567890123',
  vat: '25',
  costPrice: '100',
  salePrice: '150',
  noOfUnits: '50',
  categories: 'kategori1',
  images: 'bilde1.jpg',
  isActive: 'true',
  visibility: 'both',
  hasVolumeDiscount: 'false',
  weight: '0.5',
  'dimensions.length': '10',
  'dimensions.width': '5',
  'dimensions.height': '3',
  'supplier.number': 'SUP001',
  'supplier.name': 'Leverandør AS',
  'supplier.location': 'Oslo',
  'supplier.countryOfOrigin': 'Norge',
  'supplier.hsCode': '12345678',
};

export type CsvProductData = z.infer<typeof csvProductSchema>;
