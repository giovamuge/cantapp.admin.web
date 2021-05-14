// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// const db = admin.firestore();

// exports.keepCount = functions.firestore
//     .document('sogs/{songId}')
//     .onCreate((snapshot: any, context: any) => {
//         return db.runTransaction(async (transaction: any) => {
//             // Get the metadata and incement the count.
//             const metaRef = db.doc('metadata/songs');
//             const metaData = (await transaction.get(metaRef)).data();

//             const number = metaData.count + 1;

//             transaction.update(metaRef, {
//                 count: number,
//             });

//             // Update Customer
//             const customerRef = snapshot.ref;

//             transaction.set(
//                 customerRef,
//                 {
//                     number,
//                 },
//                 { merge: true }
//             );
//         });
//     });
