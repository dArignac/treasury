import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./config";

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
		// FIXME persist to global state
		console.log("onAuthStateChanged", user);
	});
}
