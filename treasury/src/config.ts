type TFirebaseConfig = {
  apiKey: string;
  projectId: string;
  databaseURL: string;
  authDomain: string;
  storageBucket: string;
  messagingSenderId: string;
};

export const firebaseConfig: TFirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY as string,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL as string,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env
    .REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
};

type TTheMovieDatabaseConfig = {
  apiKey: string;
};

export const theMovieDatabaseConfig: TTheMovieDatabaseConfig = {
  apiKey: process.env.REACT_APP_TMDB_API_KEY as string,
};
