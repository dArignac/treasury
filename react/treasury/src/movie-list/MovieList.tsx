import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FirebaseStore } from "../store";
import { Movie } from "../tmdb/types";
import MovieCard from "./MovieCard";

function MovieListLoading() {
  return <div>Loading...</div>;
}

function MovieListEmpty() {
  return <div>No movies added yet.</div>;
}

const useStyles = makeStyles({
  container: {
    display: "grid",
    gap: "0.5em 0.5em",
    gridAutoRows: "231px",
    gridTemplateColumns: "repeat(auto-fill, 154px)",
  },
});

export default function MovieList() {
  const classes = useStyles();
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const { db, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    userId: s.user!.uid,
  }));

  const removeMovie = (movieId: number) => {
    db!
      .collection("/users/" + userId + "/movies")
      .doc(movieId.toString())
      .delete()
      .then(() =>
        enqueueSnackbar("Movie was removed successfully.", {
          autoHideDuration: 3000,
          variant: "success",
        })
      )
      .catch(() =>
        enqueueSnackbar("Error occurred when removing the movie.", {
          autoHideDuration: 3000,
          variant: "error",
        })
      );
  };

  useEffect(() => {
    db!
      .collection("/users/" + userId + "/movies")
      .orderBy("title")
      .onSnapshot((querySnapshot) => {
        setIsLoading(false);
        if (!querySnapshot.empty) {
          setMovies(
            querySnapshot.docs.map((doc) => {
              return { id: parseInt(doc.id), ...doc.data() } as Movie;
            })
          );
        }
      });
  }, [db, userId]);

  if (isLoading) return <MovieListLoading />;
  if (!isLoading && movies.length === 0) return <MovieListEmpty />;

  return (
    <div className={classes.container}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          removeMovieHandler={removeMovie}
        />
      ))}
    </div>
  );
}
