import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as utils from './utils';

const app = admin.initializeApp();

export const onWriteSong = functions.firestore
	.document('songs/{songId}')
	.onWrite((snap, context) => {
		const oldSong = snap.before.data();
		const newSong = snap.after.data();

		if (oldSong !== null && oldSong?.title === newSong?.title) {
			return;
		}

		return admin
			.firestore(app)
			.doc(`songs/${context.params.songId}`)
			.set({
				title: newSong?.title,
				lyric: newSong?.lyric,
				categories: newSong?.categories,
				keywords: utils.createKeywords(newSong?.title),
			});
	});

const cors = require('cors')({
	origin: true,
});

export const incrementView = functions.https.onRequest((req, res) => {
	// [END trigger]
	// [START sendError]
	// Forbidding PUT requests.
	if (req.method !== 'PUT') {
		return res.status(403).send('Forbidden!');
	}
	// [END sendError]

	// [START usingMiddleware]
	// Enable CORS using the `cors` express middleware.
	return cors(req, res, () => {
		// [END usingMiddleware]
		// Reading date format from URL query parameter.
		// [START readQueryParam]
		const songId = req.query.songId;
		// [END readQueryParam]
		// Reading date format from request body query parameter
		if (!songId) {
			// [START readBodyParam]
			res.status(501).send('song id not exist');
			return;
			// [END readBodyParam]
		}
		// [START sendResponse]
		return admin
			.firestore(app)
			.doc(`songs/${songId}`)
			.update('numberViews', admin.firestore.FieldValue.increment(1))
			.then(() => res.status(200).send('views incremented'));

		// [END sendResponse]
	});
});
