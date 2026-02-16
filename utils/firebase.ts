import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
const firebaseConfig = {
  apiKey: process.env.API_KEY! ,
  authDomain:process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID ,
  storageBucket: process.env.STORAGE_bUCKET , 
  messagingSenderId: process.env.MESSAGEING_SENDER_ID ,
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export async function googleAuth() {
    try {
        let data = await signInWithPopup(auth,provider);
        return data ;
    } catch (error) {   
        console.log(error)
    }
}