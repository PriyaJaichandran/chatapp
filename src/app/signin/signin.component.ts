import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Userdetails } from '../services/userdetails';
import {SigninService} from '../services/signin.service';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinform: FormGroup;
  user: Userdetails;
  submitted = false;
  responseUser;
  resMessage;
  router: Router;
  errorMessage;
  constructor(
    private formBuilder: FormBuilder,
    private signinservice : SigninService,
    private logger: NGXLogger,
    _router: Router
  ) { this.router = _router;}

  ngOnInit() {
    this.signinform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  //Get form values
  get formObj() {
    return this.signinform.controls;
  }
  onReset() {
    this.submitted = false;
    this.signinform.reset();
  }
  //Onsubmit - Login service call
  onSubmit() {
    this.submitted =true;
    if(this.signinform.invalid){
      return;
    }
    let userdata = this.signinform.getRawValue();
    this.user = JSON.parse(JSON.stringify(userdata));
    this.logger.debug(this.user);
    //this.signinservice.signinuser(this.user);
    this.signinservice.signinuser(this.user).subscribe((data: {}) => {
      this.responseUser = data;
      this.resMessage=this.responseUser.message;
      if(this.resMessage==='VALID PASSWORD'){
        this.router.navigate(['/homepage']);
      }
      else if(this.resMessage==='INVALID PASSWORD'){
        this.onReset();
        this.errorMessage='Please enter valid credentials';
      }

    })
  }
}
