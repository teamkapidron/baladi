import { ApiData } from '@/utils/types.util';
import { Admin } from '@repo/types/admin';
import { Config } from '@repo/types/config';

export type SiteConfigBody = {
  showPalette: boolean;
};

export type UpdateAdminPasswordSchema = {
  body: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
};

export type GetAdminProfileRequest = ApiData<
  undefined,
  {
    admin: Admin;
  }
>;

export type UpdateAdminPasswordRequest = ApiData<
  UpdateAdminPasswordSchema['body'],
  {
    admin: Admin;
  }
>;

export type GetAllAdminsRequest = ApiData<
  undefined,
  {
    admins: Admin[];
  }
>;

export type CreateAdminSchema = {
  body: {
    name: string;
    email: string;
  };
};

export type CreateAdminResponse = ApiData<
  CreateAdminSchema['body'],
  {
    admin: Admin;
  }
>;

export type SiteConfigRequest = ApiData<
  undefined,
  {
    config: Config;
  }
>;

export type UpdateSiteConfigSchema = {
  body: {
    config: Config;
  };
};

export type UpdateSiteConfigRequest = ApiData<
  SiteConfigBody,
  {
    config: Config;
  }
>;
