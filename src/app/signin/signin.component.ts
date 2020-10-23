import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signform: FormGroup;


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  //Get form values
  get formObj() {
    return this.signform.controls;
  }
  //Onsubmit - Login service call
  onSubmit() {
    console.log(this.formObj.username1.value);
  }
}
