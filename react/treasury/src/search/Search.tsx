import { makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useDebounce from "./debounce";
import MovieSearchResult from "./MovieSearchResult";

const useStyles = makeStyles((theme) => ({
  h2: {
    marginBottom: "0.5em",
    marginTop: "0",
  },
}));

export default function Search() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // search
    } else {
      // clear results
    }
  }, [debouncedSearchTerm]);

  return (
    <React.Fragment>
      <h2 className={classes.h2}>Search for movies</h2>
      <form noValidate autoComplete="off">
        <TextField
          id="needle"
          label="Movie title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {/* FIXME remove */}
      <pre>Value: {searchTerm}</pre>
      <pre>Debounced: {debouncedSearchTerm}</pre>
      <MovieSearchResult />
    </React.Fragment>
  );
}
