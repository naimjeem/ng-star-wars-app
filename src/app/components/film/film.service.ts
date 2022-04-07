import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { FilmList, Film } from './film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  TAG = 'Star Wars (Film) : ';
  endpoint = environment.config.api.films;

  constructor(private _http: HttpClient) { }

  /**
   * Add page value url param
   */
  getFilmByPage(pageQ: string): Observable<FilmList> {
    return this._http.get<FilmList>(`${this.endpoint}${pageQ}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Search film by name
   */
  getFilmBySearch(search: string): Observable<FilmList> {
    return this._http.get<FilmList>(`${this.endpoint}?format=json&search=${search}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  getFilm(): Observable<FilmList> {
    return this._http.get<FilmList>(`${this.endpoint}?format=json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Return film by id
   */
  getFilmById(id: string): Observable<Film> {
    return this._http.get<Film>(`${this.endpoint}${id}?format=json`)
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
