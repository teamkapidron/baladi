import { TripletexBase } from '../base';
import {
  CreateOrderInput,
  CreateOrderResult,
  createOrderInputSchema,
  createOrderResponseSchema,
} from '@/validators/schemas/tripletex/order.schema';

export class TripletexOrder extends TripletexBase {
  async create(input: CreateOrderInput): Promise<CreateOrderResult> {
    // Validate input
    const validatedInput = createOrderInputSchema.parse(input);

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/order', {
        method: 'POST',
        body: validatedInput,
      }),
    );

    const response = createOrderResponseSchema.parse(rawResponse);
    return { orderId: response.value.id };
  }
}
