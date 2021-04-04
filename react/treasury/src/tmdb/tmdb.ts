import axios from "axios";
import { theMovieDatabaseConfig } from "../config";
import { TSettings } from "../store";
import { Movie } from "./types";

export const getMovieById = async (
	id: string,
	settings: TSettings
): Promise<Movie> => {
	const params = new URLSearchParams({
		language: settings.tmdbLanguage,
		api_key: theMovieDatabaseConfig.apiKey,
	});
	const { data } = await axios.get(
		`https://api.themoviedb.org/3/movie/${id}?${params.toString()}`
	);
	return data;
};
