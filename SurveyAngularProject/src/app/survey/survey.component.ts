import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {

  displayedColumns = ['position', 'title', 'date', 'voting'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  returnedData :string ;
  constructor( private httpClient:HttpClient){
    this.set_products();
  }

  set_products(){
    this.httpClient.get('http://localhost:3000/survay').subscribe(result => {
      // Handle result
      console.log(result)
    },
    error => {
      console.log(error)
    },
    () => {
      // 'onCompleted' callback.
      // No errors, route to new page here
      console.log("finish")
    })
  }
}

export interface Element {
  title: string;
  position: number;
  date: number;
  voting: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, title: 'Hydrogen', date: 1.0079, voting: 'H' },
  { position: 2, title: 'Helium', date: 4.0026, voting: 'He' },
  { position: 3, title: 'Lithium', date: 6.941, voting: 'Li' },
  { position: 4, title: 'Beryllium', date: 9.0122, voting: 'Be' },
  { position: 5, title: 'Boron', date: 10.811, voting: 'B' },
  { position: 6, title: 'Carbon', date: 12.0107, voting: 'C' },
  { position: 7, title: 'Nitrogen', date: 14.0067, voting: 'N' },
  { position: 8, title: 'Oxygen', date: 15.9994, voting: 'O' },
  { position: 9, title: 'Fluorine', date: 18.9984, voting: 'F' },
  { position: 10, title: 'Neon', date: 20.1797, voting: 'Ne' },
  { position: 11, title: 'Sodium', date: 22.9897, voting: 'Na' },
  { position: 12, title: 'Magnesium', date: 24.305, voting: 'Mg' },
  { position: 13, title: 'Aluminum', date: 26.9815, voting: 'Al' },
  { position: 14, title: 'Silicon', date: 28.0855, voting: 'Si' },
  { position: 15, title: 'Phosphorus', date: 30.9738, voting: 'P' },
  { position: 16, title: 'Sulfur', date: 32.065, voting: 'S' },
  { position: 17, title: 'Chlorine', date: 35.453, voting: 'Cl' },
  { position: 18, title: 'Argon', date: 39.948, voting: 'Ar' },
  { position: 19, title: 'Potassium', date: 39.0983, voting: 'K' },
  { position: 20, title: 'Calcium', date: 40.078, voting: 'Ca' },
];
