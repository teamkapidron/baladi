import { format, isValid } from 'date-fns';
import { z } from 'zod';
import axios from 'axios';

export const defaultBaseUrl = 'https://tripletex.no/';

export function pickFromObject<
  T extends Record<string, unknown>,
  K extends keyof T,
>(subject: T, ...keys: K[]): Pick<T, K> {
  const pairs = keys
    .map((key) => [key, subject[key]])
    .filter(([, val]) => val !== undefined)
    .map(([key, val]) => [key, val]);
  return Object.fromEntries(pairs);
}

export function withZodSchema<T>(schema: z.ZodSchema<T>): (data: unknown) => T {
  return (data) => {
    return schema.parse(data);
  };
}

export function multipleValuesEnvelope<T>(schema: z.ZodSchema<T>) {
  return z.object({
    from: z.number(),
    count: z.number(),
    versionDigest: z.string().nullable().optional(),
    values: z.array(schema),
  });
}

export function singleValueEnvelope<T>(schema: z.ZodSchema<T>) {
  return z.object({
    value: schema,
  });
}

export function formatDate(d: Date | number): string {
  return format(d, 'yyyy-MM-dd');
}

export function formatMonthYear(d: Date | number): string {
  return format(d, 'yyyy-MM');
}

export function toString(d: unknown): string | undefined {
  if (!d) {
    return undefined;
  }

  if (d instanceof Date) {
    return formatDate(d);
  }

  if (Array.isArray(d)) {
    return d.map((value) => toString(value)).join(',');
  }

  return String(d);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function serializeQuery<T extends Object>(
  query: T,
): Record<string, string> {
  return Object.entries(query).reduce<Record<string, string>>(
    (q, [key, value]) => {
      const stringifiedValue = toString(value);

      if (key && stringifiedValue) {
        q[key] = stringifiedValue;
      }

      return q;
    },
    {},
  );
}

export function omitEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === 'object' && Object.keys(value).length === 0)
    ) {
      result[key as keyof T] = value;
    }
  }

  return result;
}

export function parseValidationError(error: unknown) {
  if (error instanceof z.ZodError) {
    throw new Error(
      JSON.stringify({
        issues: error.issues,
        name: 'ZodError',
      }),
    );
  }

  throw error;
}

export function isDate(input: any): input is Date {
  const date = new Date(input);

  if (!isValid(date)) {
    return false;
  }

  return true;
}

export const resourceRef = z
  .object({
    id: z.number(),
  })
  .nullable()
  .optional();

export class TripletexError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any,
  ) {
    super(message);
    this.name = 'TripletexError';
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
