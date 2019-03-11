import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import User from '../models/user';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const usersUrl = "/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private socket = io("http://172.20.10.2:3000");
  constructor(private http: HttpClient) { }
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

getUsers(httpOptions): Observable<any> {
	console.log("entered in getUsers service");
    return this.http.get('/users/list', httpOptions)
      .pipe(res  => {
		  console.log(res);
        return res;// as User[];
      })
}

getUser(id: string, httpOptions): Observable<any> {
  const url = `${usersUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postUser(data, httpOptions): Observable<any> {
  return this.http.post('/users',data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updateUser(id, data, httpOptions): Observable<any> {
	const url = `${usersUrl}/${id}`;
	return this.http.put(url, data, httpOptions)
	 .pipe(
		catchError(this.handleError)
	 );
}


deleteUser(id: string, httpOptions): Observable<{}> {
  const url = `${usersUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(res  => {
			this.socket.emit('deleteUser',res);
			return res;
		});
}

}
