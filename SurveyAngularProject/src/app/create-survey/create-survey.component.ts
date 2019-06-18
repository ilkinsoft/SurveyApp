import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MyHttpServiceService } from '../services/MyHttpService';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  date = new FormControl(new Date());
  surveyForm: FormGroup;

  questions: [];
  questionList: any;
  choices: [];
  choiceList: any;

  resultSurvey = { title: "", createdBy: "", createdAt: "", questions: [] };

  constructor(private router:Router,private formBuilder: FormBuilder, private myHttpService: MyHttpServiceService, private toastr: ToastrService) {

    this.surveyForm = formBuilder.group({

      'title': ['', Validators.compose([Validators.required])],
      'questions': this.formBuilder.array([this.createQuestion()]),
    });

    for (let i = 0; i < 4; i++) {
      this.addQuestion()
    }
    // for (let k = 0; k < 3; k++)
    //   this.addChoice()
  }

  addQuestion(): void {
    this.questionList = this.surveyForm.get('questions') as FormArray;
    this.questionList.push(this.createQuestion());
  }

  createQuestion(): FormGroup {
    return this.formBuilder.group({
      'question': ['', Validators.compose([Validators.required])],
      'choice1': [''],
      'choice2': [''],
      'choice3': [''],
      'choice4': ['']
    });
  }

  ngOnInit() {
  }

  parseJson() {

    let user = JSON.parse(localStorage.getItem('user'));

    this.resultSurvey.title = this.surveyForm.value.title;
    this.resultSurvey.createdBy = user.username;
    this.resultSurvey.createdAt = new Date().toString();
    this.resultSurvey.questions = [];

    for (let i = 0; i < this.surveyForm.value.questions.length; i++) {
      let tempQuestion = this.surveyForm.value.questions[i];
      let textOfQuestion = tempQuestion.question;
      let choices = [];

      if (i < 3) // for multi-choice questions add choices
      {
        choices.push(tempQuestion.choice1);
        choices.push(tempQuestion.choice2);
        choices.push(tempQuestion.choice3);
        choices.push(tempQuestion.choice4);
      }

      let questionObject = { question: {}, choices: [] };
      questionObject.question = textOfQuestion;

      questionObject.choices = choices;

      this.resultSurvey.questions.push(questionObject);
    }
    console.log(this.resultSurvey);
  }

  onSubmit(): void {

    this.parseJson()
    let body = JSON.parse(JSON.stringify(this.resultSurvey))

    this.myHttpService.post('surveys/add', body).subscribe((result: any) => {

      // console.log(this.resultSurvey)
      if (result.code === 'SUCCESS') {
        this.toastr.success('Yaay, Created successfully!', 'Success!', { timeOut: 2000, positionClass: 'toast-top-center' });
        this.router.navigate(['/survey'])

      } else {
        this.toastr.error("Something went wrong!", 'Error :(', { timeOut: 2000, positionClass: 'toast-top-center' });
      }
      console.log(result);
    });

  }

}
