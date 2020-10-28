import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LinkedusersComponent } from './linkedusers/linkedusers.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { SigninComponent } from './signin/signin.component';
import {FormGroup, FormsModule, Validators,ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HomepageComponent } from './homepage/homepage.component';

import {AvatarModule } from 'ngx-avatar';
@NgModule({
  declarations: [
    AppComponent,
    LinkedusersComponent,
    ChatboxComponent,
    SigninComponent,
    SignupComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
