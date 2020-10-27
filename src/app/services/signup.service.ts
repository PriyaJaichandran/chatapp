import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { apiconst } from '../util/restapi-constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, publishReplay, refCount } from 'rxjs/operators';
import { Userdetails } from '../services/userdetails';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  responseUser;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getUserdetails(email):Observable<Userdetails>{
    return this.http.get<Userdetails>(environment.BASE_URL + '/user/' + email)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  signupuser(user): Observable<Userdetails> {
    return this.http.post<Userdetails>(environment.BASE_URL + '/' + apiconst.SIGNUP_USER, JSON.stringify(user), this.httpOptions)
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
  //API Call : POST : Create User
  /*signupuser(userdetailsobj) {
    return this.http.post<any>(environment.BASE_URL+'/'+apiconst.SIGNIN_USER, userdetailsobj).subscribe(data => {
      console.log(data);
      this.responseUser = data;
    });
    }*/

}
