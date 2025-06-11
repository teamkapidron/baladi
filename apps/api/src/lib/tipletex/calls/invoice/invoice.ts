import { TripletexBase } from '../base';
import {
  CreateInvoiceResult,
  Invoice,
  InvoicePdfResponse,
  ViewInvoiceResult,
} from '@/lib/tipletex/types/invoice.types';

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

    return rawResponse as CreateInvoiceResult;
  }

  async view(invoiceId: number): Promise<ViewInvoiceResult> {
    // Get invoice details
    const invoiceResponse = await this.performRequest(() =>
      this.authenticatedRequest(`/v2/invoice/${invoiceId}`, {
        method: 'GET',
      }),
    );

    const invoice = invoiceResponse as Invoice;

    // Get PDF URL
    const pdfResponse = await this.performRequest(() =>
      this.authenticatedRequest(`/v2/invoice/${invoiceId}/pdf`, {
        method: 'GET',
      }),
    );

    const pdfData = pdfResponse as InvoicePdfResponse;

    return {
      invoiceUrl: pdfData.url,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
    };
  }
}
