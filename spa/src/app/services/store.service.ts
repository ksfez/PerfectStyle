import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import Store from '../models/store';

import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const storesUrl = "/stores";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

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

 getStores(): Observable<Store[]> {
	 console.log("hello");
    return this.http.get('/stores/list')
      .map(res  => {
		  console.log(res);
        return res as Store[];
      })
  }

getStore(id: string): Observable<any> {
  const url = `${storesUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postStore(data, httpOptions): Observable<any> {
   return this.http.post('/stores', data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

updateStore(id, data, httpOptions): Observable<any> {
	const url = `${storesUrl}/${id}`;
	return this.http.put(url, data, httpOptions)
	 .pipe(
		catchError(this.handleError)
	 );
}


deleteStore(id: string, httpOptions): Observable<{}> {
  const url = `${storesUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}



}
