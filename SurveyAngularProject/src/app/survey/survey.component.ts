import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
   dataSource:MatTableDataSource<Element> ;
   ELEMENT_DATA: Element[] ;


  displayedColumns = ['index' , 'title', 'createdAt', 'createdBy'];

  @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
  }

  returnedData :string ;
  constructor( private httpClient:HttpClient){
    this.set_products();
  }

  getRecord(data){
    console.log("clicked" + JSON.stringify(data))
  }

  set_products(){
    this.httpClient.get('http://localhost:3000/survay').subscribe((res)=>{
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

// const ELEMENT_DATA: Element[] = [
//   { position: 1, title: 'Hydrogen', date: 1.0079, voting: 'H' },
//   { position: 2, title: 'Helium', date: 4.0026, voting: 'He' },
//   { position: 3, title: 'Lithium', date: 6.941, voting: 'Li' },
//   { position: 4, title: 'Beryllium', date: 9.0122, voting: 'Be' },
//   { position: 5, title: 'Boron', date: 10.811, voting: 'B' },
//   { position: 6, title: 'Carbon', date: 12.0107, voting: 'C' },
//   { position: 7, title: 'Nitrogen', date: 14.0067, voting: 'N' },
//   { position: 8, title: 'Oxygen', date: 15.9994, voting: 'O' },
//   { position: 9, title: 'Fluorine', date: 18.9984, voting: 'F' },
//   { position: 10, title: 'Neon', date: 20.1797, voting: 'Ne' },
//   { position: 11, title: 'Sodium', date: 22.9897, voting: 'Na' },
//   { position: 12, title: 'Magnesium', date: 24.305, voting: 'Mg' },
//   { position: 13, title: 'Aluminum', date: 26.9815, voting: 'Al' },
//   { position: 14, title: 'Silicon', date: 28.0855, voting: 'Si' },
//   { position: 15, title: 'Phosphorus', date: 30.9738, voting: 'P' },
//   { position: 16, title: 'Sulfur', date: 32.065, voting: 'S' },
//   { position: 17, title: 'Chlorine', date: 35.453, voting: 'Cl' },
//   { position: 18, title: 'Argon', date: 39.948, voting: 'Ar' },
//   { position: 19, title: 'Potassium', date: 39.0983, voting: 'K' },
//   { position: 20, title: 'Calcium', date: 40.078, voting: 'Ca' },
// ];
