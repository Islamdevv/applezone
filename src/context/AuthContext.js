import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS } from "../helpers/const";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

const INIT_STATE = {
  user: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  async function signWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/menu");
    } catch (error) {
      <Alert severity="error">{error.message}</Alert>;
    }
  }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function checkUser() {
    return onAuthStateChanged(auth, (user) =>
      dispatch({
        type: ACTIONS.GET_USER,
        payload: user,
      })
    );
  }

  useEffect(() => {
    checkUser();
  }, []);

  function logOut() {
    return signOut(auth);
  }

  const values = {
    signWithGoogle,
    register,
    login,
    user: state.user,
    logOut,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContext;
