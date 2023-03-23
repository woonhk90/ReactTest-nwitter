import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);

export const google = GoogleAuthProvider;
export const github = GithubAuthProvider;
export const authService = getAuth();
export const createUserEmailPassword = createUserWithEmailAndPassword;
export const signInEmailPassword = signInWithEmailAndPassword;
export const signInPopup = signInWithPopup;

export const dbService = getFirestore();
export const dbAddDoc = addDoc;
export const dbCollection = collection;
