import { TripletexBase } from '../base';
import {
  createProductInputSchema,
  createProductResponseSchema,
  CreateProductInput,
  CreateProductResult,
} from '@/validators/schemas/tripletex/product.schema';

export class TripletexProduct extends TripletexBase {
  async create(input: CreateProductInput): Promise<CreateProductResult> {
    // Validate input
    const validatedInput = createProductInputSchema.parse(input);

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/product', {
        method: 'POST',
        body: validatedInput,
      }),
    );

    const response = createProductResponseSchema.parse(rawResponse);
    return { productId: response.value.id };
  }
}
