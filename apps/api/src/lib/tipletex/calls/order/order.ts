import { TripletexBase } from '../base';
import {
  CreateOrderInput,
  CreateOrderResult,
} from '@/lib/tipletex/types/order.types';

export class TripletexOrder extends TripletexBase {
  async create(input: CreateOrderInput): Promise<CreateOrderResult> {
    // Validate input

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/order', {
        method: 'POST',
        body: input,
      }),
    );

    return rawResponse as CreateOrderResult;
  }
}
