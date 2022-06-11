import axios from "axios";
import { useQuery } from "react-query";
import { theMovieDatabaseConfig } from "../config";
import { TSettings } from "../store";
import { TMDBResponse } from "./types";

export function useSearchMovies(searchTerm: string, settings: TSettings) {
  const params = new URLSearchParams({
    query: searchTerm.trim(),
    page: "1",
    include_adult: "false", // FIXME add to settings
    region: settings.tmdbRegion,
    language: settings.tmdbLanguage,
    api_key: theMovieDatabaseConfig.apiKey,
  });
  return useQuery<TMDBResponse, Error>(
    ["searchMovies", searchTerm],
    async () => {
      const { data } = await axios.get<TMDBResponse>(
        "https://api.themoviedb.org/3/search/movie?" + params.toString()
      );
      return data;
    },
    { enabled: true, refetchOnWindowFocus: false, retry: 0 }
  );
}
