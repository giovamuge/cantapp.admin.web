import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const onWriteUser = functions.auth
  .user()
  .onCreate((user) => admin.firestore().doc(`users/${user.uid}`).set(user));
