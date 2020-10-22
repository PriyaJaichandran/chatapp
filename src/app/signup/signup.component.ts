import { Component, OnInit } from '@angular/core';
import{FormGroup,Validators,FormBuilder} from '@angular/forms/';
import {SigninService} from '../services/signin.service';
import {Userdetails} from '../services/userdetails';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  user : Userdetails;
  constructor(
    private formBuilder: FormBuilder,
    private signupservice: SigninService,
    private logger: NGXLogger
  ) { }

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      user_name: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
  get formObj(){
    return this.signupform.controls;
  }
  
  onSubmit(){
    let userdata=this.signupform.getRawValue();
    this.user=JSON.parse(JSON.stringify(userdata));
    this.logger.debug(this.user);
    this.signupservice.signupuser(this.user);
  }
}
