import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api'; // URL base da API REST

  constructor(private http: HttpClient) {}

  createUser(user: UserModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const options = { headers: headers };
    console.log(user, options);
    return this.http.post(`${this.baseUrl}/user/register`, user);
  }

  login(user: any) {
    console.log('data to login', user);

    // return this.http.post(`${this.baseUrl}/login`, user);
  }
}
