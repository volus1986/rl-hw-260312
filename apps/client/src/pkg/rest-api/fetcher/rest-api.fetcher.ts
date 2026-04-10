import ky, { type KyInstance } from 'ky';

import { envClient } from '@/config/env';

// fetchers
export const restApiFetcher: KyInstance = ky.create({
  prefix: `${envClient.NEXT_PUBLIC_REST_API_URL}`,
  throwHttpErrors: false,
  retry: 3,
});
