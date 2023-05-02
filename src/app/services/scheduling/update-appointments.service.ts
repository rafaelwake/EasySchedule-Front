import { Injectable } from '@angular/core';
import { environment } from 'src/app/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentModel } from 'src/app/models/appointment.model';

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

  updateAppointment(
    appointment: AppointmentModel,
    token: string
  ): Observable<any> {
    const url = `${this.baseUrl}/appointment/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(url, appointment, { headers });
  }
}
