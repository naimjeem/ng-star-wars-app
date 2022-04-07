import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanetList, Planet } from './planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  TAG = 'Star Wars (Planet) : ';
  endpoint = environment.config.api.planets;

  constructor(private _http: HttpClient) { }

  /**
   * Add page value url param
   */
  getPlanetByPage(pageQ: string): Observable<PlanetList> {
    return this._http.get<PlanetList>(`${this.endpoint}${pageQ}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Search planet by name
   */
  getPlanetBySearch(search: string): Observable<PlanetList> {
    return this._http.get<PlanetList>(`${this.endpoint}?format=json&search=${search}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  getPlanet(): Observable<PlanetList> {
    return this._http.get<PlanetList>(`${this.endpoint}?format=json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Return planet by id
   */
  getPlanetById(id: string): Observable<Planet> {
    return this._http.get<Planet>(`${this.endpoint}${id}?format=json`)
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
