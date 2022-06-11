import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Route } from "wouter";
import Footer from "./Footer";
import Greeting from "./Greeting";
import MovieList from "./movie-list/MovieList";
import NavigationPanel from "./navigation/NavigationPanel";
import Search from "./search/Search";
import Settings from "./settings/Settings";
import { FirebaseStore } from "./store";
import TmdbSync from "./tmdb/TmdbSync";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "4em auto auto",
  },
  main: {
    marginTop: "0.5em",
    padding: "0.5em",
  },
}));

export default function Wrapper() {
  const classes = useStyles();
  const isSignedIn = FirebaseStore.useState((s) => s.isLoggedIn);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      maxSnack={3}
    >
      <div className={classes.wrapper}>
        <NavigationPanel />
        <main className={classes.main}>
          {!isSignedIn && <Greeting />}
          {isSignedIn && (
            <React.Fragment>
              <Route path="/">
                <MovieList />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/sync">
                <TmdbSync />
              </Route>
            </React.Fragment>
          )}
        </main>
        <Footer />
      </div>
    </SnackbarProvider>
  );
}
