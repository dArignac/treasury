import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./config";
import { FirebaseStore } from "./store";

export default function initFirebase() {
	try {
		firebase.app();
	} catch (err) {
		if (err.code === "app/no-app") {
			firebase.initializeApp(firebaseConfig);
		} else {
			throw err;
		}
	}
	firebase.auth().onAuthStateChanged((user) => {
		FirebaseStore.update((s) => {
			s.isLoggedIn = user !== null;
			s.user = user;
		});
	});
}
