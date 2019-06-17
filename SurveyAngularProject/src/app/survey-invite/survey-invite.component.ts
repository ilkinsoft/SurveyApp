import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-survey-invite',
  templateUrl: './survey-invite.component.html',
  styleUrls: ['./survey-invite.component.css']
})
export class SurveyInviteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SurveyInviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
