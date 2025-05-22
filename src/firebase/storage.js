// src/firebase/storage.js
import { getStorage } from "firebase/storage";
import app from "./config";
export const storage = getStorage(app);
