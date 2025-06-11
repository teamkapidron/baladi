import { TripletexClientConfig } from '@/lib/tipletex/types/config';
import { defaultBaseUrl, makeRequest } from '@/lib/tipletex/utils';
import { formatDate } from 'date-fns';
import {
  GetTokenResponse,
  SessionToken,
} from '@/lib/tipletex/types/token.types';

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
      expirationDate: formatDate(args.expirationDate, 'yyyy-MM-dd'),
    };

    const rawResponse = await makeRequest(url, {
      method: 'PUT',
      headers: {
        'User-Agent': this.config.userAgent ?? 'baladi/1.0.0',
      },
      query,
    });

    return rawResponse as GetTokenResponse;
  }
}

export type { SessionToken, GetTokenResponse };
