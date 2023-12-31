// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
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
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxxw2shzRM9QAZvzm9f9pAzUFvJmoa3D4",
  authDomain: "crown-db-f31ce.firebaseapp.com",
  projectId: "crown-db-f31ce",
  storageBucket: "crown-db-f31ce.appspot.com",
  messagingSenderId: "74549602728",
  appId: "1:74549602728:web:a3a1b48165125db5c1d59d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Login fucntion
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// DB function
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  arrayData,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  arrayData.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCollectionAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  authUser,
  additionalInformation = {
    displayName: "",
  }
) => {
  const userDocRef = doc(db, "users", authUser.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    let { displayName, email } = authUser;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error when creating user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
