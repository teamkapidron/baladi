'use client';

// Node Modules
import { memo, useCallback, useState } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import { Eye, EyeOff, Key } from '@repo/ui/lib/icons';

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
import { resetPasswordSchema, ResetPasswordSchema } from './schema';

interface ResetPasswordFormProps {
  token: string;
}

function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { token } = props;

  const { resetPasswordMutation } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: '',
      confirmPassword: '',
    },
  });

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  function onSubmit(values: ResetPasswordSchema) {
    resetPasswordMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Passord</FormLabel>
              </div>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-2 top-2.5">
                    <Key size={18} />
                  </span>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Skriv inn passordet ditt"
                    className="pl-8 pr-10"
                    {...field}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={togglePassword}
                    className="absolute right-2 top-2.5"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Bekreft passord</FormLabel>
              </div>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-2 top-2.5">
                    <Key size={18} />
                  </span>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Skriv inn passordet ditt på nytt"
                    className="pl-8 pr-10"
                    {...field}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={togglePassword}
                    className="absolute right-2 top-2.5"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? 'Oppdaterer...' : 'Oppdater'}
        </Button>
      </form>
    </Form>
  );
}

export default memo(ResetPasswordForm);
