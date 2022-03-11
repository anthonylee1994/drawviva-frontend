import React from "react";
import {
  getAuth,
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseApp } from "../config/firebaseConfig";
import { authAPI } from "api/auth";

const auth: Auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export const useFirebaseAuth = () => {
  const login = React.useCallback(async () => {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const user = await authAPI.login(token);
    console.log("user", user);
  }, []);

  return {
    login,
  };
};
