import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';


@Injectable()


export class FileService {

    constructor(private _http:HttpClient){}

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

downloadFile(file:String){
	console.log('enter in download service');
        var body = {filename:file};
	console.log('body ' +body.filename);
        return this._http.post('/file/download',body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }

 /*   getFileUrl(file):Observable<any>{
        return this._http.put('/file/getFileUrl', file)
		.pipe( catchError(this.handleError)
    );
    }*/
}