'use client';

// Icons
import { Info, Scan, Keyboard } from '@repo/ui/lib/icons';

// Components
import { Card, CardContent } from '@repo/ui/components/base/card';

export function ScannerInfo() {
  return (
    <Card className="border-[var(--baladi-border)] bg-blue-50/50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h4 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-blue-900">
              Strekkodeskanning aktivert
            </h4>
            <div className="space-y-1 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <Scan className="h-4 w-4" />
                <span>
                  Skann en strekkode for automatisk å legge til produktet
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Keyboard className="h-4 w-4" />
                <span>
                  Skanningen fungerer med alle standard strekkodeleser
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
