// 1. Import Firebase from the CDN (no install, no build step)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, collection, doc, addDoc, deleteDoc, query, where, onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 2. Connect to your project (copy this from the Firebase console)
const app = initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  appId: "YOUR_APP_ID",
});
const auth = getAuth(app);
const db = getFirestore(app);

// 3. Grab the HTML elements we need
const loginView = document.getElementById("login-view");
const appView = document.getElementById("app-view");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const logoutBtn = document.getElementById("logout");
const newItem = document.getElementById("new-item");
const list = document.getElementById("list");

// 4. Sign up, log in, log out
document.getElementById("signup").addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
  } catch (e) {
    error.textContent = e.message;
  }
});

document.getElementById("login").addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (e) {
    error.textContent = e.message;
  }
});

logoutBtn.addEventListener("click", () => signOut(auth));

// 5. Show the right view when the user logs in or out
let stopListening = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginView.hidden = true;
    appView.hidden = false;
    logoutBtn.hidden = false;
    showItems(user);
  } else {
    loginView.hidden = false;
    appView.hidden = true;
    logoutBtn.hidden = true;
    if (stopListening) stopListening();
  }
});

// 6. Firestore: add, show (live) and delete items
document.getElementById("add").addEventListener("click", async () => {
  if (newItem.value === "") return;
  await addDoc(collection(db, "items"), {
    text: newItem.value,
    uid: auth.currentUser.uid,
  });
  newItem.value = "";
});

function showItems(user) {
  const myItems = query(
    collection(db, "items"),
    where("uid", "==", user.uid)
  );

  // onSnapshot runs now AND every time the data changes
  stopListening = onSnapshot(myItems, (snapshot) => {
    list.innerHTML = "";
    snapshot.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.data().text;

      const del = document.createElement("button");
      del.textContent = "Delete";
      del.addEventListener("click", () => {
        deleteDoc(doc(db, "items", item.id));
      });

      li.append(del);
      list.append(li);
    });
  });
}
