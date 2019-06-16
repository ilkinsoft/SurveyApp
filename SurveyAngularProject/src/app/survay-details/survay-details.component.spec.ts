import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvayDetailsComponent } from './survay-details.component';

describe('SurvayDetailsComponent', () => {
  let component: SurvayDetailsComponent;
  let fixture: ComponentFixture<SurvayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurvayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurvayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
