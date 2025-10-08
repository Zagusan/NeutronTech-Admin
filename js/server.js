import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/database';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
    apiKey: "AIzaSyDAVC59pzwEGB5CPCZfgrGUGoCKKcMWSSo",
    authDomain: "neutrontech-cd0d4.firebaseapp.com",
    databaseURL: "https://neutrontech-cd0d4-default-rtdb.firebaseio.com",
    projectId: "neutrontech-cd0d4",
    storageBucket: "neutrontech-cd0d4.firebasestorage.app",
    messagingSenderId: "960029465371",
    appId: "1:960029465371:web:03afae6e3f161f33d5d1be"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
