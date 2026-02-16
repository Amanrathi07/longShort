import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
const firebaseConfig = {
  apiKey: process.env.apiKey ,
  authDomain:process.env.authDomain,
  projectId: process.env.projectId ,
  storageBucket: process.env.storageBucket , 
  messagingSenderId: process.env.messagingSenderId ,
  appId: process.env.appId
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