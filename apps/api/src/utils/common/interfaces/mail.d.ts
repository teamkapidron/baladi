interface VerifyEmailTemplate {
  type: 'verifyEmail';
  data: {
    name: string;
    otp: string;
  };
}

interface AdminApprovalTemplate {
  type: 'adminApproval';
  data: {
    name: string;
    email: string;
    userId: string;
  };
}

interface WelcomeTemplate {
  type: 'welcome';
  data: {
    name: string;
    userType: string;
  };
}

interface PasswordResetTemplate {
  type: 'passwordReset';
  data: {
    name: string;
    resetLink: string;
  };
}

interface AdminCredentialsTemplate {
  type: 'adminCredentials';
  data: {
    name: string;
    password: string;
  };
}

interface WarehouseNotificationTemplate {
  type: 'warehouseNotification';
  data: {
    orderNumber: string;
    productName: string;
    quantity: number;
    customerName: string;
  };
}

interface InventoryAlertTemplate {
  type: 'inventoryAlert';
  data: {
    products: {
      productName: string;
      productImage: string;
      totalQuantity: number;
    }[];
  };
}

export type MailTemplate =
  | VerifyEmailTemplate
  | AdminApprovalTemplate
  | WelcomeTemplate
  | PasswordResetTemplate
  | AdminCredentialsTemplate
  | WarehouseNotificationTemplate
  | InventoryAlertTemplate;
