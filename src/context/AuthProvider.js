import { Children, createContext, useState } from "react";
import React from "react";
import app from "../firebase/firebase.config";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const logOut = () => {
    return signOut(auth)
  }

  
  const authInfo = {user, createUser, login, logOut}

  return <AuthContext.Provider value={authInfo}>
    {children}
  </AuthContext.Provider>;
};

export default AuthProvider;
