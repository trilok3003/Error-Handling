import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public http: HttpClient) {}

  getJokes(): Observable<any> {
    return this.http.get('').pipe(retry(3), catchError(this.handleError));
  }

  extractJokes() {
    this.getJokes().subscribe((res) => {
      console.log(res);
    });
  }

  handleError(err) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // if error is client-side error
      errorMessage = `Error: ${err.message}`;
    } else {
      // if error is server-side error
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }
}
