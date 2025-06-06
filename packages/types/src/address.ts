export interface Address {
  _id: string;
  userId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  label?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}
