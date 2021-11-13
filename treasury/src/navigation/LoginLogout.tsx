import Button from "@material-ui/core/Button";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React from "react";
import { FirebaseStore } from "../store";

export default function LoginLogout() {
  const isSignedIn = FirebaseStore.useState((s) => s.isLoggedIn);
  return (
    <React.Fragment>
      {isSignedIn ? (
        <Button color="inherit" onClick={() => firebase.auth().signOut()}>
          Logout
        </Button>
      ) : (
        <React.Fragment>
          <Button
            color="inherit"
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
            }}
          >
            Login
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
