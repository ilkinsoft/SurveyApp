import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulitchoiseQuestionComponent } from './mulitchoise-question.component';

describe('MulitchoiseQuestionComponent', () => {
  let component: MulitchoiseQuestionComponent;
  let fixture: ComponentFixture<MulitchoiseQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulitchoiseQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulitchoiseQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
