import { serializeQuery } from '@/lib/tipletex/utils';
import { TripletexBase } from '../base';
import {
  listCustomersResponseSchema,
  ListCustomersResponse,
  Customer,
  createCustomerInputSchema,
  createCustomerResponseSchema,
  CreateCustomerInput,
  CreateCustomerResult,
} from '@/validators/schemas/tripletex/customer.schema';
import { DefaultTripletexInputs } from '@/lib/tipletex/types';

export interface ListCustomersInput extends DefaultTripletexInputs {
  id?: string[];
  customerAccountNumber?: string[];
  organizationNumber?: string;
  email?: string;
  invoiceEmail?: string;
  isInactive?: boolean;
  accountManagerId?: string[];
  changedSince?: Date;
}

export class TripletexCustomer extends TripletexBase {
  async list(input?: ListCustomersInput): Promise<ListCustomersResponse> {
    const query = input ? serializeQuery(input) : {};

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/customer', {
        method: 'GET',
        query,
      }),
    );

    return listCustomersResponseSchema.parse(rawResponse);
  }

  async create(input: CreateCustomerInput): Promise<CreateCustomerResult> {
    // Validate input
    const validatedInput = createCustomerInputSchema.parse(input);

    // Transform input to match API expectations
    const apiPayload = {
      name: validatedInput.name,
      organizationNumber: validatedInput.organizationNumber,
      email: validatedInput.email,
      invoiceEmail: validatedInput.invoiceEmail,
      phoneNumber: validatedInput.phoneNumber,
      phoneNumberMobile: validatedInput.phoneNumberMobile,
      description: validatedInput.description,
      language: validatedInput.language,
      isPrivateIndividual: validatedInput.isPrivateIndividual,
      singleCustomerInvoice: validatedInput.singleCustomerInvoice,
      invoiceSendMethod: validatedInput.invoiceSendMethod,
      emailAttachmentType: validatedInput.emailAttachmentType,
      invoicesDueIn: validatedInput.invoicesDueIn,
      invoicesDueInType: validatedInput.invoicesDueInType,
      isCustomer: validatedInput.isCustomer,
      isSupplier: validatedInput.isSupplier,
      // Transform ID fields to object references
      accountManager: validatedInput.accountManagerId
        ? { id: validatedInput.accountManagerId }
        : undefined,
      currency: validatedInput.currencyId
        ? { id: validatedInput.currencyId }
        : undefined,
    };

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/customer', {
        method: 'POST',
        body: apiPayload,
      }),
    );

    const response = createCustomerResponseSchema.parse(rawResponse);
    return { customerId: response.value.id };
  }
}

export type {
  Customer,
  ListCustomersResponse,
  CreateCustomerInput,
  CreateCustomerResult,
};
