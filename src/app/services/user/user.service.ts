import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api'; // URL base da API REST

  constructor(private http: HttpClient) {}

  createUser(user: any) {
    return this.http.post(`${this.baseUrl}/usuarios`, user);
  }

  login(user: any) {
    console.log('data to login', user);

    // return this.http.post(`${this.baseUrl}/login`, user);
  }
}
