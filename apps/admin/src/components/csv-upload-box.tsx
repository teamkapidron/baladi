'use client';

// Node Modules
import { memo, useCallback, useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  Download,
  AlertTriangle,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Alert, AlertDescription } from '@repo/ui/components/base/alert';

// Generic interfaces for CSV upload
export interface CsvValidationError {
  row: number;
  column: string;
  value: string;
  error: string;
}

export interface CsvParseResult {
  success: boolean;
  data?: any[];
  errors: CsvValidationError[];
  missingColumns: string[];
  totalRows: number;
  validRows: number;
}

export interface CsvUploadConfig {
  requiredColumns: string[];
  allColumns?: string[];
  templateData?: Record<string, string>;
  validateRow?: (row: any, rowIndex: number) => CsvValidationError[];
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string[]; // defaults to ['.csv']
}

interface CsvUploadBoxProps {
  config: CsvUploadConfig;
  onUploadComplete?: (result: CsvParseResult) => void;
  onUploadStart?: () => void;
  title?: string;
  description?: string;
  templateFileName?: string;
}

function CsvUploadBox({
  config,
  onUploadComplete,
  onUploadStart,
  title = 'Last opp CSV-fil',
  description = 'Last opp en CSV-fil for bulk import',
  templateFileName = 'template.csv',
}: CsvUploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [parseResult, setParseResult] = useState<CsvParseResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadKey, setUploadKey] = useState(0); // Key to force re-render of file input

  const {
    requiredColumns,
    allColumns = requiredColumns,
    templateData = {},
    validateRow,
    maxFileSize = 10,
    acceptedFileTypes = ['.csv'],
  } = config;

  // Cleanup function to reset all states
  const cleanup = useCallback(() => {
    setParseResult(null);
    setFileName('');
    setIsUploading(false);
    setIsDragOver(false);
    setUploadKey((prev) => prev + 1); // Force file input re-render
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const downloadTemplate = useCallback(() => {
    try {
      // Create CSV template with headers and example data
      const headers = allColumns.join(',');
      const exampleValues = allColumns.map(
        (column) => templateData[column] || '',
      );
      const exampleRow = exampleValues.join(',');

      const csvContent = `${headers}\n${exampleRow}`;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      // Create and trigger download link without DOM manipulation
      const link = document.createElement('a');
      link.href = url;
      link.download = templateFileName;

      // Trigger download directly
      link.click();

      // Clean up the URL object
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  }, [allColumns, templateData, templateFileName]);

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedFileTypes.includes(fileExtension)) {
        return `Kun ${acceptedFileTypes.join(', ')} filer er tillatt`;
      }

      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxFileSize) {
        return `Filen er for stor. Maksimal størrelse er ${maxFileSize}MB`;
      }

      return null;
    },
    [maxFileSize, acceptedFileTypes],
  );

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
              const missingRequired = requiredColumns.filter(
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
                if (validateRow) {
                  const rowErrors = validateRow(row, index);
                  if (rowErrors.length > 0) {
                    parseResult.errors.push(...rowErrors);
                  } else {
                    validatedData.push(row);
                    parseResult.validRows++;
                  }
                } else {
                  // If no validation function, just include the row
                  validatedData.push(row);
                  parseResult.validRows++;
                }
              });

              parseResult.data = validatedData;

              // Success criteria:
              // 1. No missing required columns
              // 2. No validation errors (all rows passed validation)
              // 3. At least one valid row exists
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
    [requiredColumns, validateRow],
  );

  const handleFileUpload = useCallback(
    async (file: File) => {
      // Prevent multiple uploads
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
      onUploadStart?.();

      try {
        const result = await parseAndValidateCSV(file);
        setParseResult(result);
        onUploadComplete?.(result);
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
      } finally {
        setIsUploading(false);
      }
    },
    [
      isUploading,
      validateFile,
      parseAndValidateCSV,
      onUploadStart,
      onUploadComplete,
    ],
  );

  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current && !isUploading) {
      fileInputRef.current.click();
    }
  }, [isUploading]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (isUploading) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file) {
          // Check if it's an accepted file type before processing
          const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
          if (acceptedFileTypes.includes(fileExtension)) {
            handleFileUpload(file);
          } else {
            setParseResult({
              success: false,
              errors: [
                {
                  row: 0,
                  column: 'File',
                  value: file.name,
                  error: `Kun ${acceptedFileTypes.join(', ')} filer er tillatt`,
                },
              ],
              missingColumns: [],
              totalRows: 0,
              validRows: 0,
            });
          }
        }
      }
    },
    [isUploading, handleFileUpload, acceptedFileTypes],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isUploading) return;

      // Only set drag over if it's a file being dragged
      if (e.dataTransfer.types.includes('Files')) {
        setIsDragOver(true);
      }
    },
    [isUploading],
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Only set drag leave if we're actually leaving the drop zone
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isUploading) return;

      if (e.dataTransfer.types.includes('Files')) {
        setIsDragOver(true);
      }
    },
    [isUploading],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && !isUploading) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload, isUploading],
  );

  const reset = useCallback(() => {
    cleanup();
  }, [cleanup]);

  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center space-x-3">
        <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
          <Upload className="h-5 w-5 text-[var(--baladi-primary)]" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
            {title}
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            {description}
          </p>
        </div>
      </div>

      {/* Upload Area */}
      {!parseResult && (
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            onClick={triggerFileInput}
            className={`flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
              isDragOver
                ? 'bg-[var(--baladi-primary)]/10 border-[var(--baladi-primary)]'
                : isUploading
                  ? 'bg-[var(--baladi-primary)]/5 cursor-not-allowed border-[var(--baladi-primary)]'
                  : 'hover:bg-[var(--baladi-primary)]/5 border-[var(--baladi-border)] bg-gray-50 hover:border-[var(--baladi-primary)]'
            }`}
          >
            <div className="text-center">
              {isUploading ? (
                <>
                  <Loader2 className="mx-auto h-12 w-12 animate-spin text-[var(--baladi-primary)]" />
                  <p className="mt-4 text-lg font-medium text-[var(--baladi-primary)]">
                    Behandler CSV-fil...
                  </p>
                  {fileName && (
                    <p className="mt-2 text-sm text-[var(--baladi-gray)]">
                      {fileName}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <FileText className="mx-auto h-12 w-12 text-[var(--baladi-gray)]" />
                  <p className="mt-4 text-lg font-medium text-[var(--baladi-primary)]">
                    {isDragOver
                      ? 'Slipp filen her'
                      : `Dra og slipp ${acceptedFileTypes.join('/')} fil her eller klikk for å velge`}
                  </p>
                  <p className="mt-2 text-sm text-[var(--baladi-gray)]">
                    Maks {maxFileSize}MB • Kun {acceptedFileTypes.join(', ')}{' '}
                    filer
                  </p>
                </>
              )}
            </div>
          </div>

          <input
            key={uploadKey} // Force re-render with new key
            ref={fileInputRef}
            type="file"
            accept={acceptedFileTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isUploading}
            aria-label="CSV fil upload"
          />

          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={downloadTemplate}
              className="border-[var(--baladi-border)] text-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white"
              disabled={isUploading}
            >
              <Download className="mr-2 h-4 w-4" />
              Last ned mal
            </Button>
          </div>
        </div>
      )}

      {/* Results */}
      {parseResult && (
        <div className="space-y-4">
          {/* Summary */}
          <div
            className={`rounded-lg border p-4 ${
              parseResult.success
                ? 'border-[var(--baladi-success)]/20 bg-[var(--baladi-success)]/5'
                : 'border-[var(--baladi-error)]/20 bg-[var(--baladi-error)]/5'
            }`}
          >
            <div className="flex items-center gap-3">
              {parseResult.success ? (
                <CheckCircle className="h-6 w-6 text-[var(--baladi-success)]" />
              ) : (
                <XCircle className="h-6 w-6 text-[var(--baladi-error)]" />
              )}
              <div>
                <h3
                  className={`font-[family-name:var(--font-sora)] font-semibold ${
                    parseResult.success
                      ? 'text-[var(--baladi-success)]'
                      : 'text-[var(--baladi-error)]'
                  }`}
                >
                  {parseResult.success
                    ? 'CSV behandlet vellykket!'
                    : 'CSV behandling feilet'}
                </h3>
                <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  <span>Totale rader: {parseResult.totalRows}</span>
                  <span className="mx-2">•</span>
                  <span>Gyldige rader: {parseResult.validRows}</span>
                  {parseResult.errors.length > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-[var(--baladi-error)]">
                        Feil: {parseResult.errors.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Missing Columns */}
          {parseResult.missingColumns.length > 0 && (
            <Alert className="border-[var(--baladi-warning)]/20 bg-[var(--baladi-warning)]/5">
              <AlertTriangle className="h-4 w-4 text-[var(--baladi-warning)]" />
              <AlertDescription className="font-[family-name:var(--font-dm-sans)]">
                <strong>Manglende påkrevde kolonner:</strong>{' '}
                {parseResult.missingColumns.join(', ')}
              </AlertDescription>
            </Alert>
          )}

          {/* Errors */}
          {parseResult.errors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[var(--baladi-error)]" />
                <h4 className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-error)]">
                  Valideringsfeil ({parseResult.errors.length})
                </h4>
              </div>

              <div className="max-h-64 overflow-y-auto rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)]">
                {parseResult.errors.slice(0, 50).map((error, index) => (
                  <div
                    key={`error-${uploadKey}-${index}-${error.row}-${error.column}`}
                    className="border-b border-[var(--baladi-border)] p-3 last:border-b-0"
                  >
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm">
                      <div className="flex items-center gap-2 text-[var(--baladi-error)]">
                        <span className="font-medium">
                          Rad {error.row} • Kolonne: {error.column}
                        </span>
                      </div>
                      <div className="mt-1 text-[var(--baladi-gray)]">
                        Verdi: "{error.value}"
                      </div>
                      <div className="mt-1 text-[var(--baladi-dark)]">
                        {error.error}
                      </div>
                    </div>
                  </div>
                ))}
                {parseResult.errors.length > 50 && (
                  <div className="p-3 text-center text-sm text-[var(--baladi-gray)]">
                    ... og {parseResult.errors.length - 50} flere feil
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={reset}
              className="border-[var(--baladi-border)] text-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white"
            >
              Last opp ny fil
            </Button>

            {parseResult.success &&
              parseResult.data &&
              parseResult.data.length > 0 && (
                <Button
                  type="button"
                  className="bg-[var(--baladi-primary)] text-white hover:bg-[var(--baladi-primary-dark)]"
                  onClick={() => {
                    console.log('Processing data:', parseResult.data);
                  }}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Behandler...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Process {parseResult.data.length} items
                    </>
                  )}
                </Button>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(CsvUploadBox);
