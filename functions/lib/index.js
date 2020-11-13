"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// imports file
// import * as song from './song';
const sites = require("./sites");
const user = require("./user");
// import firebase
const admin = require("firebase-admin");
admin.initializeApp();
// Addeding to firebase functions
// exports.onWriteSong = song.onWriteSong;
// exports.incrementView = song.incrementView;
exports.privacyAndPolicy = sites.privacyAndPolicy;
exports.onWriteUser = user.onWriteUser;
//# sourceMappingURL=index.js.map