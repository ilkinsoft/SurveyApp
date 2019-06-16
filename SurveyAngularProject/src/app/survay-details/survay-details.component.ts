import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survay-details',
  templateUrl: './survay-details.component.html',
  styleUrls: ['./survay-details.component.css']
})
export class SurvayDetailsComponent {

  title = 'app';
  public pieChartLabels: string[] = ["A", "A-", "B+", "B", "B-"];
  public pieChartData: number[] = [21, 39, 10, 14, 16];
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

  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }
}