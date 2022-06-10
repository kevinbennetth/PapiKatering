import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXda85r7G_G7rvjqtuE-hPnXnNkQPW6lA",
  authDomain: "papikatering-dfb75.firebaseapp.com",
  projectId: "papikatering-dfb75",
  storageBucket: "papikatering-dfb75.appspot.com",
  messagingSenderId: "119917189724",
  appId: "1:119917189724:web:5b7c4478e3faa5862d2499"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
