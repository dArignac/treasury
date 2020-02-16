import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TheMovieDbTokenReturnComponent } from './token-return.component';

describe('TheMovieDbTokenReturnComponent', () => {
  let component: TheMovieDbTokenReturnComponent;
  let fixture: ComponentFixture<TheMovieDbTokenReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheMovieDbTokenReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheMovieDbTokenReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
