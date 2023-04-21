import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api'; // URL base from API REST

  constructor(private http: HttpClient) {}

  createUser(user: any) {
    return this.http.post(`${this.baseUrl}/usuarios`, user);
  }

  login(user: any) {
    return this.http.post(`${this.baseUrl}/login`, user);
  }
}
