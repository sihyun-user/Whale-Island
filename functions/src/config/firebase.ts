import fs from 'fs';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true }); // Firestore 會自動忽略 undefined 屬性

export default admin;
