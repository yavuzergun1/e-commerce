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
import products from "./products.json";

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

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
console.log("auth", auth.currentUser);

export const createUserDocumentFromAuth = async (
  user,
  additionalInformation = {}
) => {
  if (!user) return;
  // there are 3 things inside doc: database, collection, idetifier
  const userDocRef = doc(db, "users", user.uid);
  console.log("userDocRef", userDocRef);
  const docSnap = await getDoc(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { email, displayName } = user;
    const createdAt = new Date(); /* this'll show as when was data set */

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      console.log("userDocref2", userDocRef);
    } catch (err) {
      console.log(err);
    }
    console.log("user", user);
  }
  // if snapShot exist
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (input) => {
  const { email, password } = input;
  console.log(email);
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// SENDING A JSON FILE TO FIREBASE
export const addCollectionDocuments = async (collectionkey, objectsToAdd) => {
  // const collectionRef = collection(db, collectionkey);
  // await setDoc(doc(db, collectionkey, objectsToAdd));

  await setDoc(doc(db, "products", "products"), {
    products,
  });
  // const batch = writeBatch(db);

  // objectsToAdd.map((object) => {
  //   const docRef = doc(collectionRef, object.title.toLowerCase());
  //   batch.set(docRef, object);
  // });

  // await batch.commit();
  // console.log("done");
};

// GET DATA FROM FIREBASE
export const getCategoriesAndDocuments = async () => {
  const docRef = doc(db, "products", "products");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return data;
  // console.log(docSnap.data());
  //   const q = query(collectionRef);

  //   const querySnapShot = await getDocs(collectionRef);
  //   console.log(querySnapShot);
  // const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
  //   const { title, items } = docSnapShot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
};
