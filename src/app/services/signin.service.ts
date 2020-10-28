import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {apiconst} from '../util/restapi-constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, publishReplay, refCount } from 'rxjs/operators';
import {Userdetails} from './userdetails';

@Injectable({
  providedIn: 'root'
})

export class SigninService {

  userid;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }
  //API Call : GET : User login
  /*signinuser(userdetailsobj) {
    return this.http.post<any>(environment.BASE_URL+'/'+apiconst.SIGNIN_USER, userdetailsobj).subscribe(data => {
      console.log(data);
      this.userid = data.id;
    });
  }*/
  signinuser(user): Observable<Userdetails> {
    return this.http.post<Userdetails>(environment.BASE_URL+apiconst.SIGNIN_USER, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
