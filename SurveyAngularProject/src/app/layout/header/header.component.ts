import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../services/NotificationService";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  username:String;

  constructor(private notificationService:NotificationService,private router:Router) { }

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

}
