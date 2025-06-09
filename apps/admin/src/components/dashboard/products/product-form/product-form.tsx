'use client';

// Node Modules
import Image from 'next/image';
import { memo, useMemo, useState, useRef } from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import {
  Loader2,
  Save,
  Percent,
  BoxesIcon,
  DollarSign,
  Barcode,
  Weight,
  Ruler,
  Eye,
  Package,
  FileText,
  Tag,
  Building,
  Globe,
  User,
  MapPin,
  Hash,
  Upload,
  Image as ImageIcon,
  X,
  Plus,
} from '@repo/ui/lib/icons';

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
import { Textarea } from '@repo/ui/components/base/textarea';
import { Checkbox } from '@repo/ui/components/base/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import { MultiSelect } from '@repo/ui/components/base/multi-select';
import { Button } from '@repo/ui/components/base/button';

// Schemas
import {
  VAT,
  vatOptions,
  productFormSchema,
  ProductFormValues,
} from './product-schema';

// Hooks
import { useCategory } from '@/hooks/useCategory';

// Types
import { Visibility } from '@repo/types/product';

function ProductForm() {
  const { categoriesFlattened } = useCategory();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const categoryOptions = useMemo(
    () =>
      categoriesFlattened?.categories?.map((category) => ({
        label: category.name,
        value: category._id,
        icon: Tag,
      })) || [],
    [categoriesFlattened?.categories],
  );

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      shortDescription: '',
      sku: '',
      barcode: '',
      vat: VAT.VAT_15,
      costPrice: 0,
      salePrice: 0,
      noOfUnits: 10,
      categories: [],
      images: [],
      isActive: true,
      visibility: Visibility.BOTH,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      weight: 0,
      supplier: {
        number: '',
        name: '',
        location: '',
        countryOfOrigin: '',
        hsCode: '',
      },
    },
  });

  function onSubmit(data: ProductFormValues) {
    console.log('Form data:', data);
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const currentImages = form.getValues('images') || [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newImages.push(result);
          setUploadedImages((prev) => [...prev, result]);

          // Update form with new images
          const updatedImages = [...currentImages, ...newImages];
          form.setValue('images', updatedImages);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const currentImages = form.getValues('images') || [];
    const updatedImages = currentImages.filter(
      (_, index) => index !== indexToRemove,
    );
    form.setValue('images', updatedImages);
    setUploadedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-[var(--baladi-border)] bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-6 shadow-lg">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-white">
          Create New Product
        </h1>
        <p className="mt-2 text-blue-100">
          Fill in the details below to add a new product to your inventory
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Basic Information */}
            <div className="space-y-6 lg:col-span-2">
              {/* Basic Information Card */}
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Basic Information
                  </h2>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Product Name *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Package className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Enter product name"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                const slug = e.target.value
                                  .toLowerCase()
                                  .replace(/[^\w\s-]/g, '')
                                  .replace(/\s+/g, '-');
                                form.setValue('slug', slug);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          URL Slug
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="product-slug"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <p className="text-xs text-[var(--baladi-gray)]">
                          Auto-generated from product name
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Short Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Brief product description"
                            className="h-12 rounded-lg border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Full Description
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-[var(--baladi-gray)]" />
                            <Textarea
                              placeholder="Detailed product description"
                              className="min-h-[120px] rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Categories Card */}
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                    <Tag className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Categories
                  </h2>
                </div>

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        Select Categories *
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={categoryOptions}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          placeholder="Search and select categories..."
                          variant="default"
                          animation={0.2}
                          maxCount={5}
                          className="h-12 rounded-lg border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        />
                      </FormControl>
                      <p className="text-xs text-[var(--baladi-gray)]">
                        Select one or more categories that best describe your
                        product
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Product Images Card */}
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                    <ImageIcon className="h-5 w-5 text-pink-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Product Images
                  </h2>
                </div>

                <FormField
                  control={form.control}
                  name="images"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        Upload Images
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {/* Upload Area */}
                          <div
                            onClick={triggerFileInput}
                            className="hover:bg-[var(--baladi-primary)]/5 flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[var(--baladi-border)] bg-gray-50 transition-colors hover:border-[var(--baladi-primary)]"
                          >
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-[var(--baladi-gray)]" />
                              <p className="mt-2 text-sm font-medium text-[var(--baladi-primary)]">
                                Click to upload images
                              </p>
                              <p className="text-xs text-[var(--baladi-gray)]">
                                PNG, JPG, JPEG up to 10MB each
                              </p>
                            </div>
                          </div>

                          {/* Hidden File Input */}
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />

                          {/* Image Previews */}
                          {uploadedImages.length > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-[var(--baladi-primary)]">
                                  Uploaded Images ({uploadedImages.length})
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={triggerFileInput}
                                  className="h-8 border-[var(--baladi-border)] text-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white"
                                >
                                  <Plus className="mr-1 h-3 w-3" />
                                  Add More
                                </Button>
                              </div>

                              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {uploadedImages.map((image, index) => (
                                  <div
                                    key={index}
                                    className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-gray-100"
                                  >
                                    <Image
                                      src={image}
                                      width={100}
                                      height={100}
                                      alt={`Product image ${index + 1}`}
                                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                      <p className="text-xs font-medium text-white">
                                        Image {index + 1}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <p className="text-xs text-[var(--baladi-gray)]">
                        Upload high-quality images of your product. The first
                        image will be used as the main product image.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Pricing Card */}
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Pricing & Inventory
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Cost Price (£) *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Sale Price (£) *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-success)]" />
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          VAT (%) *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value.toString()}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]">
                                  <SelectValue placeholder="Select VAT" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-lg">
                                {vatOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value.toString()}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noOfUnits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Number of Units *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <BoxesIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              placeholder="10"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Product Identifiers Card */}
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <Tag className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Product Identifiers
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          SKU
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Enter SKU"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e.target.value.toUpperCase());
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Barcode
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Barcode className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Enter barcode"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Weight (kg)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Weight className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Dimensions Card */}
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <Ruler className="h-5 w-5 text-orange-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Dimensions
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="dimensions.length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Length (cm)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Ruler className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="0.0"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensions.width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Width (cm)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Ruler className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="0.0"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensions.height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Height (cm)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Ruler className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="0.0"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Settings & Supplier */}
            <div className="space-y-6">
              {/* Settings Card */}
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Eye className="h-5 w-5 text-gray-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Settings
                  </h2>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Visibility
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="relative">
                            <SelectTrigger className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]">
                              <Eye className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-lg">
                            <SelectItem value="both">
                              Both (Internal & External)
                            </SelectItem>
                            <SelectItem value="internal">
                              Internal Only
                            </SelectItem>
                            <SelectItem value="external">
                              External Only
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border border-[var(--baladi-border)] p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-[var(--baladi-border)] data-[state=checked]:bg-[var(--baladi-primary)]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                            Active Product
                          </FormLabel>
                          <p className="text-sm text-[var(--baladi-gray)]">
                            Product will be visible and available
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Supplier Card */}
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    <Building className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Supplier Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="supplier.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Supplier Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Supplier name"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Supplier Number
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Supplier number"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier.location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Location
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Supplier location"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier.countryOfOrigin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Country of Origin
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Country of origin"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier.hsCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          HS Code
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Barcode className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="HS code"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="hover:bg-[var(--baladi-primary)]/90 focus:ring-[var(--baladi-primary)]/20 h-12 rounded-lg bg-[var(--baladi-primary)] px-8 font-[family-name:var(--font-sora)] font-semibold text-white shadow-lg transition-all hover:shadow-xl focus:ring-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Product...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Create Product
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default memo(ProductForm);
