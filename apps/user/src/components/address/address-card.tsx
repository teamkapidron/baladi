'use client';

// Node Modules
import { memo, useCallback, useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Edit2,
  Trash2,
  Star,
  Phone,
  Tag,
  MoreVertical,
  Home,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Badge } from '@repo/ui/components/base/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@repo/ui/components/base/alert-dialog';

// Hooks
import { useAddress } from '@/hooks/useAddress';

// Types
import { Address } from '@repo/types/address';

interface AddressCardProps {
  address: Address;
}

function AddressCard(props: AddressCardProps) {
  const { address } = props;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteAddressMutation, setDefaultAddressMutation } = useAddress();

  const handleSetDefault = useCallback(() => {
    if (!address.isDefault) {
      setDefaultAddressMutation.mutate({ addressId: address._id });
    }
  }, [address._id, address.isDefault, setDefaultAddressMutation]);

  const handleDelete = useCallback(() => {
    deleteAddressMutation.mutate({ addressId: address._id });
    setIsDeleteDialogOpen(false);
  }, [address._id, deleteAddressMutation]);

  const fullAddress = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {address.isDefault && (
        <div className="absolute right-4 top-4 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 font-semibold text-white shadow-lg">
            <Star className="mr-1 h-3 w-3" fill="currentColor" />
            Standard
          </Badge>
        </div>
      )}

      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                address.isDefault
                  ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                  : 'from-baladi-primary to-baladi-secondary bg-gradient-to-br'
              } shadow-lg`}
            >
              {address.label === 'home' ? (
                <Home className="h-6 w-6 text-white" />
              ) : (
                <MapPin className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              {address.label && (
                <div className="mb-1 flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="font-[family-name:var(--font-sora)] text-sm font-medium capitalize text-gray-700">
                    {address.label}
                  </span>
                </div>
              )}
              <h3 className="line-clamp-1 font-[family-name:var(--font-sora)] text-lg font-semibold text-gray-900">
                {address.addressLine1}
              </h3>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link
                  href={`/address/edit/${address._id}`}
                  className="flex cursor-pointer items-center"
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Rediger adresse
                </Link>
              </DropdownMenuItem>
              {!address.isDefault && (
                <DropdownMenuItem onClick={handleSetDefault}>
                  <Star className="mr-2 h-4 w-4" />
                  Sett som standard
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Slett adresse
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
            <p className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-gray-600">
              {fullAddress}
            </p>
          </div>

          {address.phoneNumber && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-gray-600">
                {address.phoneNumber}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex space-x-2 border-t border-gray-100 pt-4">
          <Link href={`/address/edit/${address._id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full font-[family-name:var(--font-dm-sans)] text-xs hover:bg-gray-50"
            >
              <Edit2 className="mr-2 h-3 w-3" />
              Rediger
            </Button>
          </Link>

          {!address.isDefault && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSetDefault}
              className="flex-1 font-[family-name:var(--font-dm-sans)] text-xs hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
              disabled={setDefaultAddressMutation.isPending}
            >
              <Star className="mr-2 h-3 w-3" />
              Standard
            </Button>
          )}
        </div>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-[family-name:var(--font-sora)]">
              Slett adresse
            </AlertDialogTitle>
            <AlertDialogDescription className="font-[family-name:var(--font-dm-sans)]">
              Er du sikker på at du vil slette denne adressen? Denne handlingen
              kan ikke angres.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-[family-name:var(--font-dm-sans)]">
              Avbryt
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 font-[family-name:var(--font-dm-sans)] hover:bg-red-700"
              disabled={deleteAddressMutation.isPending}
            >
              {deleteAddressMutation.isPending ? 'Sletter...' : 'Slett'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default memo(AddressCard);
