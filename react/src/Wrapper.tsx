import { styled } from "@mui/material/styles";
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

const DivWrapper = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "4em auto auto",
}));

const StyledMain = styled("main")(({ theme }) => ({
  marginTop: "0.5em",
  padding: "0.5em",
}));

export default function Wrapper() {
  const isSignedIn = FirebaseStore.useState((s) => s.isLoggedIn);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      maxSnack={3}
    >
      <DivWrapper>
        <NavigationPanel />
        <StyledMain>
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
        </StyledMain>
        <Footer />
      </DivWrapper>
    </SnackbarProvider>
  );
}
