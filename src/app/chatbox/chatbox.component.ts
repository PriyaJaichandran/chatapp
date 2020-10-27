import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {ChatsocketService} from '../services/chatsocket.service';
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
  //socket = io();
  @Input() userFromParent;
  constructor(private formBuilder:FormBuilder,
    private chatservice  :ChatsocketService) { }
    sendMsg() {
      this.chatservice.sendMessage(this.message);
      this.message = '';
    }

  ngOnInit() {
    //Defining Form
    this.chatboxform = this.formBuilder.group({
      message: ['', Validators.required],
      datalist: ['', Validators.required]
    });
    if (sessionStorage['user']) {
      this.userObject = JSON.parse(sessionStorage.user);
    }
    this.setupSocketConnection();
  }
  //Get form values
  get formObj() {
    return this.chatboxform.controls;
  }
  setUsername() {
    this.socket_conn.emit('setUsername', this.userFromParent.user_name);
 };
  setupSocketConnection() {
    this.socket_conn = io(environment.SOCKET_ENDPOINT);
    console.log('emit username');
    console.log(this.userObject.username);
    this.socket_conn.emit('setUsername', this.userObject.username);

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
    this.messagedata = {
      "username": this.userFromParent.user_name,
      "data": this.formObj.message.value
    }
    this.message=this.formObj.message.value;
    console.log('this is user message >>>')
    console.log(this.message)
    this.socket_conn.emit('message', this.messagedata);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('datalist').appendChild(element);
    this.chatboxform.controls.message=null;
  }
  handleResults(userinfo) {
    this.selectedUserdata = userinfo
    console.log(this.selectedUserdata);
  }
}
