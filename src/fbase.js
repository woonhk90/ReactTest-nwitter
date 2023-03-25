import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

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
export const dbGetDoc = getDocs;

export const dbSnapshot = onSnapshot; // 데이터베이스에서 무슨일이 있을 때, 알림을 받음
export const dbQuery = query;

export const dbDoc = doc; // 삭제, 수정
export const dbDelete = deleteDoc; // 삭제
export const dbUpdate = updateDoc; // 삭제

export const upStorage = getStorage();
export const upRef = ref;
export const upPutString = uploadString;
export const upGetDownLoadURL = getDownloadURL;
