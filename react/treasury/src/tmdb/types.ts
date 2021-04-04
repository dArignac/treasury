// if this is changed, ensure it is also adjusted in the synchronization
export type Movie = {
	id: number;
	poster_path: string;
	title: string;
};

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
