import { TripletexBase } from '../base';
import {
  CreateCustomerInput,
  CreateCustomerResponse,
  CreateCustomerResult,
} from '@/lib/tipletex/types/customer.types';

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
    const response = rawResponse as CreateCustomerResponse;
    return {
      customerId: response.value.id,
      isInactive: response.value.isInactive ?? false,
    };
  }

  async create(input: CreateCustomerInput): Promise<CreateCustomerResult> {
    // Validate input

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/customer', {
        method: 'POST',
        body: input,
      }),
    );

    const response = rawResponse as CreateCustomerResponse;
    return { customerId: response.value.id };
  }
}
