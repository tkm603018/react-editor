import firebase from 'firebase/app'
import 'firebase/auth'
import'firebase/database'
import 'firebase/storage'
import 'firebase/analytics'

export const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

export const firebaseApp = firebase.initializeApp(config);
export const DB = firebase.database();
export const storage = firebase.storage();

