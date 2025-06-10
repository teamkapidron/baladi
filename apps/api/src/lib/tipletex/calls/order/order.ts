import { serializeQuery, formatDate } from '@/lib/tipletex/utils';
import { TripletexBase } from '../base';
import {
  listOrdersResponseSchema,
  ListOrdersResponse,
  Order,
  CreateOrderInput,
  CreateOrderResult,
  createOrderInputSchema,
  createOrderResponseSchema,
} from '@/validators/schemas/tripletex/order.schema';
import { DefaultTripletexInputs } from '@/lib/tipletex/types';

export interface ListOrdersInput extends DefaultTripletexInputs {
  id?: string[];
  number?: string;
  customerId?: string[];
  isClosed?: boolean;
  orderDateFrom?: Date;
  orderDateTo?: Date;
  deliveryDateFrom?: Date;
  deliveryDateTo?: Date;
  projectId?: string[];
}

export class TripletexOrder extends TripletexBase {
  async list(input?: ListOrdersInput): Promise<ListOrdersResponse> {
    const query = input ? serializeQuery(input) : {};

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/order', {
        method: 'GET',
        query,
      }),
    );

    return listOrdersResponseSchema.parse(rawResponse);
  }

  async create(input: CreateOrderInput): Promise<CreateOrderResult> {
    // Validate input
    const validatedInput = createOrderInputSchema.parse(input);

    // Set default dates if not provided
    const today = new Date().toISOString().split('T')[0];
    const orderDate = validatedInput.orderDate || today;
    const deliveryDate = validatedInput.deliveryDate || today;

    // Transform order lines
    const orderLines = validatedInput.orderLines.map((line) => ({
      product: line.productId ? { id: line.productId } : undefined,
      description: line.description,
      count: line.count,
      unitPriceExcludingVatCurrency: line.unitPriceExcludingVatCurrency,
      unitPriceIncludingVatCurrency: line.unitPriceIncludingVatCurrency,
      discount: line.discount,
      vatType: line.vatTypeId ? { id: line.vatTypeId } : undefined,
    }));

    // Transform input to match API expectations
    const apiPayload = {
      customer: { id: validatedInput.customerId },
      contact: validatedInput.contactId
        ? { id: validatedInput.contactId }
        : undefined,
      attn: validatedInput.attnId ? { id: validatedInput.attnId } : undefined,
      receiverEmail: validatedInput.receiverEmail,
      overdueNoticeEmail: validatedInput.overdueNoticeEmail,
      reference: validatedInput.reference,
      ourContact: validatedInput.ourContactId
        ? { id: validatedInput.ourContactId }
        : undefined,
      ourContactEmployee: validatedInput.ourContactEmployeeId
        ? { id: validatedInput.ourContactEmployeeId }
        : undefined,
      department: validatedInput.departmentId
        ? { id: validatedInput.departmentId }
        : undefined,
      orderDate,
      project: validatedInput.projectId
        ? { id: validatedInput.projectId }
        : undefined,
      invoiceComment: validatedInput.invoiceComment,
      currency: validatedInput.currencyId
        ? { id: validatedInput.currencyId }
        : undefined,
      invoicesDueIn: validatedInput.invoicesDueIn,
      invoicesDueInType: validatedInput.invoicesDueInType,
      isShowOpenPostsOnInvoices: validatedInput.isShowOpenPostsOnInvoices,
      deliveryDate,
      deliveryAddress: validatedInput.deliveryAddressId
        ? { id: validatedInput.deliveryAddressId }
        : undefined,
      deliveryComment: validatedInput.deliveryComment,
      isPrioritizeAmountsIncludingVat:
        validatedInput.isPrioritizeAmountsIncludingVat,
      orderLineSorting: validatedInput.orderLineSorting,
      orderLines,
      isSubscription: validatedInput.isSubscription,
      subscriptionDuration: validatedInput.subscriptionDuration,
      subscriptionDurationType: validatedInput.subscriptionDurationType,
      subscriptionPeriodsOnInvoice: validatedInput.subscriptionPeriodsOnInvoice,
      subscriptionInvoicingTimeInAdvanceOrArrears:
        validatedInput.subscriptionInvoicingTimeInAdvanceOrArrears,
      subscriptionInvoicingTime: validatedInput.subscriptionInvoicingTime,
      subscriptionInvoicingTimeType:
        validatedInput.subscriptionInvoicingTimeType,
      isSubscriptionAutoInvoicing: validatedInput.isSubscriptionAutoInvoicing,
    };

    const rawResponse = await this.performRequest(() =>
      this.authenticatedRequest('/v2/order', {
        method: 'POST',
        body: apiPayload,
      }),
    );

    const response = createOrderResponseSchema.parse(rawResponse);
    return { orderId: response.value.id };
  }
}

export type { Order, ListOrdersResponse, CreateOrderInput, CreateOrderResult };
