export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  isActive?: boolean;
  visibleToStore: boolean;
  parentID?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
