import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { 
  Film,
  FilmList,
  People,
  PeopleList,
  Planet,
  PlanetList,
  Species,
  SpeciesList,
  Starship,
  StarshipList,
  Vehicle,
  VehicleList 
} from './star-wars.interface';


@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  TAG = 'StarWars API Service : ';

  constructor(private http: HttpClient) { }

  root(): Observable<any> {
    return this.http.get(environment.baseUrl);
  }

  list(url: string): Observable<PeopleList | PlanetList | FilmList | SpeciesList | VehicleList | StarshipList> {
    return this.http.get<PeopleList | PlanetList | FilmList | SpeciesList | VehicleList | StarshipList>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  search(url: string,
    value: any): Observable<PeopleList | PlanetList | FilmList | SpeciesList | VehicleList | StarshipList> {
    return this.http.get<PeopleList | PlanetList | FilmList | SpeciesList | VehicleList | StarshipList>(url + '?search=' + value)
      .pipe(
        catchError(this.handleError)
      );
  }

  get(url: string): Observable<People | Planet | Film | Species | Vehicle | Starship> {
    return this.http.get<People | Planet | Film | Species | Vehicle | Starship>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

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
