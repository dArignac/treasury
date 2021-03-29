import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { FirebaseStore } from "../store";
import { Movie } from "./Movie";
import MovieCard from "./MovieCard";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gap: "0.5em 0.5em",
    gridAutoRows: "231px",
    gridTemplateColumns: "repeat(auto-fill, 154px)",
  },
});

function MovieListLoading() {
  return <div>Loading...</div>;
}

function MovieListEmpty() {
  return <div>No movies added yet.</div>;
}

export default function MovieList() {
  const classes = useStyles();
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { db, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    userId: s.user!.uid,
  }));

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

  return (
    <>
      {isLoading && <MovieListLoading />}
      {!isLoading &&
        (movies.length === 0 ? (
          <MovieListEmpty />
        ) : (
          <div className={classes.container}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ))}
    </>
  );
}
