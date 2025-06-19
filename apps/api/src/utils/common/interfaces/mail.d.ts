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
    createdAt: string;
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

interface UserApprovalConfirmationTemplate {
  type: 'userApprovalConfirmation';
  data: {
    name: string;
    email: string;
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

interface OrderPlacedTemplate {
  type: 'orderPlaced';
  data: {
    order: OrderResponse;
  };
}

export type MailTemplate =
  | VerifyEmailTemplate
  | AdminApprovalTemplate
  | PasswordResetTemplate
  | AdminCredentialsTemplate
  | WarehouseNotificationTemplate
  | InventoryAlertTemplate
  | UserApprovalConfirmationTemplate
  | OrderPlacedTemplate;
