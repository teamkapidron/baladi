import { serializeQuery } from '@/lib/tipletex/utils';
import { TripletexBase } from '../base';
import {
  listInvoicesResponseSchema,
  ListInvoicesResponse,
  Invoice,
  createInvoiceInputSchema,
  createInvoiceResponseSchema,
  CreateInvoiceInput,
  CreateInvoiceResult,
  ViewInvoiceResult,
  invoicePdfResponseSchema,
  invoiceSchema,
} from '@/validators/schemas/tripletex/invoice.schema';
import { DefaultTripletexInputs } from '@/lib/tipletex/types';

export interface ListInvoicesInput extends DefaultTripletexInputs {
  id?: string[];
  invoiceNumber?: string;
  customerId?: string[];
  invoiceDateFrom?: Date;
  invoiceDateTo?: Date;
  invoiceDueDateFrom?: Date;
  invoiceDueDateTo?: Date;
  kid?: string;
  invoiceComment?: string;
  orderNumber?: string;
}

export class TripletexInvoice extends TripletexBase {
  async list(input?: ListInvoicesInput): Promise<ListInvoicesResponse> {
    const query = input ? serializeQuery(input) : {};

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/invoice', {
        method: 'GET',
        query,
      }),
    );

    return listInvoicesResponseSchema.parse(rawResponse);
  }

  async create(input: CreateInvoiceInput): Promise<CreateInvoiceResult> {
    // Validate input
    const validatedInput = createInvoiceInputSchema.parse(input);

    // Set default dates if not provided
    const today = new Date().toISOString().split('T')[0];
    const invoiceDate = validatedInput.invoiceDate || today;

    let apiPayload: any;

    // If creating from a single order
    if (validatedInput.orderId) {
      // Create invoice from order
      const rawResponse = await this.performRequest(() =>
        this.authenticatedRequest(
          `/v2/order/${validatedInput.orderId}/:invoiceMultipleOrders`,
          {
            method: 'PUT',
            body: {
              invoiceDate,
              invoiceDueDate: validatedInput.invoiceDueDate,
              sendToCustomer: validatedInput.sendToCustomer,
            },
          },
        ),
      );

      const response = createInvoiceResponseSchema.parse(rawResponse);
      return { invoiceId: response.value.id };
    }

    // If creating from multiple orders
    if (validatedInput.orderIds && validatedInput.orderIds.length > 0) {
      const rawResponse = await this.performRequest(() =>
        this.authenticatedRequest('/v2/invoice/:createInvoiceFromOrder', {
          method: 'POST',
          body: {
            orderIds: validatedInput.orderIds,
            invoiceDate,
            invoiceDueDate: validatedInput.invoiceDueDate,
            sendToCustomer: validatedInput.sendToCustomer,
          },
        }),
      );

      const response = createInvoiceResponseSchema.parse(rawResponse);
      return { invoiceId: response.value.id };
    }

    // Create invoice with custom lines
    const invoiceLines = validatedInput.invoiceLines?.map((line) => ({
      product: line.productId ? { id: line.productId } : undefined,
      description: line.description,
      count: line.count,
      unitPriceExcludingVatCurrency: line.unitPriceExcludingVatCurrency,
      unitPriceIncludingVatCurrency: line.unitPriceIncludingVatCurrency,
      discount: line.discount,
      vatType: line.vatTypeId ? { id: line.vatTypeId } : undefined,
      orderLine: line.orderLineId ? { id: line.orderLineId } : undefined,
    }));

    apiPayload = {
      invoiceDate,
      customer: { id: validatedInput.customerId },
      invoiceDueDate: validatedInput.invoiceDueDate,
      kid: validatedInput.kid,
      invoiceComment: validatedInput.invoiceComment,
      comment: validatedInput.comment,
      project: validatedInput.projectId
        ? { id: validatedInput.projectId }
        : undefined,
      invoiceRemarks: validatedInput.invoiceRemarks,
      invoiceReceiver: validatedInput.invoiceReceiver,
      invoiceType: validatedInput.invoiceType,
      currency: validatedInput.currencyId
        ? { id: validatedInput.currencyId }
        : undefined,
      deliveryDate: validatedInput.deliveryDate,
      invoiceLines,
    };

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/invoice', {
        method: 'POST',
        body: apiPayload,
      }),
    );

    const response = createInvoiceResponseSchema.parse(rawResponse);

    // Send to customer if requested
    if (validatedInput.sendToCustomer) {
      await this.performRequest(() =>
        this.authenticatedRequest(`/v2/invoice/${response.value.id}/:send`, {
          method: 'PUT',
          body: {
            sendType: 'DEFAULT',
          },
        }),
      );
    }

    return { invoiceId: response.value.id };
  }

  async view(invoiceId: number): Promise<ViewInvoiceResult> {
    // Get invoice details
    const invoiceResponse = await this.performRequest(() =>
      this.authenticatedRequest(`/v2/invoice/${invoiceId}`, {
        method: 'GET',
      }),
    );

    const invoice = invoiceSchema.parse(invoiceResponse);

    // Get PDF URL
    const pdfResponse = await this.performRequest(() =>
      this.authenticatedRequest(`/v2/invoice/${invoiceId}/pdf`, {
        method: 'GET',
      }),
    );

    const pdfData = invoicePdfResponseSchema.parse(pdfResponse);

    return {
      invoiceUrl: pdfData.url,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
    };
  }
}

export type {
  Invoice,
  ListInvoicesResponse,
  CreateInvoiceInput,
  CreateInvoiceResult,
  ViewInvoiceResult,
};
