'use client';

// Icons
import { Info, Scan, Keyboard, Pause } from '@repo/ui/lib/icons';

// Components
import { Card, CardContent } from '@repo/ui/components/base/card';

interface ScannerInfoProps {
  isInputFocused?: boolean;
}

export function ScannerInfo({ isInputFocused = false }: ScannerInfoProps) {
  return (
    <Card
      className={`border-[var(--baladi-border)] ${
        isInputFocused ? 'bg-orange-50/50' : 'bg-blue-50/50'
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {isInputFocused ? (
              <Pause className="h-5 w-5 text-orange-600" />
            ) : (
              <Info className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <div className="space-y-2">
            <h4
              className={`font-[family-name:var(--font-sora)] text-sm font-semibold ${
                isInputFocused ? 'text-orange-900' : 'text-blue-900'
              }`}
            >
              {isInputFocused
                ? 'Strekkodeskanning pausert'
                : 'Strekkodeskanning aktivert'}
            </h4>
            <div
              className={`space-y-1 text-sm ${
                isInputFocused ? 'text-orange-700' : 'text-blue-700'
              }`}
            >
              {isInputFocused ? (
                <div className="flex items-center gap-2">
                  <Keyboard className="h-4 w-4" />
                  <span>Skanning er pausert mens du skriver i et felt</span>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
