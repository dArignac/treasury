import { makeStyles } from "@material-ui/core";
import React from "react";
import MovieSearchResult from "./MovieSearchResult";
import { useSearchMovies } from "./useSearchMovies";

const useStyles = makeStyles({
  resultList: {
    display: "grid",
    gap: "0.5em 0.5em",
    gridTemplateColumns: "repeat(auto-fill, 25em)",
  },
  root: {
    marginTop: "0.5em",
  },
});

interface MovieSearchResultListProps {
  searchTerm: string;
}

export default React.memo(function MovieSearchResultList({
  searchTerm,
}: MovieSearchResultListProps) {
  const classes = useStyles();
  const { status, data, error } = useSearchMovies(searchTerm);

  return (
    <div className={classes.root}>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>{error!.message}</div>
      ) : (
        <div className={classes.resultList}>
          {data!.results.map((movie) => (
            <MovieSearchResult key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
});
