'use client';

// Node Modules
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { cn } from '@repo/ui/lib/utils';

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@repo/ui/components/base/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@repo/ui/components/base/drawer';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@repo/ui/components/base/input-otp';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useMediaQuery } from '@repo/ui/hooks/useMediaQuery';

interface OtpVerificationProps {
  email: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function OtpVerification(props: OtpVerificationProps) {
  const { email, open, setOpen } = props;

  const isMobile = useMediaQuery('(max-width: 768px)');
  const { verifyOTPMutation, resendOTPMutation } = useAuth();

  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleVerify = useCallback(() => {
    verifyOTPMutation.mutate(
      { email, otp },
      {
        onSuccess: function () {
          setOpen(false);
        },
      },
    );
  }, [email, otp, setOpen, verifyOTPMutation]);

  const handleResend = useCallback(() => {
    resendOTPMutation.mutate({ email });
  }, [email, resendOTPMutation]);

  useEffect(() => {
    if (resendOTPMutation.isSuccess && !resendOTPMutation.isPending) {
      setResendTimer(60);
    }
  }, [resendOTPMutation.isSuccess, resendOTPMutation.isPending]);

  const ContentBody = useMemo(
    () => (
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-sm">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            className="w-full"
          >
            <InputOTPGroup className="w-full justify-center gap-2">
              {Array.from({ length: 6 }, (_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={cn(
                    'h-12 w-12 border-2 text-lg font-medium transition-all',
                    'focus:ring-[var(--baladi-primary)]/20 focus:border-[var(--baladi-primary)] focus:ring-2',
                    'data-[active=true]:ring-[var(--baladi-primary)]/20 data-[active=true]:border-[var(--baladi-primary)] data-[active=true]:ring-2',
                  )}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6}
            className="hover:bg-[var(--baladi-primary)]/90 h-11 w-full bg-[var(--baladi-primary)] font-medium text-white"
          >
            Bekreft kode
          </Button>

          <div className="text-center">
            <span className="text-sm text-[var(--baladi-gray)]">
              Fikk du ikke koden?{' '}
            </span>
            {resendTimer === 0 ? (
              <Button
                variant="link"
                onClick={handleResend}
                disabled={resendOTPMutation.isPending}
                isLoading={resendOTPMutation.isPending}
                className="hover:text-[var(--baladi-primary)]/80 h-auto p-0 font-medium text-[var(--baladi-primary)]"
              >
                {resendOTPMutation.isPending
                  ? 'Sender...'
                  : 'Send kode på nytt'}
              </Button>
            ) : (
              <span className="text-sm font-medium text-[var(--baladi-gray)]">
                Send kode på nytt om {resendTimer} sekund
                {resendTimer !== 1 ? 'er' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    ),
    [otp, handleVerify, resendTimer, handleResend, resendOTPMutation.isPending],
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="pb-2 text-center">
            <DrawerTitle className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
              Bekreft telefonnummeret ditt
            </DrawerTitle>
            <DrawerDescription className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
              Vi har sendt en 6-sifret bekreftelseskode til telefonnummeret
              ditt. Skriv inn koden nedenfor for å fortsette.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-6 py-4">{ContentBody}</div>
          <DrawerFooter>
            <div className="text-[var(--baladi-gray)]/70 text-center text-xs">
              Skriv inn koden innen 5 minutter av sikkerhetsgrunner
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
            Bekreft telefonnummeret ditt
          </DialogTitle>
          <DialogDescription className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
            Vi har sendt en 6-sifret bekreftelseskode til telefonnummeret ditt.
            Skriv inn koden nedenfor for å fortsette.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4">{ContentBody}</div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(OtpVerification);
