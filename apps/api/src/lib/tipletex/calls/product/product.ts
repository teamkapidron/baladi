import { TripletexBase } from '../base';
import {
  CreateProductInput,
  CreateProductResult,
} from '@/lib/tipletex/types/product.types';

export class TripletexProduct extends TripletexBase {
  async create(input: CreateProductInput): Promise<CreateProductResult> {
    // Validate input

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/product', {
        method: 'POST',
        body: input,
      }),
    );

    return rawResponse as CreateProductResult;
  }
}
