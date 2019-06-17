import { Component, OnInit, Input } from '@angular/core';
import { RootObject, Question } from '../serveyStr';

@Component({
  selector: 'app-mulitchoisequestion',
  templateUrl: './mulitchoise-question.component.html',
  styleUrls: ['./mulitchoise-question.component.css']
})
export class MulitchoiseQuestionComponent implements OnInit {
  @Input() question: Question;


  ngOnInit() {
    console.log("input " + JSON.stringify(this.question))
    this.pieChartLabels = this.question.choices;
    this.pieChartData = this.question.answerStatistic;
  }

  title = 'app';
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {
    'backgroundColor': [
      "#FF6384",
      "#4BC0C0",
      "#FFCE56",
      "#E7E9ED",
      "#36A2EB"
    ]
  }

  public  colors = [
    { // 1st Year.
      backgroundColor: [
        "#FF6384",
        "#4BC0C0",
        "#FFCE56",
        "#36A2EB"
      ]
    }]
    
}
