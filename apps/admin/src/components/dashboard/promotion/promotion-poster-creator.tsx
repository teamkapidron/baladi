'use client';

// Node Modules
import { memo, useMemo, useState } from 'react';
import { ImageIcon, Sparkles, Tag } from '@repo/ui/lib/icons';
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
import PreviewDialog from '@/components/dashboard/promotion/preview-dialog';

// Hooks
import { usePromotion } from '@/hooks/usePromotion';

interface PromotionPosterCreatorProps {
  selectedProducts: string[];
}

const formSchema = z.object({
  title: z.string().min(1, 'Tittel er påkrevd'),
  posterType: z.enum(['new-arrival', 'discounted'], {
    required_error: 'Vennligst velg en plakattype',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

function PromotionPosterCreator(props: PromotionPosterCreatorProps) {
  const { selectedProducts } = props;

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { previewPromotionPosterMutation } = usePromotion();

  const poster = useMemo(
    () => previewPromotionPosterMutation.data?.html,
    [previewPromotionPosterMutation.data?.html],
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      posterType: undefined,
    },
  });

  function onSubmit(values: FormSchema) {
    previewPromotionPosterMutation.mutate(
      {
        posterType: values.posterType,
        productsIds: selectedProducts,
      },
      {
        onSuccess: () => {
          setIsPreviewOpen(true);
        },
      },
    );
  }

  return (
    <Card className="h-fit rounded-xl shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
              Opprett Kampanjeplakat
            </CardTitle>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Design iøynefallende plakater for dine markedsføringskampanjer
            </p>
          </div>
          <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <ImageIcon className="h-5 w-5 text-[var(--baladi-primary)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-[var(--baladi-primary)]/5">
            <CardContent>
              <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-primary)]">
                Valgte Produkter
              </div>
              <div className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {selectedProducts.length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[var(--baladi-success)]/5">
            <CardContent>
              <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-success)]">
                Plakat Klar
              </div>
              <div className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {form.formState.isValid ? 'Ja' : 'Nei'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="posterType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Plakattype
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Velg plakattype" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new-arrival">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[var(--baladi-info)]" />
                          Nyheter
                        </div>
                      </SelectItem>
                      <SelectItem value="discounted">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-[var(--baladi-accent)]" />
                          Spesiell Rabatt
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Plakattittel
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Skriv en engasjerende plakattittel..."
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end">
              <Button
                type="submit"
                className="hover:bg-[var(--baladi-primary)]/90 gap-2 bg-[var(--baladi-primary)] text-white"
                disabled={
                  !form.formState.isValid ||
                  selectedProducts.length === 0 ||
                  form.formState.isSubmitting
                }
              >
                <ImageIcon className="h-4 w-4" />
                {form.formState.isSubmitting
                  ? 'Oppretter...'
                  : 'Opprett Plakat'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <PreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        poster={poster?.[0] ?? ''}
        title={form.getValues('title')}
      />
    </Card>
  );
}

export default memo(PromotionPosterCreator);
