import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './layout/app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './routing';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './material-module';
import { SurveyComponent } from './survey/survey.component';
import { HttpClientModule } from '@angular/common/http';
import { SurvayDetailsComponent } from './survay-details/survay-details.component';
import { ChartsModule } from 'ng2-charts';
import { MulitchoiseQuestionComponent } from './mulitchoise-question/mulitchoise-question.component';
import { ArticleQuestionComponent } from './article-question/article-question.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, LoginComponent, HomeComponent, SurveyComponent, SurvayDetailsComponent, MulitchoiseQuestionComponent, ArticleQuestionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DemoMaterialModule, BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
