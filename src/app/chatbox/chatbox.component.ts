import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  socket_conn;
  message;
  datalist;
  chatboxform: FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    //Defining Form
    this.chatboxform = this.formBuilder.group({
      message: ['', Validators.required],
      datalist: ['', Validators.required]
    });
    this.setupSocketConnection();
  }
  //Get form values
  get formObj() {
    return this.chatboxform.controls;
  }
  setupSocketConnection() {
    this.socket_conn = io(environment.SOCKET_ENDPOINT);
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
    this.message=this.formObj.message.value;
    this.socket_conn.emit('message', this.formObj.message.value);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('datalist').appendChild(element);
    document.getElementById('message').nodeValue="";
  }
}
