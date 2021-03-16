import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/auth";
import React from "react";

export default function LoginLogout() {
  const isSignedIn = false;
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
