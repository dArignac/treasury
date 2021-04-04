import { makeStyles } from "@material-ui/core";
import "firebase/firestore";
import { useSnackbar } from "notistack";
import React from "react";
import { FirebaseStore } from "../store";
import { useSearchMovies } from "../tmdb/hooks";
import MovieResult from "./MovieResult";

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

type Movie = {
  id: number;
  title: string;
};

interface MovieSearchResultListProps {
  searchTerm: string;
}

export default React.memo(function MovieSearchResultList({
  searchTerm,
}: MovieSearchResultListProps) {
  const classes = useStyles();
  const { db, settings, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    settings: s.settings,
    userId: s.user!.uid,
  }));
  const { status, data, error } = useSearchMovies(searchTerm, settings);
  const { enqueueSnackbar } = useSnackbar();
  const addMovieToFirestore = (movie: Movie) => {
    db!
      .collection("/users/" + userId + "/movies")
      .doc(`${movie.id}`)
      .set({
        title: movie.title,
      })
      .then(() =>
        enqueueSnackbar(`"${movie.title}" has been added.`, {
          autoHideDuration: 3000,
          variant: "success",
        })
      )
      .catch(() =>
        enqueueSnackbar(`Error while adding "${movie.title}"`, {
          autoHideDuration: 5000,
          variant: "error",
        })
      );
  };

  return (
    <div className={classes.root}>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>{error!.message}</div>
      ) : (
        <div className={classes.resultList}>
          {data?.results.length === 0 && <div>No movies found!</div>}
          {data?.results.map((movie) => (
            <MovieResult
              addMovie={() => addMovieToFirestore(movie)}
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </div>
  );
});
