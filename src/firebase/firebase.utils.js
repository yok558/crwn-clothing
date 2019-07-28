import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBR4pN_MlKABETiR64E1mRbTJ6sHuOIa88",
  authDomain: "crwn-db-f120c.firebaseapp.com",
  databaseURL: "https://crwn-db-f120c.firebaseio.com",
  projectId: "crwn-db-f120c",
  storageBucket: "",
  messagingSenderId: "305763919356",
  appId: "1:305763919356:web:4544a171f8a0ef13"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot);

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

