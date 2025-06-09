/// <reference path="../apps/admin/env.d.ts" />
/// <reference path="../.sst/platform/config.d.ts" />

export const adminApp = new sst.aws.Nextjs('BaladiAdmin', {
  path: 'apps/admin',
  domain: {
    name: 'admin.baladi.kapidron.live',
    redirects: ['www.admin.baladi.kapidron.live'],
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
