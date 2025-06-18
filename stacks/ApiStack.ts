/// <reference path="../apps/api/env.d.ts" />
/// <reference path="../.sst/platform/config.d.ts" />

export const api = new sst.aws.ApiGatewayV1('BaladiApi', {
  domain: {
    name: 'api.baladi.kapidron.live',
    dns: sst.cloudflare.dns({
      zone: '5519bd9abe01426f810235a523330954',
    }),
  },
  cors: false,
  endpoint: {
    type: 'regional',
  },
});

api.route('ANY /', {
  handler: 'apps/api/index.handler',
});

api.route('ANY /{proxy+}', {
  handler: 'apps/api/index.handler',
  environment: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    COOKIE_EXPIRY: process.env.COOKIE_EXPIRY,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    SMTP_NAME: process.env.SMTP_NAME,
    SMTP_MAIL: process.env.SMTP_MAIL,
    SMTP_REPLY_TO: process.env.SMTP_REPLY_TO,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    ADMIN_API_KEY: process.env.ADMIN_API_KEY,
    WAREHOUSE_EMAIL: process.env.WAREHOUSE_EMAIL,
  },
});

api.deploy();
