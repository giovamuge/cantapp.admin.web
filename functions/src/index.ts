// imports file
// import * as song from './song';
import * as sites from './sites';
import * as user from './user';
// import firebase
import * as admin from 'firebase-admin';

admin.initializeApp();

// Addeding to firebase functions
// exports.onWriteSong = song.onWriteSong;
// exports.incrementView = song.incrementView;
exports.privacyAndPolicy = sites.privacyAndPolicy;
exports.onWriteUser = user.onWriteUser;
