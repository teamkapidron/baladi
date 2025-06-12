// Node Modules
import { useCallback, useState, useRef } from 'react';
import { toast } from '@repo/ui/lib/sonner';
import { z } from '@repo/ui/lib/form';
import Papa from 'papaparse';

// Hooks
import { useRequest } from '@/hooks/useRequest';

import type {
  CsvConfigType,
  CsvValidationError,
  CsvParseResult,
} from './types';

export function useBulk(csvConfig: CsvConfigType, csvProductSchema: z.ZodType) {
  const api = useRequest();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [parseResult, setParseResult] = useState<CsvParseResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [uploadKey, setUploadKey] = useState(0);

  // Product-specific CSV validation function
  function validateProductRow(
    row: any,
    rowIndex: number,
  ): CsvValidationError[] {
    const errors: CsvValidationError[] = [];

    try {
      csvProductSchema.parse(row);
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
  }

  // File validation
  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!csvConfig.acceptedFileTypes?.includes(fileExtension)) {
        return `Kun ${csvConfig.acceptedFileTypes?.join(', ')} filer er tillatt`;
      }

      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > (csvConfig.maxFileSize || 10)) {
        return `Filen er for stor. Maksimal størrelse er ${csvConfig.maxFileSize || 10}MB`;
      }

      return null;
    },
    [csvConfig.acceptedFileTypes, csvConfig.maxFileSize],
  );

  // CSV parsing and validation
  const parseAndValidateCSV = useCallback(
    async (file: File): Promise<CsvParseResult> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const csvString = e.target?.result as string;
          Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            complete: (results: Papa.ParseResult<any>) => {
              const parseResult: CsvParseResult = {
                success: false,
                data: [],
                errors: [],
                missingColumns: [],
                totalRows: results.data?.length || 0,
                validRows: 0,
              };

              // Check for parsing errors
              if (results.errors && results.errors.length > 0) {
                parseResult.errors.push({
                  row: 0,
                  column: 'File',
                  value: '',
                  error: `CSV parsing feil: ${results.errors[0]?.message}`,
                });
                resolve(parseResult);
                return;
              }

              // Check if we have data
              if (!results.data || results.data.length === 0) {
                parseResult.errors.push({
                  row: 0,
                  column: 'File',
                  value: '',
                  error:
                    'CSV-filen er tom eller inneholder ingen gyldige rader',
                });
                resolve(parseResult);
                return;
              }

              // Get the headers from the first row
              const headers = Object.keys(results.data[0] as object);

              // Check for missing required columns
              const missingRequired = csvConfig.requiredColumns.filter(
                (col) => !headers.includes(col),
              );
              if (missingRequired.length > 0) {
                parseResult.missingColumns = missingRequired;
                parseResult.errors.push({
                  row: 0,
                  column: 'Headers',
                  value: '',
                  error: `Mangler påkrevde kolonner: ${missingRequired.join(', ')}`,
                });
              }

              // Validate each row if validation function is provided
              const validatedData: any[] = [];

              results.data.forEach((row: any, index: number) => {
                const errors = validateProductRow(row, index);
                if (errors.length > 0) {
                  parseResult.errors.push(...errors);
                }
                validatedData.push(row);
                parseResult.validRows++;
              });

              parseResult.data = validatedData;

              // Success criteria
              parseResult.success =
                parseResult.missingColumns.length === 0 &&
                parseResult.errors.length === 0 &&
                parseResult.validRows > 0;

              resolve(parseResult);
            },
            error: (error: any) => {
              reject(new Error(`CSV parsing error: ${error.message}`));
            },
          });
        };

        reader.onerror = () => {
          reject(new Error('Feil ved lesing av fil'));
        };

        reader.readAsText(file, 'UTF-8');
      });
    },
    [csvConfig],
  );

  // File upload handler
  const handleFileUpload = useCallback(
    async (file: File) => {
      if (isUploading) return;

      const fileError = validateFile(file);
      if (fileError) {
        setParseResult({
          success: false,
          errors: [
            {
              row: 0,
              column: 'File',
              value: file.name,
              error: fileError,
            },
          ],
          missingColumns: [],
          totalRows: 0,
          validRows: 0,
        });
        return;
      }

      setFileName(file.name);
      setIsUploading(true);
      setParseResult(null);

      try {
        const result = await parseAndValidateCSV(file);
        setParseResult(result);

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
      } catch (error) {
        setParseResult({
          success: false,
          errors: [
            {
              row: 0,
              column: 'Processing',
              value: '',
              error: `Feil ved behandling av fil: ${String(error)}`,
            },
          ],
          missingColumns: [],
          totalRows: 0,
          validRows: 0,
        });
        setParsedData(null);
        toast.error('CSV behandling feilet. Sjekk filen og prøv igjen.');
      } finally {
        setIsUploading(false);
      }
    },
    [isUploading, validateFile, parseAndValidateCSV],
  );

  // File input trigger
  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current && !isUploading) {
      fileInputRef.current.click();
    }
  }, [isUploading]);

  // Template download
  const downloadTemplate = useCallback(
    (templateFileName = 'template.csv') => {
      try {
        // Create CSV template with headers and example data
        const headers =
          csvConfig.allColumns?.join(',') ||
          csvConfig.requiredColumns.join(',');
        const exampleValues = (
          csvConfig.allColumns || csvConfig.requiredColumns
        ).map((column) => csvConfig.templateData?.[column] || '');
        const exampleRow = exampleValues.join(',');

        const csvContent = `${headers}\n${exampleRow}`;
        const blob = new Blob([csvContent], {
          type: 'text/csv;charset=utf-8;',
        });
        const url = URL.createObjectURL(blob);

        // Create and trigger download link
        const link = document.createElement('a');
        link.href = url;
        link.download = templateFileName;
        link.click();

        // Clean up the URL object
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 100);
      } catch (error) {
        console.error('Error downloading template:', error);
        toast.error('Feil ved nedlasting av mal');
      }
    },
    [csvConfig],
  );

  // Reset/cleanup function
  const resetUpload = useCallback(() => {
    setParseResult(null);
    setFileName('');
    setIsUploading(false);
    setParsedData(null);
    setUploadKey((prev) => prev + 1);
  }, []);

  // Handle file input change
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && !isUploading) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload, isUploading],
  );

  // Legacy event handlers (for backward compatibility)
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
    isUploading,
    parseResult,
    fileName,
    uploadKey,

    // Refs
    fileInputRef,

    // Core functions
    handleFileUpload,
    triggerFileInput,
    downloadTemplate,
    resetUpload,
    handleFileInputChange,

    // Legacy event handlers (for backward compatibility)
    handleUploadComplete,
    handleUploadStart,
    handleValidationComplete,
  };
}
