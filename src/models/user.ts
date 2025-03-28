import admin from '../config/firebase';
const db = admin.firestore();

interface User {
  uid: string;
  email?: string;
  username?: string;
  avatar?: string;
  followers?: string[];
  following?: string[];
  createdAt?: Date;
}

// 更新用戶資料
export const updateUser = async (values: User) =>
  db
    .collection('users')
    .doc(values.uid)
    .set({ ...values });

// 獲取用戶資料
export const getUser = async (uid: string) => db.collection('users').doc(uid).get();
