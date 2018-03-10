const admin = require('firebase-admin');
const functions = require('firebase-functions')


admin.initializeApp(functions.config().firebase);

// Since this code will be running in the Cloud Functions enviornment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();


// triggered when a movie is created
exports.createMovie = functions.firestore
  .document('users/{userId}/movies/{movieId}')
  .onCreate(event => {
    // get the counting document reference for the current user
    const countsRef = firestore.doc(`counts/${event.params.userId}`);

    // encapsulate into transaction
    return firestore.runTransaction(transaction => {
      return transaction.get(countsRef).then(countsDoc => {
        if (countsDoc.exists) {
          // if the movie count property does not exist, we set it to 1. Else we increment.
          var movieCount = !('movieCount' in countsDoc.data()) ? 1 : countsDoc.data()['movieCount'] + 1;
          // update the counts doc with the new movie count
          return transaction.update(
            countsRef,
            {
              movieCount: movieCount
            }
          );
        } else {
          return transaction.set(
            countsRef,
            {
              movieCount: 1
            }
          );
        }
      });
    });
});

// triggered when a movie is deleted
exports.deleteMovie = functions.firestore
  .document('users/{userId}/movies/{movieId}')
  .onDelete(event => {
    // get the counting document reference for the current user
    const countsRef = firestore.doc(`counts/${event.params.userId}`);

    // encapsulate into transaction
    return firestore.runTransaction(transaction => {
      return transaction.get(countsRef).then(countsDoc => {
        // decrement the counter
        var movieCount = countsDoc.data()['movieCount'] - 1;
        // update the counts doc with the new movie count
        return transaction.update(
          countsRef,
          {
            movieCount: movieCount
          }
        );
      });
    });
});