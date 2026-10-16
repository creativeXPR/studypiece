// 1. Import Firebase from the CDN (no install, no build step)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, collection, doc, addDoc, updateDoc, query, where, onSnapshot,
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
const docList = document.getElementById("doc-list");
const titleInput = document.getElementById("title");
const page = document.getElementById("page");
const statusText = document.getElementById("status");

// 4. Sign up, log in, log out (same as the template)
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
    showDocs(user);
  } else {
    loginView.hidden = false;
    appView.hidden = true;
    logoutBtn.hidden = true;
    if (stopListening) stopListening();
  }
});

// 6. Documents
let currentId = null;   // id of the open document
let timer = null;

// Create a new, empty document and open it
document.getElementById("new-doc").addEventListener("click", async () => {
  const newDoc = await addDoc(collection(db, "docs"), {
    title: "Untitled",
    body: "",
    uid: auth.currentUser.uid,
  });
  openDoc(newDoc.id, "Untitled", "");
});

// Put a document into the editor
function openDoc(id, title, body) {
  currentId = id;
  titleInput.value = title;
  page.innerHTML = body;
}

// Autosave: wait until typing stops for 1 second, then save
function save() {
  if (currentId === null) return;
  statusText.textContent = "Saving...";
  clearTimeout(timer);
  timer = setTimeout(async () => {
    await updateDoc(doc(db, "docs", currentId), {
      title: titleInput.value,
      body: page.innerHTML,
    });
    statusText.textContent = "Saved";
  }, 1000);
}
titleInput.addEventListener("input", save);
page.addEventListener("input", save);

// Sidebar: live list of my documents
function showDocs(user) {
  const myDocs = query(
    collection(db, "docs"),
    where("uid", "==", user.uid)
  );

  stopListening = onSnapshot(myDocs, (snapshot) => {
    docList.innerHTML = "";
    snapshot.forEach((d) => {
      const li = document.createElement("li");
      li.textContent = d.data().title;
      li.addEventListener("click", () => {
        openDoc(d.id, d.data().title, d.data().body);
      });
      docList.append(li);
    });
  });
}
