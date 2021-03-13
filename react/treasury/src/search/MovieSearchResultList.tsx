import React from "react";
import useSearchMovies from "./useSearchMovies";

interface MovieSearchResultListProps {
  searchTerm: string;
}

export default React.memo(function MovieSearchResultList({
  searchTerm,
}: MovieSearchResultListProps) {
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
