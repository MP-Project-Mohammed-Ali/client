import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfBsrRNRLISBr-MpSyil3r3N6DcKuU0a8",
  authDomain: "uplodeimage-98842.firebaseapp.com",
  projectId: "uplodeimage-98842",
  storageBucket: "uplodeimage-98842.appspot.com",
  messagingSenderId: "505256528814",
  appId: "1:505256528814:web:13dbc145afa2e350b5563f",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
