'use client';

// Node Modules
import React from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import { Mail, Lock, ArrowRight, Loader2 } from '@repo/ui/lib/icons';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import { Form } from '@repo/ui/components/base/form';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Types
import { LoginFormValues, loginFormSchema } from './schema';

function LoginForm() {
  const { loginMutation } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="mb-2 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
          Sign in to your account
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Enter your credentials to access the admin panel
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Mail className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="admin@baladi.com"
                    className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Lock className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="focus:ring-[var(--baladi-primary)]/30 group relative w-full overflow-hidden rounded-lg bg-[var(--baladi-primary)] px-6 py-4 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--baladi-secondary)] hover:shadow-lg focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="relative flex items-center justify-center space-x-2">
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin text-white" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </div>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
