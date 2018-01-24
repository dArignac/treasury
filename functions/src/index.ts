import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!\n\n');
 });

/*
export const countMovies = functions.firestore
  .document('users/{userId}/movies').onCreate(event => {
    console.log('creation test');
  });
*/
