import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MyHttpServiceService} from "../services/MyHttpService";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;



  constructor(private router:Router,private toastr: ToastrService,private formBuilder: FormBuilder,private myHttpService:MyHttpServiceService) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
    });

  }

  ngOnInit() {
  }

  onSubmit(): void {

    this.myHttpService.post('users/login',this.loginForm.value).subscribe((result: any) =>{

      if(result.code === 'SUCCESS'){
        this.toastr.success('Logged in successfully!', 'Success!',{timeOut:2000, positionClass: 'toast-top-center'});
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', result.data.user);

        // todo this.router.navigate(['/login'])
      }else{
        this.toastr.error("Username or password wrong!", 'Error :(',{timeOut:3000, positionClass: 'toast-top-center'});

      }
      console.log(result);
    });

    console.log(this.loginForm.value);
  }

}
