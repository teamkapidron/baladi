'use client';

// Node Modules
import React, { memo } from 'react';

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/base/dialog';
import WastageForm from './wastage-form';

// Types
import { InventoryResponse } from '@/hooks/useInventory/types';

interface WastageDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  inventoryItem: InventoryResponse;
  isEdit?: boolean;
}

function WastageDialog(props: WastageDialogProps) {
  const { open, setOpen, inventoryItem, isEdit = false } = props;

  function handleSuccess() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {isEdit ? 'Rediger Svinn' : 'Registrer Svinn'}
          </DialogTitle>
        </DialogHeader>
        <WastageForm
          inventoryItem={inventoryItem}
          isEdit={isEdit}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(WastageDialog);
