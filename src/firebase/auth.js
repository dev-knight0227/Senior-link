// firebase/auth.js
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import app from './config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
