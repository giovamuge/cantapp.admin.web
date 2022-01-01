"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const utils = require("./utils");
const algoliasearch_1 = require("algoliasearch");
// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_INDEX_NAME = 'dev_SONGS';
const client = algoliasearch_1.default(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
exports.onWriteSong = functions.firestore
    .document('songs/{songId}')
    .onWrite((snap, context) => {
    const oldSong = snap.before.data();
    const newSong = snap.after.data();
    if (oldSong !== null && oldSong ? .title === newSong ? .title :  : ) {
        return;
    }
    // Add an 'objectID' field which Algolia requires
    const songAlgolia = {
        objectID: context.params.songId,
        lyric: newSong ? .lyric : ,
        title: newSong ? .title : ,
    };
    return admin
        .firestore()
        .doc(`songs/${context.params.songId}`)
        .update({
        keywords: utils.createKeywords(newSong ? .title : ),
    })
        .then(() => {
        // Write to the algolia index
        const index = client.initIndex(ALGOLIA_INDEX_NAME);
        return index.saveObject(songAlgolia);
    });
});
const cors = require('cors')({
    origin: true,
});
exports.incrementView = functions.https.onRequest((req, res) => {
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
            .firestore()
            .doc(`songs/${songId}`)
            .update('numberViews', admin.firestore.FieldValue.increment(1))
            .then(() => res.status(200).send('views incremented'));
        // [END sendResponse]
    });
});
//# sourceMappingURL=song.js.map