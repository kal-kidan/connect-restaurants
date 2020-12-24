import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VistorService {

  constructor(private http: HttpClient) { }
  getGEOLocation(latitude, longitude) {
    let GOOGLE_MAP_KEY = "AIzaSyBS2f3nJUz8S45ykYEeFb2a0dOBUPc2lDI";
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_KEY}`; 
    return this.http
    .get(url)
    .pipe(
      catchError(this.handleError)
    );
  }
   
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    
    // if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error.message);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //     `body was: ${error.error}`);
    // }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
