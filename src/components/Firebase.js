import firebase from "firebase";
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyDrgbBpmVrw3qsptpH8dTgf8zQoLFIVO_I",
  authDomain: "polling-app-gatsby.firebaseapp.com",
  databaseURL: "https://polling-app-gatsby.firebaseio.com",
  projectId: "polling-app-gatsby",
  storageBucket: "polling-app-gatsby.appspot.com",
  messagingSenderId: "417960454345"
};
firebase.initializeApp(config);
const db = firebase.firestore();
// db.settings({ timestampsInSnapshots: true });

// export default firebase;
export default db;
