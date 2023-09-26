// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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
export const createUserDocumentFromAuth = async (authUser) => {
  const userDocRef = doc(db, "users", authUser.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = authUser;
    const creaatedAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        creaatedAt,
      });
    } catch (error) {
      console.log("error when creating user", error.message);
    }
  }
  return userDocRef;
};