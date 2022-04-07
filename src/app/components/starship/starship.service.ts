import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StarshipList, Starship } from './starship';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  TAG = 'Star Wars (Starship) : ';
  endpoint = environment.config.api.starships;

  constructor(private _http: HttpClient) { }

  /**
   * Add page value url param
   */
  getStarshipByPage(pageQ: string): Observable<StarshipList> {
    return this._http.get<StarshipList>(`${this.endpoint}${pageQ}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Search starship by name
   */
  getStarshipBySearch(search: string): Observable<StarshipList> {
    return this._http.get<StarshipList>(`${this.endpoint}?format=json&search=${search}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  getStarship(): Observable<StarshipList> {
    return this._http.get<StarshipList>(`${this.endpoint}?format=json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Return starship by id
   */
  getStarshipById(id: string): Observable<Starship> {
    return this._http.get<Starship>(`${this.endpoint}${id}?format=json`)
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
