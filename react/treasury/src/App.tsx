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
import { QueryClient, QueryClientProvider } from "react-query";
import { Route } from "wouter";
import { firebaseConfig } from "./config";
import Footer from "./Footer";
import Greeting from "./Greeting";
import MovieList from "./movie-list/MovieList";
import NavigationPanel from "./navigation/NavigationPanel";
import Search from "./search/Search";

const queryClient = new QueryClient();

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
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "4em auto auto",
  },
  main: {
    padding: "0.5em",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div className={classes.wrapper}>
            <NavigationPanel />
            <main className={classes.main}>
              <IfFirebaseUnAuthed>{() => <Greeting />}</IfFirebaseUnAuthed>
              <IfFirebaseAuthed>
                {({ user }) => (
                  <React.Fragment>
                    <Route path="/">
                      <MovieList user={user} />
                    </Route>
                    <Route path="/search">
                      <Search />
                    </Route>
                  </React.Fragment>
                )}
              </IfFirebaseAuthed>
              {/* other routes go here */}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </FirebaseAuthProvider>
    </QueryClientProvider>
  );
}
