import * as song from './song';
import * as sites from './sites';

// Addeding to firebase functions
exports.onWriteSong = song.onWriteSong;
exports.incrementView = song.incrementView;
exports.privacyAndPolicy = sites.privacyAndPolicy;
