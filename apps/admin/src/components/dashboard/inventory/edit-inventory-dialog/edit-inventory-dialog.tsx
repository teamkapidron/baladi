'use client';

// Node Modules
import React, { memo, useCallback } from 'react';

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/base/dialog';
import EditInventoryForm from './edit-inventory-form';

// Types
import { InventoryResponse } from '@/hooks/useInventory/types';

interface EditInventoryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  inventoryItem: InventoryResponse;
}

function EditInventoryDialog(props: EditInventoryDialogProps) {
  const { open, setOpen, inventoryItem } = props;

  const handleSuccess = useCallback(() => setOpen(false), [setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Rediger Lager</DialogTitle>
        </DialogHeader>
        <EditInventoryForm
          inventoryItem={inventoryItem}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(EditInventoryDialog);
