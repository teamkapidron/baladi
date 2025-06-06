'use server';

import { API_URL } from '@/constants/url.constants';
import type { GetUserDataRequest } from '@/hooks/useAuth/types';

export async function getUser(token: string) {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  const data = (await response.json()) as GetUserDataRequest['response'];

  return data.data.user;
}
