import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../Interfaces/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _httpClient: HttpClient;
  private _url: string = 'https://localhost:7059/api/Employee';

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(this._url).pipe(
      catchError(this.handleError)
    );
  }

  public getEmployee(id: number): Observable<Employee> {
    return this._httpClient.get<Employee>(`${this._url}/${id}`).pipe(
      catchError(this.handleError)

    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(
        `Código de estado ${error.status}, ` +
        `mensaje de error: ${error.error}`);
    }
    // Retornar un observable con el error
    return throwError(error);
  }
}
