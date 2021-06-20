import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./config";
import { FirebaseStore, TSettings } from "./store";

export const getFirestoreUserPath = (userId: string) => `/users/${userId}`;

export function initFirebase() {
  try {
    firebase.app();
  } catch (err) {
    if (err.code === "app/no-app") {
      firebase.initializeApp(firebaseConfig);
    } else {
      throw err;
    }
  }
  const db = firebase.firestore();
  if (process.env.NODE_ENV === "development") {
    db.useEmulator("localhost", 8080);
  }
  FirebaseStore.update((s) => {
    s.firestore = db;
  });
  firebase.auth().onAuthStateChanged((user) => {
    // store user
    FirebaseStore.update((s) => {
      s.isLoggedIn = user !== null;
      s.user = user;
    });
    // if user is authenticated, attach to settings
    if (user !== null) {
      db.doc(getFirestoreUserPath(user.uid)).onSnapshot((doc) => {
        // initial settings setup
        if (!doc.exists) {
          db.doc(getFirestoreUserPath(user.uid)).set({
            tmdbLanguage: "en-US",
            tmdbRegion: "EN",
          });
        }
        FirebaseStore.update((s) => {
          s.settings = doc.data() as TSettings;
        });
      });
    }
  });
}
