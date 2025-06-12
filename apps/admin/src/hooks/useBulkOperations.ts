// Node Modules
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';
import { z } from '@repo/ui/lib/form';

// Types
import type {
  CsvValidationError,
  CsvParseResult,
  CsvUploadConfig,
} from '@/components/csv-upload-box';

// Generic interfaces
export interface BulkOperationConfig<TSchema extends z.ZodType> {
  schema: TSchema;
  requiredColumns: string[];
  allColumns: string[];
  templateData: Record<string, string>;
  templateFileName?: string;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
}

export interface BulkOperationCallbacks<TData, TResult> {
  transformData?: (csvData: z.infer<any>[]) => TData[];
  onUploadComplete?: (result: CsvParseResult) => void;
  onUploadStart?: () => void;
  onImportComplete?: (result: TResult) => void;
  onImportError?: (error: Error) => void;
}

export interface BulkMutationFunctions<
  TData,
  TCreateResult = any,
  TUpdateResult = any,
  TDeleteResult = any,
> {
  createMutation?: (data: TData[]) => Promise<TCreateResult>;
  updateMutation?: (
    data: Array<{ _id: string; updates: Partial<TData> }>,
  ) => Promise<TUpdateResult>;
  deleteMutation?: (ids: string[]) => Promise<TDeleteResult>;
}

export function useBulkOperations<
  TSchema extends z.ZodType,
  TData = z.infer<TSchema>,
  TCreateResult = any,
  TUpdateResult = any,
  TDeleteResult = any,
>(
  config: BulkOperationConfig<TSchema>,
  callbacks?: BulkOperationCallbacks<
    TData,
    TCreateResult | TUpdateResult | TDeleteResult
  >,
  mutations?: BulkMutationFunctions<
    TData,
    TCreateResult,
    TUpdateResult,
    TDeleteResult
  >,
) {
  const [parsedData, setParsedData] = useState<TData[] | null>(null);
  const [csvParseResult, setCsvParseResult] = useState<CsvParseResult | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    schema,
    requiredColumns,
    allColumns,
    templateData,
    templateFileName = 'template.csv',
    maxFileSize = 10,
    acceptedFileTypes = ['.csv'],
  } = config;

  // Validation function using the provided schema
  const validateRow = useCallback(
    (row: any, rowIndex: number): CsvValidationError[] => {
      const errors: CsvValidationError[] = [];

      try {
        schema.parse(row);
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            errors.push({
              row: rowIndex + 1,
              column: err.path.join('.') || 'unknown',
              value: String(row[err.path[0] as keyof typeof row] || ''),
              error: err.message,
            });
          });
        } else {
          errors.push({
            row: rowIndex + 1,
            column: 'unknown',
            value: '',
            error: String(error),
          });
        }
      }

      return errors;
    },
    [schema],
  );

  // CSV upload configuration
  const csvConfig: CsvUploadConfig = {
    requiredColumns,
    allColumns,
    templateData,
    validateRow,
    maxFileSize,
    acceptedFileTypes,
  };

  // Transform CSV data to typed data
  const transformCSVData = useCallback(
    (csvData: any[]): TData[] => {
      if (callbacks?.transformData) {
        return callbacks.transformData(csvData);
      }

      // Default transformation using schema
      return csvData.map((row) => schema.parse(row));
    },
    [schema, callbacks],
  );

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: TData[]) => {
      if (!mutations?.createMutation) {
        throw new Error('Create mutation not provided');
      }
      return mutations.createMutation(data);
    },
    onSuccess: (result) => {
      toast.success('Bulk opprettelse vellykket!');
      callbacks?.onImportComplete?.(result);
    },
    onError: (error: Error) => {
      toast.error(`Bulk opprettelse feilet: ${error.message}`);
      callbacks?.onImportError?.(error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (
      data: Array<{ _id: string; updates: Partial<TData> }>,
    ) => {
      if (!mutations?.updateMutation) {
        throw new Error('Update mutation not provided');
      }
      return mutations.updateMutation(data);
    },
    onSuccess: (result) => {
      toast.success('Bulk oppdatering vellykket!');
      callbacks?.onImportComplete?.(result);
    },
    onError: (error: Error) => {
      toast.error(`Bulk oppdatering feilet: ${error.message}`);
      callbacks?.onImportError?.(error);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      if (!mutations?.deleteMutation) {
        throw new Error('Delete mutation not provided');
      }
      return mutations.deleteMutation(ids);
    },
    onSuccess: (result) => {
      toast.success('Bulk sletting vellykket!');
      callbacks?.onImportComplete?.(result);
    },
    onError: (error: Error) => {
      toast.error(`Bulk sletting feilet: ${error.message}`);
      callbacks?.onImportError?.(error);
    },
  });

  // Event handlers
  const handleUploadComplete = useCallback(
    (result: CsvParseResult) => {
      setCsvParseResult(result);

      if (result.success && result.data) {
        try {
          const transformedData = transformCSVData(result.data);
          setParsedData(transformedData);
          toast.success(
            `CSV behandlet vellykket! ${result.validRows} elementer klare for import.`,
          );
        } catch (error) {
          toast.error(`Feil ved transformering av data: ${String(error)}`);
          setParsedData(null);
        }
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

      callbacks?.onUploadComplete?.(result);
    },
    [transformCSVData, callbacks],
  );

  const handleUploadStart = useCallback(() => {
    setParsedData(null);
    setCsvParseResult(null);
    setIsProcessing(false);
    callbacks?.onUploadStart?.();
  }, [callbacks]);

  const handleCreateItems = useCallback(async () => {
    if (!parsedData) return { success: false, error: 'No data to import' };

    setIsProcessing(true);
    try {
      const result = await createMutation.mutateAsync(parsedData);
      return { success: true, result };
    } catch (error) {
      console.error('Create failed:', error);
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  }, [parsedData, createMutation]);

  const handleUpdateItems = useCallback(
    async (updates: Array<{ _id: string; updates: Partial<TData> }>) => {
      setIsProcessing(true);
      try {
        const result = await updateMutation.mutateAsync(updates);
        return { success: true, result };
      } catch (error) {
        console.error('Update failed:', error);
        return { success: false, error };
      } finally {
        setIsProcessing(false);
      }
    },
    [updateMutation],
  );

  const handleDeleteItems = useCallback(
    async (ids: string[]) => {
      setIsProcessing(true);
      try {
        const result = await deleteMutation.mutateAsync(ids);
        return { success: true, result };
      } catch (error) {
        console.error('Delete failed:', error);
        return { success: false, error };
      } finally {
        setIsProcessing(false);
      }
    },
    [deleteMutation],
  );

  const reset = useCallback(() => {
    setParsedData(null);
    setCsvParseResult(null);
    setIsProcessing(false);
  }, []);

  return {
    // Configuration
    csvConfig,

    // State
    parsedData,
    csvParseResult,
    isProcessing,

    // Mutations
    createMutation,
    updateMutation,
    deleteMutation,

    // Utility functions
    transformCSVData,
    validateRow,

    // Event handlers
    handleUploadComplete,
    handleUploadStart,
    handleCreateItems,
    handleUpdateItems,
    handleDeleteItems,
    reset,
  };
}
