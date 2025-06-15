import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/auth_firebase";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // create email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Sign in with email and pass
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // logout
  const logout = () => {
    return signOut(auth);
  };

  // signwithgoogle

  const googleLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };
  // OnAuthState change set
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {setUser(currentUser);
      //post request for jwt using user email
      // api end-point: /just (post metho)
      setLoading(false)}
    );
    return () => {
      unsubscribe();
    };
  }, []);
  // added value
  const authValue = {
    createUser,
    loading,
    user,
    login,
    logout,
    googleLogin,
  };
  return <AuthContext value={authValue}>{children}</AuthContext>;
};

export default AuthProvider;
