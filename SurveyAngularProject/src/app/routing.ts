import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { SurvayDetailsComponent } from './survay-details/survay-details.component';
import {RegisterComponent} from "./register/register.component";
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import {CreateSurveyComponent} from "./create-survey/create-survey.component";
import {SurveyInviteComponent} from "./survey-invite/survey-invite.component";
import {AuthorizationGuard} from "./interceptors/AuthGuard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'logout', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //{path: 'viewSurvey/:surveyId' , component: ViewSurveyComponent},
  {path: 'viewSurvey/:surveyId/:email' , component: ViewSurveyComponent},


  { path: 'create-survey', component: CreateSurveyComponent,canActivate : [AuthorizationGuard] },
  { path: 'survey', component: SurveyComponent,canActivate : [AuthorizationGuard] },
  { path: 'surveyDetails', component: SurvayDetailsComponent,canActivate : [AuthorizationGuard] },
  {path: 'surveyInvite' , component: SurveyInviteComponent,canActivate : [AuthorizationGuard]},
  { path: '', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
