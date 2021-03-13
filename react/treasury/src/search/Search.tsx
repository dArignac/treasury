import { makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
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
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

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
      {debouncedSearchTerm.length > 0 && (
        <MovieSearchResult searchTerm={debouncedSearchTerm} />
      )}
    </React.Fragment>
  );
}
