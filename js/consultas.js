// js/index.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

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
const db = getDatabase(app);

const productRef = ref(db, "/");
onValue(productRef, (snapshot) => {
    const data = snapshot.val();
    updateTable(data);
});

export function writeproductdata(id, name, description, price, image, stock) {
    return set(ref(db, `products/${id}`), {
        id,
        name,
        description,
        price,
        image,
        stock,
    });
}
function parsePrice(value) {
    if (typeof value !== "string") return Number.NaN;
    const normalized = value
        .trim()
        .replace(/\./g, "")
        .replace(/,/g, ".");
    return parseFloat(normalized);
}

function addProduct() {
    const $ = (sel) => document.querySelector(sel);
    const btn = $(".btn-agregar");
    if (!btn) {
        console.warn("No se encontró .btn-agregar");
        return;
    }

    const onClick = async () => {
        const id = $("#id")?.value.trim();
        const name = $("#name")?.value.trim();
        const description = $("#description")?.value.trim();
        const price = parsePrice($("#price")?.value ?? "");
        const image = $("#image")?.value.trim();
        const stock = parseInt($("#stock")?.value ?? "", 10);

        if (!id) return alert("Falta el ID");
        if (!name) return alert("Falta el nombre");
        if (!Number.isFinite(price) || price < 0) return alert("Precio inválido");
        if (!Number.isInteger(stock) || stock < 0) return alert("Existencias inválidas");

        try {
            await writeproductdata(id, name, description ?? "", price, image ?? "", stock);
            alert("Producto guardado correctamente");

            ["#id", "#name", "#description", "#price", "#image", "#stock"].forEach((sel) => {
                const el = $(sel);
                if (el) el.value = "";
            });
        } catch (e) {
            console.error(e);
            alert("Error al guardar el producto");
        }
    };

    btn.removeEventListener("click", onClick);
    btn.addEventListener("click", onClick);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addProduct, { once: true });
} else {
    addProduct();
}