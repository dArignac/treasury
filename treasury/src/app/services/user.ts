export interface User {
  displayName: string;
  email: string;
  isEmailVerified: boolean;
  photoURL: string;
  isCatalogPublic: boolean;
  items: object;
}
