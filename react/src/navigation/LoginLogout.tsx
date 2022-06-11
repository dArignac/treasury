import Button from "@mui/material/Button";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React from "react";
import { FirebaseStore } from "../store";

export default function LoginLogout() {
  const isSignedIn = FirebaseStore.useState((s) => s.isLoggedIn);
  const auth = getAuth();
  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {});
  };
  const logout = () => {
    signOut(auth)
      .then((result) => {})
      .catch((error) => {});
  };
  return (
    <React.Fragment>
      {isSignedIn ? (
        <Button color="inherit" onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        <React.Fragment>
          <Button color="inherit" onClick={() => login()}>
            Login
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
