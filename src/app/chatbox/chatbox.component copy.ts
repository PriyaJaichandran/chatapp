import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  @Input() public userInfoSelected : Array <any> = [];
  socket_conn;
  message;
  datalist;
  messagedata;
  chatboxform: FormGroup;
  userObject;
  selectedUserdata;
  username;
  @Input() userFromParent;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    //Defining Form
    this.chatboxform = this.formBuilder.group({
      message: ['', Validators.required],
      datalist: ['', Validators.required]
    });
    if (sessionStorage['user']) {
      this.userObject = JSON.parse(sessionStorage.user);
      this.username=this.userObject.username;
    }
    
    this.setupSocketConnection();
  }
  //Get form values
  get formObj() {
    return this.chatboxform.controls;
  }
   connectUser () {  // Called whenever a user signs in
  if (!this.username) return;
  this.socket_conn.emit('userConnected', this.username);
}
  setupSocketConnection() {
    
    this.socket_conn = io(environment.SOCKET_ENDPOINT);
    this.socket_conn.on('connect', this.connectUser);
    //this.socket_conn.emit('userConnected', this.userObject.username);
    this.socket_conn.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        document.getElementById('datalist').appendChild(element);
      }
    });
  }
  sendMessage() {
    console.log('send message user obj');
    console.log(this.userObject);
    console.log(this.userObject.username);
    console.log("selected user from linked module userFromParent");
    console.log(this.userFromParent);
    this.messagedata = {
      "username": this.userFromParent.user_name,
      "data": this.formObj.message.value
    }
    this.message=this.formObj.message.value;
    this.socket_conn.emit('message', this.messagedata);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('datalist').appendChild(element);
    //document.getElementById('message').nodeValue="";
  }
  handleResults(userinfo) {
    this.selectedUserdata = userinfo
    console.log(this.selectedUserdata);
  }
}
