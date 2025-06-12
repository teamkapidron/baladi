// Node Modules
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';
import { z } from '@repo/ui/lib/form';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type { ProductRequestBody } from '@/hooks/useProduct/types';
import { ApiData } from '@/utils/types.util';
import { Visibility } from '@repo/types/product';
import type {
  CsvValidationError,
  CsvParseResult,
  CsvUploadConfig,
} from '@/components/csv-upload-box';
import {
  csvProductSchema,
  REQUIRED_COLUMNS,
  ALL_COLUMNS,
  TEMPLATE_DATA,
} from '@/hooks/useBulkProduct/type';

export function useBulkProduct() {
  const api = useRequest();
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // Product-specific CSV validation function
  const validateProductRow = useCallback(
    (row: any, rowIndex: number): CsvValidationError[] => {
      const errors: CsvValidationError[] = [];

      try {
        csvProductSchema.parse(row);
      } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            errors.push({
              row: rowIndex + 1,
              column: err.path.join('.'),
              value: String(row[err.path[0] as keyof typeof row] || ''),
              error: err.message,
            });
          });
        }
      }
      console.log(errors);
      return errors;
    },
    [],
  );

  // CSV upload configuration for products
  const csvConfig: CsvUploadConfig = {
    requiredColumns: REQUIRED_COLUMNS,
    allColumns: ALL_COLUMNS,
    templateData: TEMPLATE_DATA,
    validateRow: validateProductRow,
    maxFileSize: 10,
    acceptedFileTypes: ['.csv'],
  };

  // API Mutations
  const bulkCreateProducts = useCallback(
    async (products: ProductRequestBody[]) => {
      const response = await api.post<BulkCreateProductsRequest['response']>(
        '/api/admin/products/bulk/create',
        { products },
      );
      return response.data.data;
    },
    [api],
  );

  const bulkCreateProductsMutation = useMutation({
    mutationFn: bulkCreateProducts,
    onSuccess: (data) => {
      const { successCount, failureCount } = data;
      if (failureCount === 0) {
        toast.success(`${successCount} produkter opprettet vellykket!`);
      } else {
        toast.warning(
          `${successCount} produkter opprettet, ${failureCount} feilet`,
        );
      }
    },
    onError: (error: Error) => {
      toast.error(`Bulk opprettelse feilet: ${error.message}`);
    },
  });

  const bulkUpdateProducts = useCallback(
    async (
      updates: Array<{ _id: string; updates: Partial<ProductRequestBody> }>,
    ) => {
      const response = await api.put<BulkUpdateProductsRequest['response']>(
        '/api/admin/products/bulk/update',
        { updates },
      );
      return response.data.data;
    },
    [api],
  );

  const bulkUpdateProductsMutation = useMutation({
    mutationFn: bulkUpdateProducts,
    onSuccess: (data) => {
      const { successCount, failureCount } = data;
      if (failureCount === 0) {
        toast.success(`${successCount} produkter oppdatert vellykket!`);
      } else {
        toast.warning(
          `${successCount} produkter oppdatert, ${failureCount} feilet`,
        );
      }
    },
    onError: (error: Error) => {
      toast.error(`Bulk oppdatering feilet: ${error.message}`);
    },
  });

  const bulkDeleteProducts = useCallback(
    async (productIds: string[]) => {
      const response = await api.delete<BulkDeleteProductsRequest['response']>(
        '/api/admin/products/bulk/delete',
        { data: { productIds } },
      );
      return response.data.data;
    },
    [api],
  );

  const bulkDeleteProductsMutation = useMutation({
    mutationFn: bulkDeleteProducts,
    onSuccess: (data) => {
      const { successCount, failureCount } = data;
      if (failureCount === 0) {
        toast.success(`${successCount} produkter slettet vellykket!`);
      } else {
        toast.warning(
          `${successCount} produkter slettet, ${failureCount} feilet`,
        );
      }
    },
    onError: (error: Error) => {
      toast.error(`Bulk sletting feilet: ${error.message}`);
    },
  });

  // Helper functions
  const generateSlug = useCallback((name: string): string => {
    return name
      .toLowerCase()
      .replace(/[æø]/g, 'o')
      .replace(/[å]/g, 'a')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }, []);

  const transformCSVToProducts = useCallback(
    (csvData: any[]): ProductRequestBody[] => {
      return csvData.map((row) => {
        const validatedRow = csvProductSchema.parse(row);

        const product: ProductRequestBody = {
          name: validatedRow.name,
          slug: validatedRow.slug || generateSlug(validatedRow.name),
          description: validatedRow.description,
          shortDescription: validatedRow.shortDescription,
          sku: validatedRow.sku,
          barcode: validatedRow.barcode,
          vat: validatedRow.vat,
          costPrice: validatedRow.costPrice,
          salePrice: validatedRow.salePrice,
          noOfUnits: validatedRow.noOfUnits,
          isActive: validatedRow.isActive,
          visibility: validatedRow.visibility,
          hasVolumeDiscount: validatedRow.hasVolumeDiscount,
        };

        // Add optional fields if they exist
        if (validatedRow.weight !== undefined) {
          product.weight = validatedRow.weight;
        }

        // Handle dimensions - only add if at least one dimension is provided
        const length = validatedRow['dimensions.length'];
        const width = validatedRow['dimensions.width'];
        const height = validatedRow['dimensions.height'];

        if (
          length !== undefined ||
          width !== undefined ||
          height !== undefined
        ) {
          product.dimensions = {
            length: length || 0,
            width: width || 0,
            height: height || 0,
          };
        }

        // Handle supplier - only add if at least one supplier field is provided
        const supplierNumber = validatedRow['supplier.number'];
        const supplierName = validatedRow['supplier.name'];
        const supplierLocation = validatedRow['supplier.location'];
        const supplierCountryOfOrigin =
          validatedRow['supplier.countryOfOrigin'];
        const supplierHsCode = validatedRow['supplier.hsCode'];

        if (
          supplierNumber ||
          supplierName ||
          supplierLocation ||
          supplierCountryOfOrigin ||
          supplierHsCode
        ) {
          product.supplier = {
            number: supplierNumber,
            name: supplierName,
            location: supplierLocation,
            countryOfOrigin: supplierCountryOfOrigin,
            hsCode: supplierHsCode,
          };
        }

        // Handle categories (comma-separated string to array)
        if (validatedRow.categories) {
          product.categories = validatedRow.categories
            .split(',')
            .map((cat: string) => cat.trim())
            .filter((cat: string) => cat.length > 0);
        }

        // Handle images (comma-separated string to array)
        if (validatedRow.images) {
          product.images = validatedRow.images
            .split(',')
            .map((img: string) => img.trim())
            .filter((img: string) => img.length > 0);
        }

        return product;
      });
    },
    [generateSlug],
  );

  // Event handlers
  const handleUploadComplete = useCallback((result: CsvParseResult) => {
    if (result.success && result.data) {
      setParsedData(result.data);
      toast.success(
        `CSV behandlet vellykket! ${result.validRows} produkter klare for import.`,
      );
    } else {
      setParsedData(null);
      if (result.errors.length > 0) {
        toast.error(
          `CSV behandling feilet. ${result.errors.length} feil funnet.`,
        );
      } else {
        toast.error('CSV behandling feilet. Sjekk filen og prøv igjen.');
      }
    }
  }, []);

  const handleUploadStart = useCallback(() => {
    setParsedData(null);
    setIsImporting(false);
  }, []);

  const handleImportProducts = useCallback(async () => {
    if (!parsedData) return;

    setIsImporting(true);
    try {
      const products = transformCSVToProducts(parsedData);
      const result = await bulkCreateProductsMutation.mutateAsync(products);
      return { success: true, result };
    } catch (error) {
      console.error('Import failed:', error);
      return { success: false, error };
    } finally {
      setIsImporting(false);
    }
  }, [parsedData, transformCSVToProducts, bulkCreateProductsMutation]);

  const handleValidationComplete = useCallback(
    (result: CsvParseResult, operation: 'add' | 'update') => {
      if (result.success && result.data) {
        setParsedData(result.data);
        toast.success(
          `CSV validert! ${result.validRows} produkter klare for ${
            operation === 'add' ? 'opprettelse' : 'oppdatering'
          }.`,
        );
      } else {
        setParsedData(null);
        toast.error('CSV validering feilet. Sjekk feilene og prøv igjen.');
      }
    },
    [],
  );

  return {
    // Configuration
    csvConfig,

    // State
    parsedData,
    isImporting,

    // Mutations
    bulkCreateProductsMutation,
    bulkUpdateProductsMutation,
    bulkDeleteProductsMutation,

    // Helper functions
    transformCSVToProducts,
    generateSlug,

    // Event handlers
    handleUploadComplete,
    handleUploadStart,
    handleImportProducts,
    handleValidationComplete,
  };
}
