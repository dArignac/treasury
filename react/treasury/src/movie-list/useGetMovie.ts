import axios from "axios";
import { useQuery } from "react-query";
import { theMovieDatabaseConfig } from "../config";
import { TSettings } from "../store";
import { Movie } from "../tmdb/Movie";

export function useGetMovie(id: number, settings: TSettings) {
	const params = new URLSearchParams({
		region: settings.tmdbRegion,
		language: settings.tmdbLanguage,
		api_key: theMovieDatabaseConfig.apiKey,
	});
	return useQuery<Movie, Error>(
		["getMovie", id],
		async () => {
			const { data } = await axios.get<Movie>(
				"https://api.themoviedb.org/3/movie/" + id + "?" + params.toString()
			);
			return data;
		},
		{ enabled: true, refetchOnWindowFocus: false, retry: 0 }
	);
}
