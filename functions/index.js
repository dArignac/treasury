const admin = require('firebase-admin');
const functions = require('firebase-functions')


admin.initializeApp();

// Since this code will be running in the Cloud Functions enviornment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();


// triggered when a movie is created
exports.createMovie = functions.firestore
  .document('users/{userId}/movies/{movieId}')
  .onCreate((data, context) => {
    // get the counting document reference for the current user
    const counterRef = firestore.doc(`counters/${context.params.userId}`);

    // encapsulate into transaction
    return firestore.runTransaction(transaction => {
      return transaction.get(counterRef).then(counterDoc => {
        if (counterDoc.exists) {
          // if the movie count property does not exist, we set it to 1. Else we increment.
          var movies = !('movies' in counterDoc.data()) ? 1 : counterDoc.data()['movies'] + 1;
          // update the counts doc with the new movie count
          return transaction.update(
            counterRef,
            {
              movies: movies
            }
          );
        } else {
          return transaction.set(
            counterRef,
            {
              movies: 1
            }
          );
        }
      });
    });
});

// triggered when a movie is deleted
exports.deleteMovie = functions.firestore
  .document('users/{userId}/movies/{movieId}')
  .onDelete((data, context) => {
    // get the counting document reference for the current user
    const counterRef = firestore.doc(`counters/${context.params.userId}`);

    // encapsulate into transaction
    return firestore.runTransaction(transaction => {
      return transaction.get(counterRef).then(counterDoc => {
        // decrement the counter
        var movies = counterDoc.data()['movies'] - 1;
        // update the counts doc with the new movie count
        return transaction.update(
          counterRef,
          {
            movies: movies
          }
        );
      });
    });
});