'use client';

// Node Modules
import { memo, useEffect } from 'react';
import { Download, ImageIcon, Sparkles, FileImage } from '@repo/ui/lib/icons';
import { useForm, z, zodResolver } from '@repo/ui/lib/form';

// Components
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';

// Hooks
import { usePoster } from '@/hooks/usePoster';

interface PosterCreatorProps {
  selectedProducts: string[];
}

const formSchema = z.object({
  title: z.string().optional(),
  productsIds: z.array(z.string()).min(1, 'Vennligst velg minst ett produkt'),
});

type FormSchema = z.infer<typeof formSchema>;

function PosterCreator(props: PosterCreatorProps) {
  const { selectedProducts } = props;

  const { previewFlagPosterMutation } = usePoster();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      productsIds: selectedProducts,
    },
  });

  function onSubmit(values: FormSchema) {
    previewFlagPosterMutation.mutate({
      productsIds: values.productsIds,
      posterType: 'promotion',
      title: values.title ?? 'Produktplakat',
    });
  }

  useEffect(() => {
    form.setValue('productsIds', selectedProducts, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [form, selectedProducts]);

  return (
    <Card className="h-fit rounded-xl shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
              Opprett Produktplakat
            </CardTitle>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Design attraktive plakater for å fremheve dine produkter
            </p>
          </div>
          <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <ImageIcon className="h-5 w-5 text-[var(--baladi-primary)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Bildenavn
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Skriv inn et bildenavn..."
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-[var(--baladi-light)]/50 rounded-lg border border-[var(--baladi-border)] p-4">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--baladi-info)]/20 flex h-8 w-8 items-center justify-center rounded-full">
                  <FileImage className="h-4 w-4 text-[var(--baladi-info)]" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    {selectedProducts.length} produkt
                    {selectedProducts.length !== 1 ? 'er' : ''} valgt
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                    Plakaten vil vise de valgte produktene med detaljer
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="submit"
                className="hover:bg-[var(--baladi-primary)]/90 gap-2 bg-[var(--baladi-primary)] text-white"
                disabled={
                  !form.formState.isValid ||
                  previewFlagPosterMutation.isPending ||
                  selectedProducts.length === 0
                }
              >
                <Download className="h-4 w-4" />
                {previewFlagPosterMutation.isPending
                  ? 'Genererer...'
                  : selectedProducts.length > 1
                    ? `Generer ${selectedProducts.length} Plakater`
                    : 'Generer Plakat'}
              </Button>
            </div>
          </form>
        </Form>

        {selectedProducts.length === 0 && (
          <div className="bg-[var(--baladi-muted)]/30 rounded-lg border border-dashed border-[var(--baladi-border)] p-6">
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-[var(--baladi-gray)]" />
              <h3 className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                Ingen produkter valgt
              </h3>
              <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                Velg produkter fra listen til venstre for å kunne generere en
                plakat
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(PosterCreator);
