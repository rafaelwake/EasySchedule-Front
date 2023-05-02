import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteAppointmentService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  deleteAppointment(id: number, token: string): Observable<any> {
    const url = `${this.baseUrl}/appointment/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(url, { headers });
  }
}
