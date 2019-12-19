import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Since this code will be running in the Cloud Functions environment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();

// triggered when a movie is created
export const createMovie = functions
	.firestore
	.document('users/{userId}/movies/{movieId}')
	.onCreate((data, context) => {
		// get the counting document reference for the current user
		const counterRef = firestore.doc(`counters/${context.params.userId}`);

		// encapsulate into transaction
		return firestore.runTransaction(transaction => {
			return transaction.get(counterRef).then(counterDoc => {
				let movies = 0;

				if (counterDoc.exists) {
					const doc = counterDoc.data();

					if (doc !== undefined) {

						if (!('movies' in doc)) {
							movies = 1;
						} else {
							movies = doc['movies'] + 1;
						}

						return transaction.update(
							counterRef,
							{
								movies: movies
							}
						);

					} else {
						return;
					}
				} else {
					return transaction.set(
						counterRef,
						{
							movies: ++movies
						}
					);
				}
			});
		});
	});


// triggered when a movie is deleted
export const deleteMovie = functions
	.firestore
	.document('users/{userId}/movies/{movieId}')
	.onDelete((data, context) => {
		// get the counting document reference for the current user
		const counterRef = firestore.doc(`counters/${context.params.userId}`);

		// encapsulate into transaction
		return firestore.runTransaction(transaction => {
			return transaction.get(counterRef).then(counterDoc => {
				const doc = counterDoc.data();

				if (doc !== undefined) {
					return transaction.update(
						counterRef,
						{
							movies: doc['movies'] - 1
						}
					);
				}

				return;
			});
		});
	});
