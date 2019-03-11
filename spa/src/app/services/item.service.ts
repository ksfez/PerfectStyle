import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import Item from '../models/item';

import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const itemsUrl = "/items";
const itemsListUrl = "/items/list";
@Injectable({
  providedIn: 'root'
})
export class ItemService {

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

 getItems(): Observable<Item[]> {
	 console.log("hello");
    return this.http.get('/items/list')
      .map(res  => {
		  console.log(res);
        return res as Item[];
      })
  }

getItemsForUser(id: string): Observable<Item[]> {
    return this.http.get(`${itemsListUrl}/${id}`)
      .map(res  => {
		  console.log(res);
        return res as Item[];
      })
  }
  
  
getItem(id: string): Observable<any> {
  const url = `${itemsUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postItem(data, httpOptions): Observable<any> {
	console.log("enter in item post service");
   return this.http.post('/items', data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

updateItem(id, data, httpOptions): Observable<any> {
	const url = `${itemsUrl}/${id}`;
	return this.http.put(url, data, httpOptions)
	 .pipe(
		catchError(this.handleError)
	 );
}


deleteItem(id: string, httpOptions): Observable<{}> {
  const url = `${itemsUrl}/${id}`;
  console.log("enter in service delete");
  
  console.log("id "+id );
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}


deleteAllItem(id: string, httpOptions): Observable<{}> {
  const url = 'items/deleteAllItems/${id}';
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

}
