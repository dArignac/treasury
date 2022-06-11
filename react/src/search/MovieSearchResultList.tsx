import { styled } from "@mui/material/styles";
import { doc, setDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import React from "react";
import { FirebaseStore } from "../store";
import { useSearchMovies } from "../tmdb/hooks";
import { getFirestoreDocument } from "../tmdb/tmdb";
import { Movie } from "../tmdb/types";
import MovieResult from "./MovieResult";

const DivResultList = styled("div")({
  display: "grid",
  gap: "0.5em 0.5em",
  gridTemplateColumns: "repeat(auto-fill, 25em)",
});

const DivRoot = styled("div")({
  marginTop: "0.5em",
});

interface MovieSearchResultListProps {
  searchTerm: string;
}

export default React.memo(function MovieSearchResultList({
  searchTerm,
}: MovieSearchResultListProps) {
  const { db, settings, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    settings: s.settings,
    userId: s.user!.uid,
  }));
  const { status, data, error } = useSearchMovies(searchTerm, settings);
  const { enqueueSnackbar } = useSnackbar();

  const persistMovie = async (movie: Movie) => {
    if (db) {
      const docRef = doc(db, `/users/${userId}/movies/${movie.id}`);
      await setDoc(docRef, getFirestoreDocument(movie));
      enqueueSnackbar(`"${movie.title}" has been added.`, {
        autoHideDuration: 3000,
        variant: "success",
      });
    }
  };

  const addMovieToFirestore = (movie: Movie) => {
    if (db) {
      persistMovie(movie).catch(() => {
        enqueueSnackbar(`Error while adding "${movie.title}"`, {
          autoHideDuration: 5000,
          variant: "error",
        });
      });
    }
  };

  return (
    <DivRoot>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>{error!.message}</div>
      ) : (
        <DivResultList>
          {data?.results.length === 0 && <div>No movies found!</div>}
          {data?.results.map((movie) => (
            <MovieResult
              addMovie={() => addMovieToFirestore(movie)}
              key={movie.id}
              movie={movie}
            />
          ))}
        </DivResultList>
      )}
    </DivRoot>
  );
});
