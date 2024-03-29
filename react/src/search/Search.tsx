import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { InjectStoreState } from "pullstate";
import React, { useEffect, useState } from "react";
import { FirebaseStore } from "../store";
import useDebounce from "./debounce";
import MovieSearchResultList from "./MovieSearchResultList";

const StyledH2 = styled("h2")({
  marginBottom: "0.5em",
  marginTop: "0",
});

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const storeMovieSearchTerm = FirebaseStore.useState((s) => s.movieSearchTerm);

  // update the store if the search term has changed
  useEffect(() => {
    if (
      debouncedSearchTerm.length > 0 &&
      debouncedSearchTerm !== storeMovieSearchTerm
    ) {
      FirebaseStore.update((s) => {
        s.movieSearchTerm = debouncedSearchTerm;
      });
    }
  }, [debouncedSearchTerm, storeMovieSearchTerm]);

  return (
    <React.Fragment>
      <StyledH2>Search for movies</StyledH2>
      <form noValidate autoComplete="off">
        <TextField
          id="needle"
          label="Movie title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            const search = e.target.value;
            if (search !== searchTerm) {
              setSearchTerm(search);
            }
          }}
        />
      </form>
      <InjectStoreState store={FirebaseStore} on={(s) => s.movieSearchTerm}>
        {(movieSearchTerm) => {
          if (movieSearchTerm.length > 0) {
            return <MovieSearchResultList searchTerm={movieSearchTerm} />;
          }
          return <div>Please enter a movie title to search.</div>;
        }}
      </InjectStoreState>
    </React.Fragment>
  );
}
