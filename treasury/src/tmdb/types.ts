// if this is changed, ensure it is also adjusted in the synchronization
export type Movie = {
	id: number;
	poster_path: string;
	title: string;
};

export type FirestoreMovie = Omit<Movie, "id">;

export type PosterVariant =
	| "w92"
	| "w154"
	| "w185"
	| "w342"
	| "w500"
	| "w780"
	| "original";

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
