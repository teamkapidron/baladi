import { TripletexClientConfig } from '@/lib/tipletex/types';
import { defaultBaseUrl, formatDate, makeRequest } from '@/lib/tipletex/utils';
import {
  getTokenResponseSchema,
  GetTokenResponse,
  SessionToken,
} from '@/validators/schemas/tripletex/token.schema';

export interface CreateSessionTokenInput {
  employeeToken: string;
  consumerToken: string;
  expirationDate: Date;
}

export class TripletexToken {
  constructor(readonly config: TripletexClientConfig) {}

  async createSessionToken(
    args: CreateSessionTokenInput,
  ): Promise<GetTokenResponse> {
    const baseUrl = this.config.baseUrl ?? defaultBaseUrl;
    const url = `${baseUrl.replace(/\/$/, '')}/v2/token/session/:create`;

    const query = {
      ...args,
      expirationDate: formatDate(args.expirationDate),
    };

    const rawResponse = await makeRequest(url, {
      method: 'PUT',
      headers: {
        'User-Agent': this.config.userAgent ?? 'baladi/1.0.0',
      },
      query,
    });

    return getTokenResponseSchema.parse(rawResponse);
  }
}

export type { SessionToken, GetTokenResponse };
