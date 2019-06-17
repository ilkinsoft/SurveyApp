import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './layout/app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './routing';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {DemoMaterialModule} from './material-module';
import {ToastrModule} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import { SurveyComponent } from './survey/survey.component';
import { HttpClientModule } from '@angular/common/http';
import { SurvayDetailsComponent } from './survay-details/survay-details.component';
import { ChartsModule } from 'ng2-charts';
import { SurveyInviteComponent } from './survey-invite/survey-invite.component';
import { SurveyService } from './survey.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, LoginComponent, HomeComponent,RegisterComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DemoMaterialModule, BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
