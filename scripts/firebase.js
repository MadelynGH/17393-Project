
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAiE-lgGhzypUTLUwQOqRU1UrUva0pZy6U",
    authDomain: "fllc-17393-project-2023.firebaseapp.com",
    projectId: "fllc-17393-project-2023",
    storageBucket: "fllc-17393-project-2023.appspot.com",
    messagingSenderId: "177366944482",
    appId: "1:177366944482:web:3a1ca4a077428492d62cbb",
    measurementId: "G-03HBVGZBFM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export default db;