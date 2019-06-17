import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MyHttpServiceService} from "../services/MyHttpService";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;


  constructor(private router:Router,private toastr: ToastrService,private formBuilder: FormBuilder,private myHttpService:MyHttpServiceService) {
    this.registerForm = formBuilder.group({
      'username': ['', Validators.compose([Validators.required,this.usernameValidator])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required,this.passwordValidator])],
      'gender': ['',Validators.compose([Validators.required])],
      'birthday': ['',Validators.compose([Validators.required,this.birthdayValidator])],
      'maritalStatus': ['',Validators.compose([Validators.required])],
      'country': ['',Validators.compose([Validators.required])],
    });
   }

  ngOnInit() {

  }




  usernameValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value.length <4) {
      return { 'invalid': true };
    }
    return null;
  }

  birthdayValidator(control: FormControl): { [s: string]: boolean } {
/*    if (control.value.length <4) {
      return { 'invalid': true };
    }*/
    return null;
  }


  passwordValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value.length <6) {
      return { 'invalid': true };
    }
    return null;
  }

  onSubmit(): void {

    this.myHttpService.post('users/',this.registerForm.value).subscribe((result: any) =>{
      //console.log("success")

      if(result.code === 'SUCCESS'){
        this.toastr.success('Registered successfully, now time to login!', 'Success!',{timeOut:2000, positionClass: 'toast-top-center'});
        this.router.navigate(['/login'])
      }else{
        this.toastr.error("Something went wrong!", 'Error :(',{timeOut:2000, positionClass: 'toast-top-center'});

      }
      console.log(result);
    });

    console.log(this.registerForm.value);
  }

}
