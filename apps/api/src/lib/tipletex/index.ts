import { TripletexCustomer } from './calls/customer/customer';
import { TripletexOrder } from './calls/order/order';
import { TripletexToken } from './calls/token/token';
import { TripletexClientConfig } from '@/lib/tipletex/types';
import { TripletexProduct } from './calls/product/product';
import { TripletexInvoice } from './calls/invoice/invoice';
import type {
  CreateCustomerInput,
  CreateCustomerResult,
  Customer,
} from '@/validators/schemas/tripletex/customer.schema';
import type {
  CreateProductInput,
  CreateProductResult,
  Product,
} from '@/validators/schemas/tripletex/product.schema';
import type {
  CreateOrderInput,
  CreateOrderResult,
  Order,
} from '@/validators/schemas/tripletex/order.schema';
import type {
  CreateInvoiceInput,
  CreateInvoiceResult,
  ViewInvoiceResult,
  Invoice,
} from '@/validators/schemas/tripletex/invoice.schema';

// Factory class for creating Tripletex instances

export class TripletexFactory {
  constructor(private readonly config: TripletexClientConfig) {}

  async create(): Promise<Tripletex> {
    const tokenService = new TripletexToken(this.config);
    const sessionTokenResponse = await tokenService.createSessionToken({
      employeeToken: this.config.employeeToken ?? '',
      consumerToken: this.config.consumerToken ?? '',
      expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    return new Tripletex(this.config, sessionTokenResponse.value.token);
  }
}

// Main Tripletex client class
export class Tripletex {
  public readonly customer: TripletexCustomer;
  public readonly product: TripletexProduct;
  public readonly order: TripletexOrder;
  public readonly invoice: TripletexInvoice;

  constructor(config: TripletexClientConfig, sessionToken?: string) {
    this.customer = new TripletexCustomer(config, sessionToken);
    this.product = new TripletexProduct(config, sessionToken);
    this.order = new TripletexOrder(config, sessionToken);
    this.invoice = new TripletexInvoice(config, sessionToken);
  }
}

// Export main class constructors
export { TripletexCustomer } from './calls/customer/customer';
export { TripletexProduct } from './calls/product/product';
export { TripletexOrder } from './calls/order/order';
export { TripletexInvoice } from './calls/invoice/invoice';

// Export types
export type { TripletexClientConfig } from './types';
export type { CreateCustomerInput, CreateCustomerResult, Customer };
export type { CreateProductInput, CreateProductResult, Product };
export type { CreateOrderInput, CreateOrderResult, Order };
export type {
  CreateInvoiceInput,
  CreateInvoiceResult,
  ViewInvoiceResult,
  Invoice,
};

// Convenience functions for the main operations
export async function createCustomer(
  config: TripletexClientConfig,
  input: CreateCustomerInput,
  sessionToken?: string,
): Promise<CreateCustomerResult> {
  const tripletex = new Tripletex(config, sessionToken);
  return tripletex.customer.create(input);
}

export async function createProduct(
  config: TripletexClientConfig,
  input: CreateProductInput,
  sessionToken?: string,
): Promise<CreateProductResult> {
  const tripletex = new Tripletex(config, sessionToken);
  return tripletex.product.create(input);
}

export async function createOrder(
  config: TripletexClientConfig,
  input: CreateOrderInput,
  sessionToken?: string,
): Promise<CreateOrderResult> {
  const tripletex = new Tripletex(config, sessionToken);
  return tripletex.order.create(input);
}

export async function createInvoice(
  config: TripletexClientConfig,
  input: CreateInvoiceInput,
  sessionToken?: string,
): Promise<CreateInvoiceResult> {
  const tripletex = new Tripletex(config, sessionToken);
  return tripletex.invoice.create(input);
}

export async function viewInvoice(
  config: TripletexClientConfig,
  invoiceId: number,
  sessionToken?: string,
): Promise<ViewInvoiceResult> {
  const tripletex = new Tripletex(config, sessionToken);
  return tripletex.invoice.view(invoiceId);
}
