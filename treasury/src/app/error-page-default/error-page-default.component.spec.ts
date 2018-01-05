import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageDefaultComponent } from './error-page-default.component';

describe('ErrorPageDefaultComponent', () => {
  let component: ErrorPageDefaultComponent;
  let fixture: ComponentFixture<ErrorPageDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPageDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
