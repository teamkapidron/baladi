'use client';

// Node Modules
import { memo, useCallback, useMemo } from 'react';
import { useForm, z, zodResolver } from '@repo/ui/lib/form';
import { Send, Eye, Mail, Sparkles } from '@repo/ui/lib/icons';

// Components
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import { Badge } from '@repo/ui/components/base/badge';
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
import { useNewsletter } from '@/hooks/useNewsletter';

// Types
import { CampaignType } from '@repo/types/campaign';

interface NewsletterCreatorProps {
  selectedProducts: string[];
}

const formSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  products: z.array(z.string()),
  campaignType: z.nativeEnum(CampaignType),
});

function NewsletterCreator(props: NewsletterCreatorProps) {
  const { selectedProducts } = props;

  const { createCampaignMutation, newsLetterPreviewMutation } = useNewsletter();

  const form = useForm({
    defaultValues: {
      subject: '',
      products: selectedProducts,
      campaignType: CampaignType.NEW_ARRIVAL,
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createCampaignMutation.mutate({
      title: values.subject,
      type: values.campaignType,
      productsIds: selectedProducts,
    });

    form.reset();

    newsLetterPreviewMutation.reset();
  }

  const preview = useMemo(() => {
    return newsLetterPreviewMutation.data?.html;
  }, [newsLetterPreviewMutation.data]);

  const showPreview = useCallback(() => {
    newsLetterPreviewMutation.mutate({
      type: form.watch('campaignType'),
      productsIds: selectedProducts,
    });
  }, [form.watch('campaignType'), selectedProducts]);

  return (
    <Card className="h-fit rounded-xl shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
              Create Newsletter Campaign
            </CardTitle>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Design and send engaging newsletters to your subscribers
            </p>
          </div>
          <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Mail className="h-5 w-5 text-[var(--baladi-primary)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-[var(--baladi-primary)]/5">
            <CardContent>
              <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-primary)]">
                Selected Products
              </div>
              <div className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {selectedProducts.length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[var(--baladi-success)]/5">
            <CardContent>
              <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-success)]">
                Ready to Send
              </div>
              <div className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {form.formState.isValid ? 'Yes' : 'No'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="campaignType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Campaign Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={CampaignType.NEW_ARRIVAL}>
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[var(--baladi-info)]" />
                          New Arrival
                        </div>
                      </SelectItem>
                      <SelectItem value={CampaignType.PROMOTION}>
                        <div className="flex items-center gap-2">
                          <Badge className="h-4 w-4 bg-[var(--baladi-accent)]" />
                          Product Promotion
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
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Email Subject Line
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a compelling subject line that grabs attention..."
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card className="border-[var(--baladi-border)]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-[family-name:var(--font-sora)] text-base font-semibold text-[var(--baladi-dark)]">
                    Newsletter Preview
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={showPreview}
                    className="gap-2"
                    disabled={
                      newsLetterPreviewMutation.isPending ||
                      selectedProducts.length === 0
                    }
                  >
                    <Eye className="h-4 w-4" />
                    Show Preview
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {preview !== undefined ? (
                  <div className="space-y-4">
                    <iframe
                      srcDoc={preview}
                      className="h-[600px] w-full border-0"
                      title="Newsletter Preview"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="bg-[var(--baladi-primary)]/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                      <Eye className="h-8 w-8 text-[var(--baladi-primary)]" />
                    </div>
                    <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                      Preview Your Newsletter
                    </h4>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      Click the "Show Preview" button above to see how your
                      newsletter will look
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                {!form.formState.isValid && (
                  <span className="text-[var(--baladi-error)]">
                    Please fill all required fields to send newsletter
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="hover:bg-[var(--baladi-primary)]/90 gap-2 bg-[var(--baladi-primary)] text-white"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                >
                  <Send className="h-4 w-4" />
                  {form.formState.isSubmitting
                    ? 'Sending...'
                    : 'Send Newsletter'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default memo(NewsletterCreator);

function getCampaignTypeLabel(type: CampaignType) {
  switch (type) {
    case CampaignType.NEW_ARRIVAL:
      return 'New Arrival';
    case CampaignType.PROMOTION:
      return 'Product Promotion';
    default:
      return 'Not selected';
  }
}

function getCampaignTypeColor(type: CampaignType) {
  switch (type) {
    case CampaignType.NEW_ARRIVAL:
      return 'bg-[var(--baladi-info)]/10 text-[var(--baladi-info)]';
    case CampaignType.PROMOTION:
      return 'bg-[var(--baladi-accent)]/10 text-[var(--baladi-accent)]';
    default:
      return 'bg-[var(--baladi-gray)]/10 text-[var(--baladi-gray)]';
  }
}
