import { Store } from "pullstate";
import firebase from "firebase/app";

export type TSettings = {
  tmdbLanguage: "en-US" | "de-DE";
  tmdbRegion: "EN" | "DE";
};

interface IFirebaseStore {
  firestore: firebase.firestore.Firestore | null;
  isLoggedIn: boolean;
  movieSearchTerm: string;
  settings: TSettings;
  user: firebase.User | null;
}

export const FirebaseStore = new Store<IFirebaseStore>({
  firestore: null,
  isLoggedIn: false,
  movieSearchTerm: "",
  settings: {
    tmdbLanguage: "en-US",
    tmdbRegion: "EN",
  },
  user: null,
});
