export interface IMovie {
	vote_count: number;
	id: number;
	video: boolean;
	vote_average: number;
	title: string;
	popularity: number;
	poster_path: string;
	original_language: string;
	original_title: string;
	genre_ids: number[];
	backdrop_path: string;
	adult: boolean;
	overview: string;
	release_date: string;
}

export type TMovie = IMovie;

// FIXME unclear if needed, if, try to simplify the value assignment
// export class Movie implements IMovie {
// 	// persisted properties
// 	adult: boolean;
// 	backdrop_path: string;
// 	// store actresses and directors as string only, we currently do not want to search for them and find their movies, instead we only use them as additional static readonly data
// 	credits_actresses: string;
// 	credits_directors: string;
// 	genre_ids: number[];
// 	id: number;
// 	title: string;
// 	original_language: string;
// 	original_title: string;
// 	overview: string;
// 	popularity: number;
// 	poster_path: string;
// 	release_date: string;
// 	video: boolean;
// 	vote_average: number;
// 	vote_count: number;

// 	constructor(
// 		adult: boolean,
// 		backdrop_path: string,
// 		credits_actresses: string,
// 		credits_directors: string,
// 		genre_ids: number[],
// 		id: number,
// 		title: string,
// 		original_language: string,
// 		original_title: string,
// 		overview: string,
// 		popularity: number,
// 		poster_path: string,
// 		release_date: string,
// 		video: boolean,
// 		vote_average: number,
// 		vote_count: number
// 	) {
// 		this.adult = adult;
// 		this.backdrop_path = backdrop_path;
// 		this.credits_actresses = credits_actresses;
// 		this.credits_directors = credits_directors;
// 		this.genre_ids = genre_ids;
// 		this.id = id;
// 		this.title = title;
// 		this.original_language = original_language;
// 		this.original_title = original_title;
// 		this.overview = overview;
// 		this.popularity = popularity;
// 		this.poster_path = poster_path;
// 		this.release_date = release_date;
// 		this.video = video;
// 		this.vote_average = vote_average;
// 		this.vote_count = vote_count;
// 	}
// }
