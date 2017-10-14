import { MovieCreditsCastResponse } from './movie-credits-cast-response';
import { MovieCreditsCrewResponse } from './movie-credits-crew-response';

export interface MovieCreditsResponse {
  id: number;
  cast: MovieCreditsCastResponse[];
  crew: MovieCreditsCrewResponse[];
}
