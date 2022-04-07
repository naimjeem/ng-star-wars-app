import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleList, Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  TAG = 'Star Wars (Vehicle) : ';
  endpoint = environment.config.api.vehicles;

  constructor(private _http: HttpClient) { }

  /**
   * Add page value url param
   */
  getVehicleByPage(pageQ: string): Observable<VehicleList> {
    return this._http.get<VehicleList>(`${this.endpoint}${pageQ}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Search vehicle by name
   */
  getVehicleBySearch(search: string): Observable<VehicleList> {
    return this._http.get<VehicleList>(`${this.endpoint}?format=json&search=${search}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  getVehicle(): Observable<VehicleList> {
    return this._http.get<VehicleList>(`${this.endpoint}?format=json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Return vehicle by id
   */
  getVehicleById(id: string): Observable<Vehicle> {
    return this._http.get<Vehicle>(`${this.endpoint}${id}?format=json`)
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
