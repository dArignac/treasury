import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  connectFirestoreEmulator,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./config";
import { FirebaseStore, TSettings } from "./store";

export const getFirestoreUserPath = (userId: string) => `/users/${userId}`;

// if you change anything here, restart the server
export function initFirebase() {
  // initialize Firebase app
  const firebaseApp = initializeApp(firebaseConfig);

  // setup Firestore
  const db = getFirestore();
  if (process.env.NODE_ENV === "development") {
    connectFirestoreEmulator(db, "localhost", 8080);
  }
  FirebaseStore.update((s) => {
    s.firestore = db;
  });

  // get authentication
  const auth = getAuth(firebaseApp);

  // listen to auth state changes
  onAuthStateChanged(auth, async (user) => {
    // store user
    FirebaseStore.update((s) => {
      s.isLoggedIn = user !== null;
      s.user = user;
    });

    // if user is authenticated, attach to settings
    if (user !== null) {
      const docRef = doc(db, getFirestoreUserPath(user.uid));
      const docSnap = await getDoc(docRef);

      // save initial settings if it is a new user
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          tmdbLanguage: "en-US",
          tmdbRegion: "EN",
        });
      }

      // store settings data
      FirebaseStore.update((s) => {
        s.settings = docSnap.data() as TSettings;
      });
    }
  });
}
