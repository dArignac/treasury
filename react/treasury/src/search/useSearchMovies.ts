import axios from "axios";
import { useQuery } from "react-query";
import { theMovieDatabaseConfig } from "../config";
import { TSettings } from "../store";

export interface IMovieSearchResult {
	adult: boolean;
	backdrop_path: string;
	genre_ids: Array<number>;
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TMDBResponse {
	page: number;
	total_results: number;
	total_pages: number;
	results: IMovieSearchResult[];
}

export function useSearchMovies(searchTerm: string, settings: TSettings) {
	const params = new URLSearchParams({
		query: searchTerm,
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
