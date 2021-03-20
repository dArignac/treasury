import { Store } from "pullstate";
import firebase from "firebase/app";

interface IFirebaseStore {
	firestore: firebase.firestore.Firestore | null;
	isLoggedIn: boolean;
	user: firebase.User | null;
}

export const FirebaseStore = new Store<IFirebaseStore>({
	firestore: null,
	isLoggedIn: false,
	user: null,
});
