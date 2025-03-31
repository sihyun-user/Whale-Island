export interface User {
  uid: string;
  email: string;
  username: string;
  avatar: string;
  followers: string[];
  following: string[];
  createdAt: Date;
}
