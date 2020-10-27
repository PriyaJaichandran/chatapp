import { Component, OnInit } from '@angular/core';
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

  linkeduserform: FormGroup;
  user: Userdetails;
  submitted = false;
  responseUser;
  resMessage;
  router: Router;
  errorMessage;
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
    this.linkeduserservice.getAllUsers().subscribe((data: {}) => {
      this.responseUser = data;
      this.resMessage = this.responseUser.message;
    })
  }

}
