import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MyHttpServiceService } from '../services/MyHttpService';
import { ToastrService } from 'ngx-toastr';

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

  resultSurvey={title:"",createdBy:"",createdAt:"",questions:[]};

  constructor(private formBuilder: FormBuilder, private myHttpService: MyHttpServiceService, private toastr: ToastrService) {

    this.surveyForm = formBuilder.group({

      'title': ['', Validators.compose([Validators.required])],
      'createdBy': ['', Validators.compose([Validators.required, Validators.email])],
      'createdAt': ['', Validators.compose([Validators.required])],
      'questions': this.formBuilder.array([this.createQuestion()]),

      // 'birthday': ['', Validators.compose([Validators.required])],
      // 'maritalStatus': ['', Validators.compose([Validators.required])],
      // 'country': ['', Validators.compose([Validators.required])],
    });

    for (let i = 0; i < 6; i++) {
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
      'choice1': ['', Validators.compose([Validators.required])],
      'choice2': ['', Validators.compose([Validators.required])],
      'choice3': ['', Validators.compose([Validators.required])],
      'choice4': ['', Validators.compose([Validators.required])]
    });
  }

  createChoice(): FormGroup {
    // return this.formBuilder.array()
    // this.addChoice()

    return this.formBuilder.group({      
      0: ['', Validators.compose([Validators.required])],
      1: ['', Validators.compose([Validators.required])],
      2: ['', Validators.compose([Validators.required])],
      3: ['', Validators.compose([Validators.required])]
    })
  }

  addChoice(): void {
    this.choiceList = this.surveyForm.get('choices') as FormArray;

    // this.choiceList = this.questionList.controls[0].controls.choices;
    // console.log(this.choiceList)
    // for (let i = 0; i < this.questionList.length; i++) {
    //   this.questionList[i].push(this.createChoice())
    // }
    this.choiceList.push(this.createChoice());
  }

  ngOnInit() {
  }

  parseJson() {
    this.resultSurvey.title=this.surveyForm.value.title;
    this.resultSurvey.createdBy="somebody";
    this.resultSurvey.createdAt= new Date().toString();
    this.resultSurvey.questions=[];

    //console.log(this.surveyForm.value.questions);

    for(let i=0;i<this.surveyForm.value.questions.length;i++){
      let tempQuestion = this.surveyForm.value.questions[i];
      //console.log("boommmmtemp"+tempQuestion);
      let textOfQuestion = tempQuestion.question;
      let choices=[];
      choices.push(tempQuestion.choice1);
      choices.push(tempQuestion.choice2);
      choices.push(tempQuestion.choice3);
      choices.push(tempQuestion.choice4);

      let questionObject={question:{},choices:[]};
      questionObject.question=textOfQuestion;
      questionObject.choices=choices;

      this.resultSurvey.questions.push(questionObject);
    }
    // console.log(this.surveyForm.value);
    console.log(this.resultSurvey);
  }

  onSubmit(): void {

    this.parseJson()
    let body = JSON.parse(JSON.stringify(this.resultSurvey))
    console.log(body)

    this.myHttpService.post('surveys/add', body).subscribe((result: any) =>{
      //console.log("success")

      // console.log(this.resultSurvey)
      if(result.code === 'SUCCESS'){
        this.toastr.success('Yaay, Created successfully!', 'Success!',{timeOut:2000, positionClass: 'toast-top-center'});
      }else{
        this.toastr.error("Something went wrong!", 'Error :(',{timeOut:2000, positionClass: 'toast-top-center'});
      }
      console.log(result);
    });

  }

}
