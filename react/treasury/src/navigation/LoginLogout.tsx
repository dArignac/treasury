import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase/app";
import Button from "@material-ui/core/Button";

export default function LoginLogout() {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        if (!isSignedIn) {
          return (
            <Button
              color="inherit"
              onClick={() => {
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(googleAuthProvider);
              }}
            >
              Login
            </Button>
          );
        } else {
          return (
            <Button color="inherit" onClick={() => firebase.auth().signOut()}>
              Logout
            </Button>
          );
        }
      }}
    </FirebaseAuthConsumer>
  );
}
