import axios from "axios";
import { useQuery } from "react-query";
import { theMovieDatabaseConfig } from "../config";
import { IMovie } from "../movie-list/Movie";

type TMDBResponse = {
	page: number;
	total_results: number;
	total_pages: number;
	results: IMovie[];
};

export default function useSearchMovies(searchTerm: string) {
	const params = new URLSearchParams({
		query: searchTerm,
		page: "1",
		include_adult: "false", // FIXME add to settings
		region: "DE", // FIXME add to settings
		language: "de", // FIXME add to settings
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
		{ retry: 1 }
	);
}
