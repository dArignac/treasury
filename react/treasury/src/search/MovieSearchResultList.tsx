import { makeStyles } from "@material-ui/core";
import "firebase/firestore";
import React from "react";
import MovieResult from "./MovieResult";
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
  user: any;
}

export default React.memo(function MovieSearchResultList({
  searchTerm,
  user,
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
            <MovieResult key={movie.id} movie={movie} user={user} />
          ))}
        </div>
      )}
    </div>
  );
});