

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDR_a2_bMTTiX1_xx14Eunt4nkCk2FIFI4",
  authDomain: "todo-app-mehmet-57631.firebaseapp.com",
  projectId: "todo-app-mehmet-57631",
  storageBucket: "todo-app-mehmet-57631.firebasestorage.app",
  messagingSenderId: "827590258756",
  appId: "1:827590258756:web:a06b29b7608ef65197cc11",
  measurementId: "G-J3TQSVWBPE"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
