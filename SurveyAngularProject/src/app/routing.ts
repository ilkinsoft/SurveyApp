import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { SurvayDetailsComponent } from './survay-details/survay-details.component';
import {RegisterComponent} from "./register/register.component";
import { ViewSurveyComponent } from './view-survey/view-survey.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-survey', component: CreateSurveyComponent },

  { path: 'survey', component: SurveyComponent },
  { path: 'surveyDetails', component: SurvayDetailsComponent },
  {path: 'surveyInvite' , component: SurveyInviteComponent},
  {path: 'viewSurvey/:surveyId' , component: ViewSurveyComponent},
  { path: '', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
