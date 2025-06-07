'use client';

// Node Modules
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import { AtSign, Eye, EyeOff, Key } from '@repo/ui/lib/icons';

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
import { loginSchema, LoginSchema } from './schema';

function LoginForm() {
  const { loginMutation } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  function onSubmit(values: LoginSchema) {
    loginMutation.mutate(values);
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Passord</FormLabel>
                <Link href="/forgot-password">
                  <Button variant="underline" className="cursor-pointer pb-1">
                    Glemt passord?
                  </Button>
                </Link>
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

        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Logg inn...' : 'Logg inn'}
        </Button>
      </form>
    </Form>
  );
}

export default memo(LoginForm);
