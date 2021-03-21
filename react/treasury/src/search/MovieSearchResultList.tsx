import { makeStyles } from "@material-ui/core";
import "firebase/firestore";
import React from "react";
import { TMovie } from "../movie-list/Movie";
import { FirebaseStore } from "../store";
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
}

export default React.memo(function MovieSearchResultList({
  searchTerm,
}: MovieSearchResultListProps) {
  const classes = useStyles();
  const { db, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    userId: s.user!.uid,
  }));
  const { status, data, error } = useSearchMovies(searchTerm);
  const addMovieToFirestore = (movie: TMovie): Promise<void> => {
    return db!
      .collection("/users/" + userId + "/movies")
      .doc(`${movie.id}`)
      .set({
        title: movie.title,
      });
  };

  return (
    <div className={classes.root}>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>{error!.message}</div>
      ) : (
        <div className={classes.resultList}>
          {data?.results.map((movie) => (
            <MovieResult
              key={movie.id}
              movie={movie}
              addMovie={() => addMovieToFirestore(movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
});
