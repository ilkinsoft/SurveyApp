import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { SurvayDetailsComponent } from './survay-details/survay-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'surveyDetails', component: SurvayDetailsComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }