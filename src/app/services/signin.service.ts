import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userdetails } from './userdetails';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class SigninService {

  userid;
  constructor(private http: HttpClient) { }
  baseUrl: string = "http://localhost:3000/api";

  //API Call : POST : Create User
  signupuser(userdetailsobj) {
    return this.http.post<any>(this.baseUrl, userdetailsobj).subscribe(data => {
      this.userid = data.id;
    });
  }
}
