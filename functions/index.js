const functions = require('firebase-functions')

exports.createMovie = functions.firestore
  .document('users/{userId}/movies/{movieId}')
  .onCreate(event => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    //var newValue = event.data.data();

    var userId = event.params.userId;
    var movieId = event.params.movieId;

    // access a particular field as you would any JS property
    //var name = newValue.name;

    // perform desired operations ...
    console.log('user ' + userId + ' added the movie ' + movieId);
});