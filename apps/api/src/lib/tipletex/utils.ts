import { format, isValid } from 'date-fns';
import axios from 'axios';

export const defaultBaseUrl = 'https://api-test.tripletex.tech/';

export function formatDate(d: Date | number): string {
  return format(d, 'yyyy-MM-dd');
}

export function formatMonthYear(d: Date | number): string {
  return format(d, 'yyyy-MM');
}

export class TripletexError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any,
  ) {
    super(TripletexError.formatMessage(message, response));
    this.name = 'TripletexError';
  }

  private static formatMessage(message: string, response?: any): string {
    if (response?.validationMessages) {
      const details = JSON.stringify(
        response.validationMessages.map((msg: any) => ({
          field: msg.field,
          message: msg.message,
        })),
        null,
        2,
      );
      return `${message}\nValidation Details:\n${details}`;
    }
    return message;
  }
}

export async function makeRequest<T>(
  url: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    query?: Record<string, string>;
  } = {},
): Promise<T> {
  const { method = 'GET', headers = {}, body, query } = options;

  try {
    const response = await axios({
      url,
      method: method as any,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: body,
      params: query,
    });
    return response.data as T;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new TripletexError(
        `HTTP ${error.response?.status}: ${error.response?.statusText || error.message}`,
        error.response?.status,
        error.response?.data,
      );
    }
    throw new TripletexError(
      error instanceof Error ? error.message : 'Unknown error occurred',
    );
  }
}
