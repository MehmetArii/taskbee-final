// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Senin verdiğin config değerleri:
const firebaseConfig = {
  apiKey: "AIzaSyDR_a2_bMTTiX1_xx14Eunt4nkCk2FIFI4",
  authDomain: "todo-app-mehmet-57631.firebaseapp.com",
  projectId: "todo-app-mehmet-57631",
  storageBucket: "todo-app-mehmet-57631.firebasestorage.app",
  messagingSenderId: "827590258756",
  appId: "1:827590258756:web:a06b29b7608ef65197cc11",
  measurementId: "G-J3TQSVWBPE"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);

// Modülleri dışa aktar
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
