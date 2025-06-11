import { TripletexBase } from '../base';
import {
  createInvoiceResponseSchema,
  CreateInvoiceResult,
  ViewInvoiceResult,
  invoicePdfResponseSchema,
  invoiceSchema,
} from '@/validators/schemas/tripletex/invoice.schema';

export class TripletexInvoice extends TripletexBase {
  async create(
    orderId: number,
    invoiceDate: string,
  ): Promise<CreateInvoiceResult> {
    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest(
        `/v2/order/${orderId}/:invoice?invoiceDate=${invoiceDate}`,
        {
          method: 'PUT',
        },
      ),
    );

    const response = createInvoiceResponseSchema.parse(rawResponse);
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
