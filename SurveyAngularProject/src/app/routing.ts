import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';

const routes: Routes = [
    {path: 'login' , component: LoginComponent},
    {path: '' , component: HomeComponent},
    {path: 'create-survey' , component: CreateSurveyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }