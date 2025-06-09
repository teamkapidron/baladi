/// <reference path="../apps/user/env.d.ts" />
/// <reference path="../.sst/platform/config.d.ts" />

export const userApp = new sst.aws.Nextjs('BaladiUser', {
  path: 'apps/user',
  domain: {
    name: 'baladi.kapidron.live',
    redirects: ['www.baladi.kapidron.live'],
    dns: sst.cloudflare.dns({
      zone: '5519bd9abe01426f810235a523330954',
    }),
  },
  environment: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_USER_URL: process.env.NEXT_PUBLIC_USER_URL,
    NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL,
  },
});
