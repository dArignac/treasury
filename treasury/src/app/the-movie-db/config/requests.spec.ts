import { Requests } from './requests';
import { environment } from '../../../environments/environment';

describe('Requests', () => {
  const url = 'https://api.themoviedb.org/3/';

  it('should return correct movie search url', () => {
    expect(Requests.getURL('search_movie')).toEqual(url + 'search/movie');
    expect(Requests.getURL('search_movie', 777)).toBe(url + 'search/movie');
  });

  it('should return correct movie credits url', () => {
    expect(Requests.getURL('movie_credits')).toBeUndefined();
    expect(Requests.getURL('movie_credits', 0)).toBeUndefined();
    expect(Requests.getURL('movie_credits', -66)).toBeUndefined();
    expect(Requests.getURL('movie_credits', 777)).toBe(url + 'movie/777/credits');
  });

  it('should return correct request token url', () => {
    expect(Requests.getURL('request_token')).toEqual(url + 'authentication/token/new');
  });

  it('should return correct basic query params', () => {
    const params = Requests.getBasicQueryParams();
    expect(params.keys().length).toBe(1);
    expect(params.get('api_key')).toBeTruthy();
    expect(params.get('api_key')).toEqual(environment.themoviedb.apiKey);
  });
});
