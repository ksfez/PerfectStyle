import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import * as io from 'socket.io-client';


import 'rxjs/add/operator/map';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class AuthenticationService {
  private token: string;
  private authToken: string;
  private user: any;
  private socket = io("http://10.0.0.7:3000");


  constructor(private http: HttpClient, private router: Router) {}
   private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
};
private extractData(res: Response) {
  let body = res;
  return body || { };
}

  public login(data): Observable<any> {
	  console.log(data);
	  console.log(httpOptions);
	  return this.http.post('/users/login',data, httpOptions).pipe(
		res  => {
			this.socket.emit('login', data);
			return res;
		}
		);
  }
  
  public logOut(httpOptions): Observable<any> {
	  return this.http.get('/users/logout', httpOptions)
	  .pipe(res => {
		  this.socket.emit('logout', res);
		  return res;
	  }
      );
  }
  
  public signup(data): Observable<any> {
	  
	  return this.http.post('/users/signup',data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  public forgotPassword(data): Observable<any> {
	  return this.http.post('/users/forgotPassword',data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  public profile(httpOptions): Observable<any> {
     return this.http.get('/users/profile', httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
  }
  
  public checkAdmin(httpOptions): Observable<any> {
     return this.http.get('/users/checkAdmin', httpOptions).pipe(
    catchError(this.handleError));
  }
  
  public checkConnection(httpOptions): Observable<any> {
     return this.http.get('/users/checkConnection', httpOptions).pipe(
    catchError(this.handleError));
  }
  
 

	  
	  
}
