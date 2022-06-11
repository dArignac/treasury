import { Store } from "pullstate";
import { Firestore } from "firebase/firestore";
import { User } from "firebase/auth";

export type TSettings = {
  tmdbLanguage: "en-US" | "de-DE";
  tmdbRegion: "EN" | "DE";
};

interface IFirebaseStore {
  firestore: Firestore | null;
  isLoggedIn: boolean;
  movieSearchTerm: string;
  settings: TSettings;
  user: User | null;
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
