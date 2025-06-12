'use client';

// Node Modules
import { useRouter } from 'next/navigation';
import {
  Edit,
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

export default function BulkUpdateProducts() {
  const router = useRouter();
  const { parsedData, handleValidationComplete, handleUploadStart } =
    useBulkProduct();

  const handleUploadComplete = (result: any) => {
    handleValidationComplete(result, 'update');
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
                <Edit className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-white lg:text-2xl">
                  Bulk Oppdater Produkter
                </h1>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                  Last opp en CSV-fil for å oppdatere flere produkter samtidig
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
            Instruksjoner for Bulk Oppdatering
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
              Fyll ut CSV-filen med produktinformasjon. <strong>Merk:</strong>{' '}
              Du må inkludere et ID eller SKU-felt for å identifisere
              eksisterende produkter
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
        </div>

        <Alert className="border-[var(--baladi-warning)]/20 bg-[var(--baladi-warning)]/5 mt-4">
          <AlertTriangle className="h-4 w-4 text-[var(--baladi-warning)]" />
          <AlertDescription className="font-[family-name:var(--font-dm-sans)]">
            <strong>Viktig:</strong> Bulk oppdatering funksjonalitet er under
            utvikling. For nå kan du bruke denne siden for å validere CSV-filer
            for fremtidige oppdateringer.
          </AlertDescription>
        </Alert>
      </div>

      {/* Upload Component */}
      <CsvUploadBox
        onUploadComplete={handleUploadComplete}
        onUploadStart={handleUploadStart}
        maxFileSize={10}
      />

      {/* Validation Results */}
      {parsedData && (
        <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-[var(--baladi-success)]/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <CheckCircle className="h-4 w-4 text-[var(--baladi-success)]" />
            </div>
            <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
              Validering Fullført
            </h3>
          </div>

          <div className="bg-[var(--baladi-success)]/5 border-[var(--baladi-success)]/20 mb-6 rounded-lg border p-4">
            <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              <strong className="text-[var(--baladi-success)]">
                {parsedData.length} produkter
              </strong>{' '}
              er validert og klar for fremtidig oppdatering.
            </div>
          </div>

          <Alert className="border-[var(--baladi-info)]/20 bg-[var(--baladi-info)]/5">
            <FileText className="h-4 w-4 text-[var(--baladi-info)]" />
            <AlertDescription className="font-[family-name:var(--font-dm-sans)]">
              CSV-filen din er gyldig formatert. Bulk oppdatering funksjonalitet
              vil være tilgjengelig snart.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
