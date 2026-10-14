import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAHApIPWKs1m1WsBk5Yi9wMBxf6SYC4wkM",
  authDomain: "shop-auth-d7e82.firebaseapp.com",
  projectId: "shop-auth-d7e82",
  storageBucket: "shop-auth-d7e82.appspot.com",
  messagingSenderId: "972414177855",
  appId: "1:972414177855:web:6778a3afd45f4b80469e8a",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
console.log(app.name);
