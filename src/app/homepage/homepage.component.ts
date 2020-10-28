import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  template:'<app-chatbox [userFromParent]=selectedUserdata></app-chatbox>',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  selectedUserdata;
  //Userdetails from session
  userObject;
  router: Router;
  constructor(_router: Router) { this.router = _router; }
  loggedInUser;
  ngOnInit(): void {
    if (typeof (Storage) !== "undefined") {
      console.log("from session");
      if (sessionStorage['user']) {
        this.userObject = JSON.parse(sessionStorage.user);
        console.log(this.userObject);
        this.loggedInUser=this.userObject.user_name;
        if (this.userObject.email === null || this.userObject.email === undefined) {
          this.router.navigate(['/signin']);
        }
      }
    }
  }
  handleResults(userinfo) {
    this.selectedUserdata = userinfo
    console.log(this.selectedUserdata);
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/signin']);
  }
} 
