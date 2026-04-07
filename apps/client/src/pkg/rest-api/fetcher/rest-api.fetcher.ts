import ky, { type KyInstance } from 'ky';

import { envClient } from '@/config/env';

// fetchers
export const restApiFetcher: KyInstance = ky.create({
  baseUrl: `${envClient.NEXT_PUBLIC_POSTS_API_URL}`,
  throwHttpErrors: false,
});
