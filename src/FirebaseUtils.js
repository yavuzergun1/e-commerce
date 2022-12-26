import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuEA1F7pMLqXZHBaatTZxyV-k4e64m2I4",
  authDomain: "e-commerce-with-admin-panel.firebaseapp.com",
  projectId: "e-commerce-with-admin-panel",
  storageBucket: "e-commerce-with-admin-panel.appspot.com",
  messagingSenderId: "287352330373",
  appId: "1:287352330373:web:45d2dc7dfcda2224d631ec",
  measurementId: "G-FZLBM1RVM0",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
console.log("auth", auth);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const createUserDocumentFromAuth = async (
  user,
  additionalInformation = {}
) => {
  if (!user) return;
  // there are 3 things inside doc: database, collection, idetifier
  const userDocRef = doc(db, "users", user.uid);
  // console.log("userDocRef", userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  // console.log("isExist", userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { email } = user;
    const createdAt = new Date(); /* this'll show as when was data set */

    try {
      await setDoc(userDocRef, {
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log(err);
    }
    console.log("user", user);
  }
  console.log("userDocref2", userDocRef);
  // if snapShot exist
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
