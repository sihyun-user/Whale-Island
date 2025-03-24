import admin from '../config/firebase';
const db = admin.firestore();

export class User {
  uid: string;
  email: string;
  username: string;

  constructor(uid: string, email: string, username: string) {
    this.uid = uid;
    this.email = email;
    this.username = username;
  }
}

export const addUser = async ({ uid, email }: { uid: string; email: string }) =>
  db.collection('users').add({ uid, email, username: '' });
