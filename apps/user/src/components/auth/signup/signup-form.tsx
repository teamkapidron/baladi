'use client';

// Node Modules
import { memo, useCallback, useState } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import { AtSign, Eye, EyeOff, Key, User } from '@repo/ui/lib/icons';

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
import { signupSchema, SignupSchema } from './schema';

function SignupForm() {
  const { signupMutation } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  function onSubmit(values: SignupSchema) {
    signupMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-2 top-2.5">
                    <User size={18} />
                  </span>
                  <Input
                    placeholder="Skriv inn navnet ditt"
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
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? 'Registrerer...' : 'Registrer'}
        </Button>
      </form>
    </Form>
  );
}

export default memo(SignupForm);
