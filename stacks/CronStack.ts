/// <reference path="../.sst/platform/config.d.ts" />
/// <reference path="../apps/cron/env.d.ts" />

export const cron = new sst.aws.Cron('InventoryAlertCron', {
  schedule: 'cron(0 22 * * ? *)',
  function: {
    handler: 'apps/cron/src/handlers/inventoryAlert.handler',
    environment: {
      MONGO_URI: process.env.MONGO_URI,
    },
  },
});
