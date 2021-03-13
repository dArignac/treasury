import React from "react";
import useSearchMovies from "./useSearchMovies";

interface MovieSearchResultProps {
  searchTerm: string;
}

export default React.memo(function MovieSearchResult({
  searchTerm,
}: MovieSearchResultProps) {
  const { status, data, error } = useSearchMovies(searchTerm);

  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>{error!.message}</div>
      ) : (
        <div>
          {data!.results.map((movie) => (
            <div key={movie.id}>{movie.title}</div>
          ))}
        </div>
      )}
    </div>
  );
});
