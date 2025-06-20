'use client';

// Node Modules
import { memo, useEffect } from 'react';

// Icons
import { Loader2, Save } from '@repo/ui/lib/icons';

// Components
import { Form } from '@repo/ui/components/base/form';
import { Button } from '@repo/ui/components/base/button';
import { zodResolver, useForm } from '@repo/ui/lib/form';

import { UserSelection } from './user-selection';
import { ProductSection } from './product-section';
import { AddressSelection } from './address-selection';
import { orderFormSchema, type OrderFormProps } from './schema';

function OrderForm(props: OrderFormProps) {
  const { onSubmit, isPending, defaultValues } = props;

  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      userId: '',
      items: [],
      shippingAddressId: '',
      notes: '',
      desiredDeliveryDate: '',
      palletType: 'EUR',
      userType: '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-xl border border-[var(--baladi-border)] bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-6 shadow-lg">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-white">
          Opprett Ny Ordre
        </h1>
        <p className="mt-2 text-blue-100">
          Fyll ut detaljene nedenfor for å opprette en ny ordre i systemet
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <UserSelection control={form.control} />

            <ProductSection
              control={form.control}
              watchedItems={form.watch('items')}
            />

            <AddressSelection
              control={form.control}
              userId={form.watch('userId')}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center space-x-2 bg-[var(--baladi-primary)] px-8 py-3 text-white transition-all duration-200 hover:bg-[var(--baladi-secondary)] disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span className="font-[family-name:var(--font-sora)] font-medium">
                {isPending ? 'Oppretter...' : 'Opprett Ordre'}
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default memo(OrderForm);
