import axios from "axios";
import { theMovieDatabaseConfig } from "../config";
import { TSettings } from "../store";
import { FirestoreMovie, Movie, PosterVariant } from "./types";

export const getPosterUrl = (variant: PosterVariant) => {
	return `https://image.tmdb.org/t/p/${variant}`;
};

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

/**
 * As the movie can contain more properties at runtime then defined in the type, here
 * we just return the relevant properties for the type FirestoreMovie that will be
 * persisted to Firestore.
 * @param movie the movie to handle
 * @returns the Firestore representation of the movie
 */
export function getFirestoreDocument(movie: Movie): FirestoreMovie {
	return {
		poster_path: movie.poster_path,
		title: movie.title,
	};
}
