import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms/';
import { SignupService } from '../services/signup.service';
import { Userdetails } from '../services/userdetails';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  user: Userdetails;
  responseUser;
  submitted = false;
  resMessage;
  errorMessage;
  router: Router;
  constructor(
    private formBuilder: FormBuilder,
    private signupservice: SignupService,
    private logger: NGXLogger,
    router_: Router
  ) { this.router = router_; }

  ngOnInit() {
    this.signupform = this.formBuilder.group({
      user_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get formObj() {
    return this.signupform.controls;
  }
  onReset() {
    this.submitted = false;
    this.signupform.reset();
  }
  clearErrorAlert() {
    this.errorMessage = "";
  }
  onSubmit() {
    this.submitted = true;
    if (this.signupform.invalid) {
      return;
    }
    let userdata = this.signupform.getRawValue();
    this.user = JSON.parse(JSON.stringify(userdata));
    this.logger.debug(this.user);
    //this.signupservice.signupuser(this.user);
    //Service call to check user exist
    this.signupservice.getUserdetails(this.user.email).subscribe((data: {}) => {
      this.responseUser = data;
      this.resMessage = this.responseUser.message;
      if (this.resMessage === 'USER FOUND') {
        this.errorMessage = 'Email already exists.';
        this.onReset(); 
      } else {
        //Create service call
        this.signupservice.signupuser(this.user).subscribe((data: {}) => {
          this.responseUser = data;
          this.resMessage = this.responseUser.message;
          if (this.resMessage === 'USER CREATED') {
            this.router.navigate(['/homepage']);
          }
        })
      }
    })

  }
}
