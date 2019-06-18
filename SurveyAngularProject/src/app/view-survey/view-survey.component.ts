import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { MyHttpServiceService } from '../services/MyHttpService';
import { ActivatedRoute } from "@angular/router";
import { Survey as MumSurvey, Answer,Element, Choice } from './survey';
import { of } from 'rxjs';

import * as Survey from 'survey-angular';
import * as widgets from 'surveyjs-widgets';
import 'inputmask/dist/inputmask/phone-codes/phone.js';

widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);

Survey.JsonObject.metaData.addProperty('questionbase', 'popupdescription:text');
Survey.JsonObject.metaData.addProperty('page', 'popupdescription:text');

Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-default my-rating";
Survey.StylesManager.applyTheme("bootstrapmaterial");

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  constructor(private httpService:MyHttpServiceService,private route:ActivatedRoute) { }

  surveyId:any;

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.surveyId = params['surveyId'];
      this.httpService.get('surveys/viewDetails/'+this.surveyId)
      .subscribe((result:MumSurvey)=>{
        this.initializeSurvey(result);
      });
    });
  }

  initializeSurvey(result:MumSurvey){
    const surveyModel = new Survey.Model(result);
    surveyModel.onAfterRenderQuestion.add((survey, options) => {
      if (!options.question.popupdescription) { return; }

      // Add a button;
      const btn = document.createElement('button');
      btn.className = 'btn btn-info btn-xs';
      btn.innerHTML = 'More Info';
      const question = options.question;
      btn.onclick = function () {
        // showDescription(question);
        alert(options.question.popupdescription);
      };
      const header = options.htmlElement.querySelector('h5');
      const span = document.createElement('span');
      span.innerHTML = '  ';
      header.appendChild(span);
      header.appendChild(btn);
    });
    surveyModel.onComplete.add(result =>this.submitAnwsers(result.data));
    Survey.SurveyNG.render('surveyElement', { model: surveyModel });
  }

  submitAnwsers(answers){
    console.log(answers);
    let data = {"user_id":"1","surveyId":this.surveyId, answers};

    console.log(data);
    this.httpService.post('surveys/completeSurvey',JSON.stringify(data))
      .subscribe(result=>{
        console.log(result);
      })
  }

}
