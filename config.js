
// Codes not working below
const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyBR1hlggO_rWaYFcmMdsXP2G4GHgQs2EYk",
    authDomain: "restful-29d27.firebaseapp.com",
    projectId: "restful-29d27",
    storageBucket: "restful-29d27.appspot.com",
    messagingSenderId: "280447407961",
    appId: "1:280447407961:web:bee4f254e3332910be1e48",
    measurementId: "G-43EBT8DQFY"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const User = db.collection('User')
module.exports = User