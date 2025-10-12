import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, onValue, child, get  } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
	apiKey: "AIzaSyDAVC59pzwEGB5CPCZfgrGUGoCKKcMWSSo",
	authDomain: "neutrontech-cd0d4.firebaseapp.com",
	databaseURL: "https://neutrontech-cd0d4-default-rtdb.firebaseio.com",
	projectId: "neutrontech-cd0d4",
	storageBucket: "neutrontech-cd0d4.firebasestorage.app",
	messagingSenderId: "960029465371",
	appId: "1:960029465371:web:03afae6e3f161f33d5d1be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

function updateTable(val)
{
	for (let key in val) 
	{
		const data = val[key];
		
		
  }
}

const productRef = ref(database, '/products');
onValue(productRef, (snapshot) => {
	const data = snapshot.val();
	updateTable(data);
});
