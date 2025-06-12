'use client';

// Node Modules
import { useRouter } from 'next/navigation';
import {
  Package,
  Upload,
  CheckCircle,
  AlertTriangle,
  FileText,
  ArrowLeft,
} from '@repo/ui/lib/icons';

// Components
import CsvUploadBox from '@/components/csv-upload-box';
import { Button } from '@repo/ui/components/base/button';
import { Alert, AlertDescription } from '@repo/ui/components/base/alert';

// Hooks
import { useBulkProduct } from '@/hooks/useBulkProduct';

export default function BulkAddProducts() {
  const router = useRouter();
  const {
    csvConfig,
    parsedData,
    isImporting,
    bulkCreateProductsMutation,
    handleUploadComplete,
    handleUploadStart,
    handleImportProducts,
  } = useBulkProduct();

  const handleImport = async () => {
    const result = await handleImportProducts();

    // Navigate back if completely successful
    if (result?.success && result.result?.data?.failureCount === 0) {
      router.push('/dashboard/products');
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-[var(--baladi-primary)] via-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-6 shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/20"></div>
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-white/5"></div>
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-white lg:text-2xl">
                  Bulk Legg til Produkter
                </h1>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                  Last opp en CSV-fil for å legge til flere produkter samtidig
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => router.push('/dashboard/products')}
              className="border-white/20 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake til Produkter
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--baladi-accent)] via-white/50 to-[var(--baladi-accent)]"></div>
      </div>

      {/* Instructions */}
      <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-[var(--baladi-info)]/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <FileText className="h-4 w-4 text-[var(--baladi-info)]" />
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
            Instruksjoner
          </h3>
        </div>

        <div className="space-y-3 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              1
            </span>
            <span>
              Last ned CSV-malen ved å klikke på "Last ned mal" knappen nedenfor
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              2
            </span>
            <span>
              Fyll ut CSV-filen med produktinformasjon. Påkrevde felt: name,
              vat, costPrice, salePrice, noOfUnits, isActive, visibility
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              3
            </span>
            <span>Last opp CSV-filen for validering og forhåndsvisning</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              4
            </span>
            <span>
              Rett opp eventuelle feil og last opp på nytt om nødvendig
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              5
            </span>
            <span>Klikk "Importer produkter" for å fullføre importen</span>
          </div>
        </div>
      </div>

      {/* Upload Component */}
      <CsvUploadBox
        config={csvConfig}
        onUploadComplete={handleUploadComplete}
        onUploadStart={handleUploadStart}
        title="Last opp produkter fra CSV"
        description="Last opp en CSV-fil med produktdata for bulk import"
        templateFileName="bulk_products_template.csv"
      />

      {/* Import Summary & Actions */}
      {parsedData && (
        <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-[var(--baladi-success)]/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <CheckCircle className="h-4 w-4 text-[var(--baladi-success)]" />
            </div>
            <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
              Klar for Import
            </h3>
          </div>

          <div className="bg-[var(--baladi-success)]/5 border-[var(--baladi-success)]/20 mb-6 rounded-lg border p-4">
            <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              <strong className="text-[var(--baladi-success)]">
                {parsedData.length} produkter
              </strong>{' '}
              er validert og klare for import.
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleImport}
              disabled={isImporting || bulkCreateProductsMutation.isPending}
              className="hover:bg-[var(--baladi-success)]/90 bg-[var(--baladi-success)] text-white"
            >
              {isImporting || bulkCreateProductsMutation.isPending ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Importerer...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Importer {parsedData.length} Produkter
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Import Results */}
      {bulkCreateProductsMutation.data && (
        <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                bulkCreateProductsMutation.data.data.failureCount === 0
                  ? 'bg-[var(--baladi-success)]/10'
                  : 'bg-[var(--baladi-warning)]/10'
              }`}
            >
              {bulkCreateProductsMutation.data.data.failureCount === 0 ? (
                <CheckCircle className="h-4 w-4 text-[var(--baladi-success)]" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-[var(--baladi-warning)]" />
              )}
            </div>
            <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
              Import Resultater
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-[var(--baladi-success)]/5 border-[var(--baladi-success)]/20 rounded-lg border p-4">
              <div className="font-[family-name:var(--font-dm-sans)] text-sm">
                <div className="text-[var(--baladi-gray)]">Vellykkede</div>
                <div className="text-2xl font-bold text-[var(--baladi-success)]">
                  {bulkCreateProductsMutation.data.data.successCount}
                </div>
              </div>
            </div>

            {bulkCreateProductsMutation.data.data.failureCount > 0 && (
              <div className="bg-[var(--baladi-error)]/5 border-[var(--baladi-error)]/20 rounded-lg border p-4">
                <div className="font-[family-name:var(--font-dm-sans)] text-sm">
                  <div className="text-[var(--baladi-gray)]">Feilet</div>
                  <div className="text-2xl font-bold text-[var(--baladi-error)]">
                    {bulkCreateProductsMutation.data.data.failureCount}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Details */}
          {bulkCreateProductsMutation.data.data.errors.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-3 font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-error)]">
                Import Feil
              </h4>
              <div className="max-h-48 overflow-y-auto rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)]">
                {bulkCreateProductsMutation.data.data.errors.map(
                  (error: any, index: number) => (
                    <div
                      key={index}
                      className="border-b border-[var(--baladi-border)] p-3 last:border-b-0"
                    >
                      <div className="font-[family-name:var(--font-dm-sans)] text-sm">
                        <div className="font-medium text-[var(--baladi-error)]">
                          Rad {error.index + 1}:{' '}
                          {error.product.name || 'Ukjent produkt'}
                        </div>
                        <div className="mt-1 text-[var(--baladi-gray)]">
                          {error.error}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Created Products */}
          {bulkCreateProductsMutation.data.data.createdProducts.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-3 font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-success)]">
                Opprettede Produkter
              </h4>
              <div className="bg-[var(--baladi-success)]/5 max-h-48 overflow-y-auto rounded-lg border border-[var(--baladi-border)]">
                {bulkCreateProductsMutation.data.data.createdProducts
                  .slice(0, 10)
                  .map((product: any, index: number) => (
                    <div
                      key={index}
                      className="border-[var(--baladi-success)]/20 border-b p-3 last:border-b-0"
                    >
                      <div className="font-[family-name:var(--font-dm-sans)] text-sm">
                        <div className="font-medium text-[var(--baladi-dark)]">
                          {product.name}
                        </div>
                        <div className="text-[var(--baladi-gray)]">
                          Slug: {product.slug}
                        </div>
                      </div>
                    </div>
                  ))}
                {bulkCreateProductsMutation.data.data.createdProducts.length >
                  10 && (
                  <div className="p-3 text-center text-sm text-[var(--baladi-gray)]">
                    ... og{' '}
                    {bulkCreateProductsMutation.data.data.createdProducts
                      .length - 10}{' '}
                    flere
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {bulkCreateProductsMutation.error && (
        <Alert className="border-[var(--baladi-error)]/20 bg-[var(--baladi-error)]/5">
          <AlertTriangle className="h-4 w-4 text-[var(--baladi-error)]" />
          <AlertDescription className="font-[family-name:var(--font-dm-sans)]">
            <strong>Import feilet:</strong>{' '}
            {String(bulkCreateProductsMutation.error)}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
