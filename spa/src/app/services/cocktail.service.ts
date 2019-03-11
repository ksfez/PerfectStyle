import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import Cocktail from '../models/cocktail';

import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const cocktailsUrl = "/cocktails";

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

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

 getCocktails(): Observable<Cocktail[]> {
    return this.http.get('/cocktails/list')
      .map(res  => {
		  console.log(res);
        return res as Cocktail[];
      })
  }

getCocktail(id: string): Observable<any> {
  const url = `${cocktailsUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postCocktail(data, httpOptions): Observable<any> {
   return this.http.post('/cocktails', data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

updateCocktail(id, data, httpOptions): Observable<any> {
	const url = `${cocktailsUrl}/${id}`;
	return this.http.put(url, data, httpOptions)
	 .pipe(
		catchError(this.handleError)
	 );
}


deleteCocktail(id: string, httpOptions): Observable<{}> {
  const url = `${cocktailsUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}



}
