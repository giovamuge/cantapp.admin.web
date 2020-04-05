import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as utils from './utils';

const app = admin.initializeApp();

export const onWriteSong = functions.firestore
	.document('songs/{songId}')
	.onWrite((snap, context) => {
		const newSong = snap.after.data();
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