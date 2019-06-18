import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MyHttpServiceService } from '../services/MyHttpService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-survey-invite',
  templateUrl: './survey-invite.component.html',
  styleUrls: ['./survey-invite.component.css']
})
export class SurveyInviteComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SurveyInviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpService:MyHttpServiceService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  inviteUser():void {
    console.log(this.data);
    this.httpService.post('surveys/inviteToSurvey',JSON.stringify(this.data))
      .subscribe(result=>{
        this._snackBar.open('User invited succesfully', '', {
          duration: 2000,
        });
      });
  }

}

export interface DialogData {
  email: string;
  surveyId:string;
}
