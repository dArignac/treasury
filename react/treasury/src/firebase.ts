import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./config";
import { FirebaseStore, TSettings } from "./store";

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
			db.doc("/settings/" + user.uid).onSnapshot((doc) => {
				FirebaseStore.update((s) => {
					s.settings = doc.data() as TSettings;
				});
			});
		}
	});
}
