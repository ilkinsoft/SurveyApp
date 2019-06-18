import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { Element } from '@angular/compiler';
import { Router } from '@angular/router';


import { SurveyInviteComponent } from '../survey-invite/survey-invite.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  dataSource: MatTableDataSource<Element>;
  ELEMENT_DATA: Element[];


  displayedColumns = ['index' , 'title', 'createdAt', 'createdBy','actions'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
  }

  returnedData: string;
  constructor(private httpClient: HttpClient, private router: Router,private dialog: MatDialog) {
    this.set_products();
  }

  viewDetails(data){
    this.router.navigate(['./surveyDetails',{"id" :data._id }]);
  }

  set_products() {
    this.httpClient.get('http://localhost:3000/surveys').subscribe((res) => {
      console.log(JSON.stringify(res));
      this.ELEMENT_DATA = JSON.parse(JSON.stringify(res));
      this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

    });
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(SurveyInviteComponent, {
      height: '200px',
      width: '600px',
      data: {surveyId:data._id}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed: ' + result);
    // });
  }
}

export interface Element {
  index: string;
  title: string;
  createdBy: string;
  createdAt: string;
}


