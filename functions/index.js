const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.createMovie = functions.firestore
  .document('users/*/movies/{movieId}')
  .onCreate(event => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    var newValue = event.data.data();

    // access a particular field as you would any JS property
    var name = newValue.name;

    // perform desired operations ...
});