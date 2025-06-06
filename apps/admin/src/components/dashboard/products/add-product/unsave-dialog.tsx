'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@repo/ui/components/base/dialog';
import { Button } from '@repo/ui/components/base/button';

export default function UnsaveDialog() {
  const router = useRouter();
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  return (
    <Dialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
      <DialogContent className="rounded-none border-none shadow-lg">
        <DialogHeader>
          <DialogTitle>Unsaved Changes</DialogTitle>
          <DialogDescription>
            You have unsaved changes. Are you sure you want to leave this page?
            Your changes will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setShowUnsavedDialog(false)}
            className="rounded-none"
          >
            Continue Editing
          </Button>
          <Button
            variant="destructive"
            onClick={() => router.push('/dashboard/products')}
            className="rounded-none"
          >
            Discard Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
