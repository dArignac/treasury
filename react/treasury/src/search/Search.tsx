import { makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";

const useStyles = makeStyles((theme) => ({
  h2: {
    marginBottom: "0.5em",
    marginTop: "0",
  },
}));

export default function Search() {
  const classes = useStyles();
  const [needle, setNeedle] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useDebounce(
    () => {
      if (needle.trim().length > 0) {
        setDebouncedValue(needle);
      }
    },
    500,
    [needle]
  );

  return (
    <React.Fragment>
      <h2 className={classes.h2}>Search for movies</h2>
      <form noValidate autoComplete="off">
        <TextField
          id="needle"
          label="Movie title"
          variant="outlined"
          value={needle}
          onChange={(e: any) => setNeedle(e.target.value)}
        />
      </form>
      {/* remove this: */}
      <pre>Value: {needle}</pre>
      <pre>Debounced: {debouncedValue}</pre>
    </React.Fragment>
  );
}
