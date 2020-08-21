const admin = require('firebase-admin');

var serviceAccount = require("../keys/admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://us-social-app.firebaseio.com",
    storageBucket: "us-social-app.appspot.com",
  });

const db = admin.firestore(); 

module.exports = { admin, db };