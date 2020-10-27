import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Userdetails } from '../services/userdetails';
import { LinkedusersService } from '../services/linkedusers.service';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-linkedusers',
  templateUrl: './linkedusers.component.html',
  styleUrls: ['./linkedusers.component.css']
})
export class LinkedusersComponent implements OnInit {
  @Output() public userinfo = new EventEmitter<any>();
  linkeduserform: FormGroup;
  user: Userdetails;
  submitted = false;
  responseUser;
  resMessage;
  router: Router;
  errorMessage;
  userdata;
  userObject;

  constructor(
    private formBuilder: FormBuilder,
    private linkeduserservice: LinkedusersService,
    private logger: NGXLogger,
    _router: Router
  ) { this.router = _router; }

  ngOnInit() {
    this.linkeduserform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (sessionStorage['user']) {
      this.userObject = JSON.parse(sessionStorage.user);
    }
    this.linkeduserservice.getAllUsers(this.userObject.email).subscribe(data => {
      this.responseUser = data;
      this.userdata =this.responseUser.data;
      console.log(this.userdata);
      this.resMessage = this.responseUser.message;
    })
  }
  shareUserInfo(user){
    console.log(user);
    this.userinfo.emit(user);
  }
}
