'use client';

// Node Modules
import { memo } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import { AtSign } from '@repo/ui/lib/icons';

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Types/Utils/Constants
import { forgotPasswordSchema, ForgotPasswordSchema } from './schema';

function ForgotPasswordForm() {
  const { forgotPasswordMutation } = useAuth();

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: ForgotPasswordSchema) {
    forgotPasswordMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-2 top-2.5">
                    <AtSign size={18} />
                  </span>
                  <Input
                    type="email"
                    placeholder="Skriv inn e-postadressen din"
                    className="pl-8"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? 'Sender...' : 'Send'}
        </Button>
      </form>
    </Form>
  );
}

export default memo(ForgotPasswordForm);
