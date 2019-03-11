import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import Shoe from '../models/shoe';

import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api";
const shoesUrl = "/shoes";
const usersUrl = "/users";
const loginUrl = "/login";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
getBooks(): Observable<any> {
  return this.http.get(apiUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getBook(id: string): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postBook(data): Observable<any> {
  return this.http.post(apiUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updateBook(id, data): Observable<any> {
	const url = `${apiUrl}/${id}`;
	return this.http.put(url, data, httpOptions)
	 .pipe(
		catchError(this.handleError)
	 );
}


deleteBook(id: string): Observable<{}> {
  const url = `${apiUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

 getShoes(): Observable<Shoe[]> {
	 console.log(`${shoesUrl}`);
    return this.http.get(`${shoesUrl}`)
      .map(res  => {
		  console.log(res);
        return res as Shoe[];
      })
  }

getShoe(id: string): Observable<any> {
  const url = `${shoesUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postShoe(data): Observable<any> {
  return this.http.post(shoesUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updateShoe(id, data): Observable<any> {
	const url = `${shoesUrl}/${id}`;
	return this.http.put(url, data, httpOptions)
	 .pipe(
		catchError(this.handleError)
	 );
}


deleteShoe(id: string): Observable<{}> {
  const url = `${shoesUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

getUsers(): Observable<any> {
  return this.http.get(usersUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getUser(id: string): Observable<any> {
  const url = `${usersUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postUser(data): Observable<any> {
  return this.http.post(usersUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updateUser(id, data): Observable<any> {
	const url = `${usersUrl}/${id}`;
	return this.http.put(url, data, httpOptions)
	 .pipe(
		catchError(this.handleError)
	 );
}


deleteUser(id: string): Observable<{}> {
  const url = `${usersUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

postLogin(data): Observable<any> {
  return this.http.post(loginUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

}
