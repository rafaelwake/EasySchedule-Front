import { Injectable } from '@angular/core';
import { environment } from 'src/app/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateAppointmentsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAppointments(token: string): Observable<any> {
    const url = `${this.baseUrl}/appointment`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers });
  }
}
