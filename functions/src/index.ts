import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const FUNCTIONS_REGION = "europe-west1";

admin.initializeApp();

// Since this code will be running in the Cloud Functions environment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();

// note that we access firestore as admin and thus bypass any rules defined for it

// triggered when a movie is created
export const createMovie = functions
  .region(FUNCTIONS_REGION)
  .firestore.document("users/{userId}/movies/{movieId}")
  .onCreate((data, context) => {
    // get the user document reference for the current user
    const userDocRef = firestore.doc(`users/${context.params.userId}`);

    // encapsulate into transaction
    return firestore.runTransaction((transaction) => {
      return transaction.get(userDocRef).then((userDoc) => {
        let movies = 0;

        if (userDoc.exists) {
          const doc = userDoc.data();

          if (doc !== undefined) {
            if (!("movieCount" in doc)) {
              movies = 1;
            } else {
              movies = doc["movieCount"] + 1;
            }

            return transaction.update(userDocRef, {
              movieCount: movies,
            });
          } else {
            return;
          }
        } else {
          return transaction.set(userDocRef, {
            movieCount: ++movies,
          });
        }
      });
    });
  });

// triggered when a movie is deleted
export const deleteMovie = functions
  .region(FUNCTIONS_REGION)
  .firestore.document("users/{userId}/movies/{movieId}")
  .onDelete((data, context) => {
    // get the user document reference for the current user
    const userDocRef = firestore.doc(`users/${context.params.userId}`);

    // encapsulate into transaction
    return firestore.runTransaction((transaction) => {
      return transaction.get(userDocRef).then((counterDoc) => {
        const doc = counterDoc.data();

        if (doc !== undefined) {
          return transaction.update(userDocRef, {
            movieCount: doc["movieCount"] - 1,
          });
        }

        return;
      });
    });
  });
