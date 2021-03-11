import { useQuery } from "react-query";
import axios from "axios";
import { IMovie } from "../movie-list/Movie";
import { theMovieDatabaseConfig } from "../config";

type TMDBResponse = {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
};

function useSearchMovies() {
  const params = new URLSearchParams({
    query: "hannibal",
    page: "1",
    include_adult: "false",
    region: "DE",
    language: "de",
    api_key: theMovieDatabaseConfig.apiKey,
  });
  return useQuery<TMDBResponse, Error>(
    "searchMovies",
    async () => {
      const { data } = await axios.get<TMDBResponse>(
        "https://api.themoviedb.org/3/search/movie?" + params.toString()
      );
      return data;
    },
    { retry: 1 }
  );
}

export default function MovieSearchResult() {
  const { status, data, error } = useSearchMovies();

  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>{error!.message}</div>
      ) : (
        <div>
          {data!.results.map((movie) => (
            <div>{movie.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}
