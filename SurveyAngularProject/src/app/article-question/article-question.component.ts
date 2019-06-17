import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../serveyStr';

@Component({
  selector: 'app-articlequestion',
  templateUrl: './article-question.component.html',
  styleUrls: ['./article-question.component.css']
})
export class ArticleQuestionComponent implements OnInit {

  constructor() { }
  @Input() question : Question;

  ngOnInit() {
  }

}
