import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-survey-dialog',
  templateUrl: './create-survey-dialog.component.html',
  styleUrls: ['./create-survey-dialog.component.css']
})
export class CreateSurveyDialogComponent implements OnInit {

  form: FormGroup;


  constructor(public dialogRef: MatDialogRef<CreateSurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMultiChoiceCount: DialogData,
    @Inject(MAT_DIALOG_DATA) public dataOpenEndedCount: DialogData,
    
    // private httpService: MyHttpServiceService,
    private formBuilder: FormBuilder,
    // private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      multiChoiceCount: [1, [Validators.min(1), Validators.max(10)]],
      openEndedCount: [1, [Validators.min(1), Validators.max(10)]],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  setQuestionsCount(): void {
    console.log(this.dataMultiChoiceCount);
    console.log(this.dataOpenEndedCount);

    localStorage.setItem('multiChoiceCount', this.dataMultiChoiceCount.toString());
    localStorage.setItem('openEndedCount', this.dataOpenEndedCount.toString());

    // this.router.navigate(['/create-survey'])
    window.location.href='/create-survey';
  }

}

export interface DialogData {
  multiChoiceCount: number;
  openEndedCount: number;
}
