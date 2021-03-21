import CssBaseline from "@material-ui/core/CssBaseline";
import {
  makeStyles,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route } from "wouter";
import { initFirebase } from "./firebase";
import Footer from "./Footer";
import Greeting from "./Greeting";
import MovieList from "./movie-list/MovieList";
import NavigationPanel from "./navigation/NavigationPanel";
import Search from "./search/Search";
import { FirebaseStore } from "./store";

initFirebase();
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
    marginTop: "0.5em",
    padding: "0.5em",
  },
}));

export default function App() {
  const classes = useStyles();
  const isSignedIn = FirebaseStore.useState((s) => s.isLoggedIn);

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
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
                </React.Fragment>
              )}
            </main>
            <Footer />
          </div>
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
