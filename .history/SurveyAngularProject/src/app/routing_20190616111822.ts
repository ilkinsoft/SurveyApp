import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SurveyInviteComponent } from './survey-invite/survey-invite.component';

const routes: Routes = [
    {path: 'login' , component: LoginComponent},
    {path: 'surveyInvite' , component: SurveyInviteComponent},
    {path: '' , component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }