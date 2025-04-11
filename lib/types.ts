export interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
