import { TripletexCustomer } from './calls/customer/customer';
import { TripletexOrder } from './calls/order/order';
import { TripletexToken } from './calls/token/token';
import { TripletexClientConfig } from '@/lib/tipletex/types/config';
import { TripletexProduct } from './calls/product/product';
import { TripletexInvoice } from './calls/invoice/invoice';
import type {
  CreateCustomerInput,
  CreateCustomerResult,
} from '@/lib/tipletex/types/customer.types';
import type {
  CreateProductInput,
  CreateProductResult,
} from '@/lib/tipletex/types/product.types';
import type {
  CreateOrderInput,
  CreateOrderResult,
} from '@/lib/tipletex/types/order.types';
import type {
  CreateInvoiceResult,
  ViewInvoiceResult,
} from '@/lib/tipletex/types/invoice.types';
import { addDays } from 'date-fns';

export class Tripletex {
  public customer: TripletexCustomer;
  public product: TripletexProduct;
  public order: TripletexOrder;
  public invoice: TripletexInvoice;

  private tokenClient: TripletexToken;
  private sessionToken?: string;
  private tokenPromise?: Promise<string>;

  constructor(private readonly config: TripletexClientConfig) {
    this.tokenClient = new TripletexToken(config);

    this.customer = new TripletexCustomer(config);
    this.product = new TripletexProduct(config);
    this.order = new TripletexOrder(config);
    this.invoice = new TripletexInvoice(config);
  }

  private async getSessionToken(): Promise<string> {
    if (this.sessionToken) {
      return this.sessionToken;
    }

    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    this.tokenPromise = this.createSessionToken();
    this.sessionToken = await this.tokenPromise;
    return this.sessionToken;
  }

  private async createSessionToken(): Promise<string> {
    const sessionTokenResponse = await this.tokenClient.createSessionToken({
      employeeToken: this.config.employeeToken ?? '',
      consumerToken: this.config.consumerToken ?? '',
      expirationDate: addDays(new Date(), 2),
    });

    return sessionTokenResponse.value.token;
  }

  private async initializeSession(): Promise<void> {
    const token = await this.getSessionToken();

    // Update all service instances with the session token

    this.customer = new TripletexCustomer(this.config, token);
    this.product = new TripletexProduct(this.config, token);
    this.order = new TripletexOrder(this.config, token);
    this.invoice = new TripletexInvoice(this.config, token);
  }

  async createCustomer(
    input: CreateCustomerInput,
  ): Promise<CreateCustomerResult> {
    await this.initializeSession();
    return this.customer.create(input);
  }

  async makeCustomerActive(
    customerId: number,
    isInactive: boolean,
  ): Promise<CreateCustomerResult> {
    await this.initializeSession();
    return this.customer.makeCustomerActive(customerId, isInactive);
  }

  async createProduct(input: CreateProductInput): Promise<CreateProductResult> {
    await this.initializeSession();
    return this.product.create(input);
  }

  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    await this.initializeSession();
    return this.order.create(input);
  }

  async createInvoice(
    orderId: number,
    invoiceDate: string,
  ): Promise<CreateInvoiceResult> {
    await this.initializeSession();
    return this.invoice.create(orderId, invoiceDate);
  }

  async viewInvoice(invoiceId: number): Promise<ViewInvoiceResult> {
    await this.initializeSession();
    return this.invoice.view(invoiceId);
  }
}
