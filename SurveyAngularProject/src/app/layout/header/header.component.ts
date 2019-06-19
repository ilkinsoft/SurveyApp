import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../services/NotificationService";
import { MatDialog } from '@angular/material';
import { CreateSurveyDialogComponent } from 'src/app/create-survey-dialog/create-survey-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  username:String;

  constructor(private notificationService:NotificationService,private router:Router, private dialog: MatDialog) { }

  ngOnInit() {
    //console.log("user stirng: "+localStorage.getItem('user').toString());


    let user = JSON.parse(localStorage.getItem('user'));
    console.log("userObj: "+user);


    this.notificationService.getLoggedInSuccess.subscribe(msg => this.ngOnInit())

    if(user){
      this.username=user.username;
      console.log("username: "+this.username)

    }


  }

  logout(){
    localStorage.clear();

    this.username="";

    this.router.navigate(['/login'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateSurveyDialogComponent, {
      height: '300px',
      width: '600px',
      // data: {}
    });
  }
}
