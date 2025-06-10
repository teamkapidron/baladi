'use client';

// Node Modules
import { memo, useCallback } from 'react';

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@repo/ui/components/base/dialog';
import { Button } from '@repo/ui/components/base/button';

// Types/Constants/Utils
import { downloadImageFromHtmlString } from '@/utils/pdf.utils';

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  poster: string;
  title: string;
}

function PreviewDialog(props: PreviewDialogProps) {
  const { open, onOpenChange, poster, title } = props;

  const handleDownload = useCallback(() => {
    downloadImageFromHtmlString(poster, `${title}.png`);
  }, [poster, title]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
              Plakat Forhåndsvisning
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="h-[70svh]">
          <iframe
            srcDoc={poster}
            className="h-full w-full border-0"
            title="Newsletter Forhåndsvisning"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleDownload}>Last ned</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(PreviewDialog);
