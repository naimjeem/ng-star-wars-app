import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpeciesList, Species } from './species';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  TAG = 'Star Wars (Species) : ';
  endpoint = environment.config.api.species;

  constructor(private _http: HttpClient) { }

  /**
   * Add page value url param
   */
  getSpeciesByPage(pageQ: string): Observable<SpeciesList> {
    return this._http.get<SpeciesList>(`${this.endpoint}${pageQ}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Search species by name
   */
  getSpeciesBySearch(search: string): Observable<SpeciesList> {
    return this._http.get<SpeciesList>(`${this.endpoint}?format=json&search=${search}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  getSpecies(): Observable<SpeciesList> {
    return this._http.get<SpeciesList>(`${this.endpoint}?format=json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Return species by id
   */
  getSpeciesById(id: string): Observable<Species> {
    return this._http.get<Species>(`${this.endpoint}${id}?format=json`)
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
