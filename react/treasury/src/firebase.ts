import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./config";
import { FirebaseStore } from "./store";

function initFirebase() {
	try {
		firebase.app();
	} catch (err) {
		if (err.code === "app/no-app") {
			firebase.initializeApp(firebaseConfig);
		} else {
			throw err;
		}
	}
	FirebaseStore.update((s) => {
		s.firestore = firebase.firestore();
	});
	firebase.auth().onAuthStateChanged((user) => {
		FirebaseStore.update((s) => {
			s.isLoggedIn = user !== null;
			s.user = user;
		});
	});
}

export { initFirebase };
