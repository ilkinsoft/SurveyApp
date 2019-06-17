import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { Element } from '@angular/compiler';
import { Router } from '@angular/router';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  dataSource: MatTableDataSource<Element>;
  ELEMENT_DATA: Element[];



  displayedColumns = ['index', 'title', 'createdAt', 'createdBy'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  ngAfterViewInit() {

  }

  returnedData: string;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.set_products();
  }

  getRecord(data) {
    this.router.navigate(['./surveyDetails',{"id" :data._id }]);
  }

  set_products() {
    this.httpClient.get('http://localhost:3000/survay').subscribe((res) => {
      console.log(JSON.stringify(res));
      this.ELEMENT_DATA = JSON.parse(JSON.stringify(res));
      this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

    });
  }
}

export interface Element {
  index: string;
  title: string;
  createdBy: string;
  createdAt: string;
}
