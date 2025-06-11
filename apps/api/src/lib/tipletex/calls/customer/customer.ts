import { TripletexBase } from '../base';
import {
  createCustomerInputSchema,
  createCustomerResponseSchema,
  CreateCustomerInput,
  CreateCustomerResult,
} from '@/validators/schemas/tripletex/customer.schema';

export class TripletexCustomer extends TripletexBase {
  async makeCustomerActive(
    customerId: number,
    isInactive: boolean,
  ): Promise<CreateCustomerResult> {
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    if (isInactive === undefined) {
      throw new Error('isInactive is required');
    }

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest(`/v2/customer/${customerId}`, {
        method: 'PUT',
        body: {
          isInactive,
        },
      }),
    );
    const response = createCustomerResponseSchema.parse(rawResponse);
    return {
      customerId: response.value.id,
      isInactive: response.value.isInactive,
    };
  }

  async create(input: CreateCustomerInput): Promise<CreateCustomerResult> {
    // Validate input
    const validatedInput = createCustomerInputSchema.parse(input);

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/customer', {
        method: 'POST',
        body: validatedInput,
      }),
    );

    const response = createCustomerResponseSchema.parse(rawResponse);
    return { customerId: response.value.id };
  }
}
