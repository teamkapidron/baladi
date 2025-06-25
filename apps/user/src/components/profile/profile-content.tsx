'use client';

// Node Modules
import { memo, useMemo, useState } from 'react';

// Icons
import { Mail, Edit3, Check, X, Calendar, Shield } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import { Badge } from '@repo/ui/components/base/badge';
import { Avatar, AvatarFallback } from '@repo/ui/components/base/avatar';
import EditProfileForm, {
  type EditProfileFormValues,
} from './edit-profile-form';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { useAddress } from '@/hooks/useAddress';

// Types
import type { UserWithAddress } from './schema';

function ProfileContent() {
  const { user } = useAuth();
  const { defaultAddress, isDefaultAddressLoading } = useAddress();
  const { updateProfileMutation } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const userData: UserWithAddress | null = useMemo(() => {
    return {
      name: user?.name || '',
      email: user?.email || '',
      userType: user?.userType || '',
      isApprovedByAdmin: user?.isApprovedByAdmin || false,
      isEmailVerified: user?.isEmailVerified || false,
      createdAt: user?.createdAt ? new Date(user.createdAt).toISOString() : '',
      companyName: user?.companyName || '',
      organizationNumber: user?.organizationNumber || '',
      phoneNumber: user?.phoneNumber || '',
      address: {
        addressLine1: defaultAddress?.address.addressLine1 || '',
        addressLine2: defaultAddress?.address.addressLine2 || '',
        city: defaultAddress?.address.city || '',
        postalCode: defaultAddress?.address.postalCode || '',
      },
    };
  }, [user, defaultAddress]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFormSubmit = (values: EditProfileFormValues) => {
    updateProfileMutation.mutate(values, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[var(--baladi-primary)] border-t-transparent"></div>
          <p className="text-[var(--baladi-gray)]">
            Laster profilinformasjon...
          </p>
        </div>
      </div>
    );
  }

  const displayName = user.name || user.email?.split('@')[0] || 'Bruker';
  const joinDate = new Date(user.createdAt).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-8 text-white">
        <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row">
          <Avatar className="h-24 w-24 border-4 border-white/20 shadow-lg">
            <AvatarFallback className="bg-white/20 font-[family-name:var(--font-sora)] text-2xl font-bold text-white backdrop-blur-sm">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center sm:text-left">
            <div className="mb-2 flex flex-col items-center gap-2 sm:flex-row">
              <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold">
                {displayName}
              </h1>
              <div className="flex gap-2">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  <Shield className="mr-1 h-3 w-3" />
                  {user.userType || 'Bruker'}
                </Badge>
                {user.isApprovedByAdmin && (
                  <Badge className="bg-[var(--baladi-success)]/20 hover:bg-[var(--baladi-success)]/30 text-white">
                    <Check className="mr-1 h-3 w-3" />
                    Godkjent
                  </Badge>
                )}
              </div>
            </div>
            <p className="mb-2 font-[family-name:var(--font-dm-sans)] text-lg opacity-90">
              {user.email}
            </p>
            <p className="flex items-center justify-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm opacity-75 sm:justify-start">
              <Calendar className="h-4 w-4" />
              Medlem siden {joinDate}
            </p>
          </div>

          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:scale-105 hover:bg-white/20 hover:shadow-lg"
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Rediger profil
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:scale-105 hover:bg-white/20 hover:shadow-lg"
                >
                  <X className="mr-2 h-4 w-4" />
                  Avbryt
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white"></div>
          <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-white"></div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="border-[var(--baladi-border)] shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-sora)] text-lg">
                <Mail className="h-5 w-5 text-[var(--baladi-primary)]" />
                Kontoinformasjon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--baladi-gray)]">
                  E-postadresse
                </label>
                <div className="rounded-lg bg-[var(--baladi-muted)] p-3">
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--baladi-gray)]">
                  Kontostatus
                </label>
                <div className="rounded-lg bg-[var(--baladi-muted)] p-3">
                  <div className="flex items-center gap-2">
                    {user.isEmailVerified ? (
                      <>
                        <div className="h-2 w-2 rounded-full bg-[var(--baladi-success)]"></div>
                        <span className="text-sm text-[var(--baladi-success)]">
                          E-post bekreftet
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="h-2 w-2 rounded-full bg-[var(--baladi-warning)]"></div>
                        <span className="text-sm text-[var(--baladi-warning)]">
                          E-post ikke bekreftet
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--baladi-gray)]">
                  Brukertype
                </label>
                <div className="rounded-lg bg-[var(--baladi-muted)] p-3">
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm capitalize text-[var(--baladi-dark)]">
                    {user.userType || 'Standard'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {userData && (
            <EditProfileForm
              user={userData}
              isEditing={isEditing}
              isLoading={updateProfileMutation.isPending}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProfileContent);
