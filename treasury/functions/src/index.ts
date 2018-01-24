import * as functions from 'firebase-functions';

exports.countMovies = functions.firestore
  .document('users/{userId}/movies').onCreate(event => {
    console.log('creation test');
  });
