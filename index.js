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

const grid = document.getElementById("inv-grid")

const valueNotFoundString = "No se ha especificado el dato";

/*
La base de datos se encuentra estructurada de la siguiente forma:

products
|	1
|	|	id: num
|	|	name: string
|	|	description: string
|	|	price: num
| 	|	image: string (es un URL)
|	|	stock: num
|	2
|	|	...
|	3
Y así continúa
*/

function updateTable(val)
{
	console.log("Actualización recibida:");
	console.table(val);

	let row = []
	for (let key in val) 
	{
		const data = val[key];
		
		// Ordena los datos para colocarlos todos en una sola fila
		row[0] = data.id ?? valueNotFoundString;
		row[1] = data.name ?? valueNotFoundString;
		row[2] = data.description ?? valueNotFoundString;
		row[3] = data.price ?? valueNotFoundString;
		row[4] = data.image ?? "";
		row[5] = data.stock ?? valueNotFoundString;

		console.table(row);

		for (let position in row)
		{
			let cell = document.createElement("div");
			// Condición para mostrar la imagen correctamente
			if (position == 4)
			{
				let img = document.createElement("img");
				img.src = row[position];
				cell.appendChild(img);
			}
			else
			{
				cell.textContent = row[position]
			}

			grid.appendChild(cell);
		}
  	}
}

const productRef = ref(database, '/products');
onValue(productRef, (snapshot) => {
	const val = snapshot.val();
	updateTable(val);
});
