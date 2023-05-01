import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { environment } from 'src/app/config';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(user: UserModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const options = { headers: headers };
    return this.http.post(`${this.baseUrl}/user/register`, user, options);
  }

  login(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };
    return this.http.post(`${this.baseUrl}/auth`, user, options);
  }

  recovery(email: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const options = { headers: headers };
    return this.http.post(`${this.baseUrl}/recovery`, email, options);
  }

  getAllUsers(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const options = { headers: headers };
    return this.http.get(`${this.baseUrl}/user/`, options).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao obter usuários:', error);
        return throwError(error);
      })
    );
  }
}
