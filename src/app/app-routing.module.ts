import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ChatboxComponent} from './chatbox/chatbox.component';
import {HomepageComponent} from './homepage/homepage.component';
const routes: Routes = [
  {path: 'signin',component:SigninComponent},
  {path: 'signup',component:SignupComponent},
  {path: 'chatbox',component:ChatboxComponent},
  {path: 'homepage',component:HomepageComponent},
  {path: '',redirectTo:'/signin',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
