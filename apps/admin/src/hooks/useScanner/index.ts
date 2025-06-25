// Node Modules
import { useCallback, useEffect, useRef } from 'react';
import { toast } from '@repo/ui/lib/sonner';
import { useMutation } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetProductByBarcodeRequest,
  QuickSearchProduct,
} from '@/hooks/useProduct/types';

interface UseScannerProps {
  onProductScanned: (product: QuickSearchProduct) => void;
  isEnabled?: boolean;
}

export function useScanner({
  onProductScanned,
  isEnabled = true,
}: UseScannerProps) {
  const api = useRequest();
  const scanBufferRef = useRef<string>('');
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getProductByBarcode = useCallback(
    async (barcode: string) => {
      const response = await api.get<GetProductByBarcodeRequest['response']>(
        `/product/barcode/${barcode}`,
      );
      return response.data.data;
    },
    [api],
  );

  const scanProductMutation = useMutation({
    mutationFn: getProductByBarcode,
    onSuccess: (product) => {
      onProductScanned(product.product);
      toast.success(`Produkt lagt til: ${product.product.name}`);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        'Kunne ikke finne produkt med denne strekkoden';
      toast.error(errorMessage);
    },
  });

  const processScan = useCallback(
    (scannedCode: string) => {
      if (scannedCode && scannedCode.length >= 5) {
        // Minimum barcode length
        scanProductMutation.mutate(scannedCode);
      }
    },
    [scanProductMutation],
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!isEnabled) return;

      // Clear any existing timeout
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }

      // Handle Enter key (end of barcode scan)
      if (event.key === 'Enter') {
        event.preventDefault();
        const scannedCode = scanBufferRef.current.trim();
        if (scannedCode) {
          processScan(scannedCode);
        }
        scanBufferRef.current = '';
        return;
      }

      // Handle printable characters
      if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey
      ) {
        event.preventDefault();
        scanBufferRef.current += event.key;

        // // Set timeout to auto-process scan if no Enter key is pressed
        scanTimeoutRef.current = setTimeout(() => {
          const scannedCode = scanBufferRef.current.trim();
          if (scannedCode) {
            processScan(scannedCode);
          }
          scanBufferRef.current = '';
        }, 100); // 100ms timeout for barcode scanners
      }

      // Handle Escape key to clear buffer
      if (event.key === 'Escape') {
        scanBufferRef.current = '';
        if (scanTimeoutRef.current) {
          clearTimeout(scanTimeoutRef.current);
        }
      }
    },
    [isEnabled, processScan],
  );

  useEffect(() => {
    if (isEnabled) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [handleKeyPress, isEnabled]);

  const manualScan = useCallback(
    (barcode: string) => {
      if (barcode && barcode.trim()) {
        processScan(barcode.trim());
      }
    },
    [processScan],
  );

  return {
    isScanning: scanProductMutation.isPending,
    manualScan,
  };
}
