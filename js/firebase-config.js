 const firebaseConfig = {
    apiKey: "AIzaSyAanE8AQXcW9Kaezx4bf7DItgg3hnpVLFc",
    authDomain: "small-wonders-school-ab9b8.firebaseapp.com",
    projectId: "small-wonders-school-ab9b8",
    storageBucket: "small-wonders-school-ab9b8.firebasestorage.app",
    messagingSenderId: "1026351276180",
    appId: "1:1026351276180:web:984166a2cff8f4b6c3d481",
    measurementId: "G-1QCSLFWQGM"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore (Database)
const db = firebase.firestore();

// Initialize Auth (Only if Auth SDK is present)
// This prevents errors on pages that don't use authentication (like gallery.html)
let auth = null;
if (firebase.auth) {
    auth = firebase.auth();
}
