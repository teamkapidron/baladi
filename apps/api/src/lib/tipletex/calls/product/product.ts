import { serializeQuery } from '@/lib/tipletex/utils';
import { TripletexBase } from '../base';
import {
  listProductsResponseSchema,
  ListProductsResponse,
  Product,
  createProductInputSchema,
  createProductResponseSchema,
  CreateProductInput,
  CreateProductResult,
} from '@/validators/schemas/tripletex/product.schema';
import { DefaultTripletexInputs } from '@/lib/tipletex/types';

export interface ListProductsInput extends DefaultTripletexInputs {
  id?: string[];
  name?: string;
  number?: string;
  description?: string;
  ean?: string;
  isInactive?: boolean;
  isStockItem?: boolean;
  productGroupId?: string[];
  vatTypeId?: string[];
  currencyId?: string[];
}

export class TripletexProduct extends TripletexBase {
  async list(input?: ListProductsInput): Promise<ListProductsResponse> {
    const query = input ? serializeQuery(input) : {};

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/product', {
        method: 'GET',
        query,
      }),
    );

    return listProductsResponseSchema.parse(rawResponse);
  }

  async create(input: CreateProductInput): Promise<CreateProductResult> {
    // Validate input
    const validatedInput = createProductInputSchema.parse(input);

    // Transform input to match API expectations
    const apiPayload = {
      name: validatedInput.name,
      number: validatedInput.number,
      description: validatedInput.description,
      ean: validatedInput.ean,
      elNumber: validatedInput.elNumber,
      nrfNumber: validatedInput.nrfNumber,
      costExcludingVatCurrency: validatedInput.costExcludingVatCurrency,
      priceExcludingVatCurrency: validatedInput.priceExcludingVatCurrency,
      priceIncludingVatCurrency: validatedInput.priceIncludingVatCurrency,
      isInactive: validatedInput.isInactive,
      isStockItem: validatedInput.isStockItem,
      stockOfGoods: validatedInput.stockOfGoods,
      hsCode: validatedInput.hsCode,
      alternativeName: validatedInput.alternativeName,
      weight: validatedInput.weight,
      weightUnit: validatedInput.weightUnit,
      volume: validatedInput.volume,
      volumeUnit: validatedInput.volumeUnit,
      supplierProductNumber: validatedInput.supplierProductNumber,
      // Transform ID fields to object references
      unitOfMeasure: validatedInput.unitOfMeasureId
        ? { id: validatedInput.unitOfMeasureId }
        : undefined,
      vatType: validatedInput.vatTypeId
        ? { id: validatedInput.vatTypeId }
        : undefined,
      currency: validatedInput.currencyId
        ? { id: validatedInput.currencyId }
        : undefined,
      discountGroup: validatedInput.discountGroupId
        ? { id: validatedInput.discountGroupId }
        : undefined,
      account: validatedInput.accountId
        ? { id: validatedInput.accountId }
        : undefined,
      productGroup: validatedInput.productGroupId
        ? { id: validatedInput.productGroupId }
        : undefined,
      category: validatedInput.categoryId
        ? { id: validatedInput.categoryId }
        : undefined,
      resaleProduct: validatedInput.resaleProductId
        ? { id: validatedInput.resaleProductId }
        : undefined,
      supplier: validatedInput.supplierId
        ? { id: validatedInput.supplierId }
        : undefined,
    };

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/product', {
        method: 'POST',
        body: apiPayload,
      }),
    );

    const response = createProductResponseSchema.parse(rawResponse);
    return { productId: response.value.id };
  }
}

export type {
  Product,
  ListProductsResponse,
  CreateProductInput,
  CreateProductResult,
};
