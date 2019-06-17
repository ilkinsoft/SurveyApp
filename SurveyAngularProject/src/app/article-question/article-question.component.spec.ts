import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleQuestionComponent } from './article-question.component';

describe('ArticleQuestionComponent', () => {
  let component: ArticleQuestionComponent;
  let fixture: ComponentFixture<ArticleQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
