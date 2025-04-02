export interface User {
  uid: string;
  email: string;
  username: string;
  description: string;
  avatar: string;
  followers: string[];
  following: string[];
  createdAt: number;
}

export interface AuthUser {
  uid: string;
  username: string;
  avatar: string;
}
