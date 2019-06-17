import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RootObject, Question } from '../serveyStr';

@Component({
  selector: 'app-survay-details',
  templateUrl: './survay-details.component.html',
  styleUrls: ['./survay-details.component.css']
})


export class SurvayDetailsComponent {
  id: string;
  data: RootObject;
  questions: Question[];
  constructor(private router: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.router.snapshot.paramMap.get('id');
    this.set_products()
  }

  set_products() {
    this.httpClient.get('http://localhost:3000/survay/serveyId/' + this.id).subscribe((res) => {
      this.data = JSON.parse(JSON.stringify(res));
      console.log("size " + this.data.questions.length)
      this.questions = this.data.questions;
    });
  }


}



