import CssBaseline from "@material-ui/core/CssBaseline";
import {
  makeStyles,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import React from "react";
import firebaseConfig from "./auth/config";
import NavigationPanel from "./navigation/NavigationPanel";
import { Route } from "wouter";
import MovieList from "./movie-list/MovieList";
import Imprint from "./imprint/Imprint";
import Greeting from "./Greeting";

// current palette #525252 #414141 #313131 #CA3E47
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#525252",
    },
    secondary: {
      main: "#ca3e47",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0.5em",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <NavigationPanel />
        <div className={classes.root}>
          <IfFirebaseUnAuthed>{() => <Greeting />}</IfFirebaseUnAuthed>
          <IfFirebaseAuthed>
            {({ user }) => (
              <Route path="/">
                <MovieList user={user} />
              </Route>
            )}
          </IfFirebaseAuthed>
          <Route path="/imprint" component={Imprint} />
        </div>
      </ThemeProvider>
    </FirebaseAuthProvider>
  );
}
