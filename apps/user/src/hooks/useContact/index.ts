// Node Modules
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

// Hooks
import { useRequest } from '../useRequest';

// Types
import { SendContactFormRequest } from './types';

// Utils
import { toast } from '@repo/ui/lib/sonner';

export function useContact() {
  const api = useRequest();

  const sendContactForm = useCallback(
    async (payload: SendContactFormRequest['payload']) => {
      const response = await api.post<SendContactFormRequest['response']>(
        '/marketing/contact/form',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const sendContactFormMutation = useMutation({
    mutationFn: sendContactForm,
    onSuccess: () => {
      toast.success('Takk for at du kontaktet oss!');
    },
    onError: () => {
      toast.error('Det oppstod en feil. Vennligst prøv igjen senere.');
    },
  });

  return { sendContactFormMutation };
}
