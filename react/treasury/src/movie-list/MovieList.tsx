import { makeStyles } from "@material-ui/core/styles";
import { FirebaseStore } from "../store";
import { useEffect, useState } from "react";
import { TMovie } from "./Movie";
import MovieCard from "./MovieCard";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: "0.5rem",
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
  const [movies, setMovies] = useState<Array<TMovie>>([]);
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
              return doc.data() as TMovie;
            })
          );
        }
      });
  });

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
