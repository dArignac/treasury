import { TestBed } from '@angular/core/testing';
import { TheMovieDbSessionService } from './session-service.service';

describe('SessionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheMovieDbSessionService = TestBed.get(TheMovieDbSessionService);
    expect(service).toBeTruthy();
  });
});
