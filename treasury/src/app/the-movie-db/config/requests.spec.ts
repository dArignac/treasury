import { Requests } from './requests';
import { environment } from '../../../environments/environment';
import { TheMovieDbURL } from './urls';

describe('Requests', () => {
  const url = 'https://api.themoviedb.org/3';

  it('should return correct movie search url', () => {
    expect(Requests.getURL(TheMovieDbURL.MovieSearch)).toEqual(url + '/search/movie');
    expect(Requests.getURL(TheMovieDbURL.MovieSearch, 777)).toBe(url + '/search/movie');
  });

  it('should return correct movie credits url', () => {
    expect(Requests.getURL(TheMovieDbURL.MovieCredits)).toBeUndefined();
    expect(Requests.getURL(TheMovieDbURL.MovieCredits, 0)).toBeUndefined();
    expect(Requests.getURL(TheMovieDbURL.MovieCredits, -66)).toBeUndefined();
    expect(Requests.getURL(TheMovieDbURL.MovieCredits, 777)).toBe(url + '/movie/777/credits');
  });

  it('should return correct request token url', () => {
    expect(Requests.getURL(TheMovieDbURL.AuthenticationRequestTokenCreate)).toEqual(url + '/authentication/token/new');
  });

  it('should return correct session token url', () => {
    expect(Requests.getURL(TheMovieDbURL.AuthenticationSessionCreate)).toEqual(url + '/authentication/session/new');
  });

  it('should return correct basic query params', () => {
    const params = Requests.getBasicQueryParams();
    expect(params.keys().length).toBe(1);
    expect(params.get('api_key')).toBeTruthy();
    expect(params.get('api_key')).toEqual(environment.themoviedb.apiKey);
  });
});
