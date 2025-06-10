/// <reference path="../.sst/platform/config.d.ts" />

export const bucket = new sst.aws.Bucket('baladi', {
  cors: {
    allowOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://baladi.kapidron.live',
      'https://www.baladi.kapidron.live',
      'https://admin.baladi.kapidron.live',
      'https://www.admin.baladi.kapidron.live',
    ],
    allowMethods: ['DELETE', 'GET', 'HEAD', 'POST', 'PUT'],
    allowHeaders: ['*'],
  },
});
