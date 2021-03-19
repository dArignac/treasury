import { Store } from "pullstate";

interface IFirebaseStore {
	isLoggedIn: boolean;
	user: any;
}

export const FirebaseStore = new Store<IFirebaseStore>({
	isLoggedIn: false,
	user: null,
});
