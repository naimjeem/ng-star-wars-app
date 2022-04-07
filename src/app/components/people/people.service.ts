import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Planet } from 'src/app/star-wars/star-wars.interface';
import { environment } from 'src/environments/environment';
import { People, PeopleList } from './people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  TAG = 'Star Wars (People) : ';
  endpoint = environment.config.api.people;

  constructor(private _http: HttpClient) { }

  /**
   * Add page value url param
   */
  getPeopleByPage(pageQ: string): Observable<PeopleList> {
    return this._http.get<PeopleList>(`${this.endpoint}${pageQ}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Search people by name
   */
  getPeopleBySearch(search: string): Observable<PeopleList> {
    return this._http.get<PeopleList>(`${this.endpoint}?format=json&search=${search}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  getPeople(): Observable<PeopleList> {
    return this._http.get<PeopleList>(`${this.endpoint}?format=json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Return people by id
   */
  getPeopleById(id: string): Observable<People> {
    return this._http.get<People>(`${this.endpoint}${id}?format=json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPlanetById(url: string): Observable<Planet> {
    return this._http.get<Planet>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Search people by name
   */
  searchPeople(name: string): Observable<People[]> {
    return this._http.get<People[]>(`${this.endpoint}?search=${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP Errors
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`${this.TAG} An error occurred:`, error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `${this.TAG} Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      `${this.TAG} Something bad happened; please try again later.`);
  }

}
