import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { environment } from 'src/app/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateAppointmentsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createAppointment(
    appointment: AppointmentModel,
    token: string
  ): Observable<any> {
    const url = `${this.baseUrl}/appointment`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(url, appointment, { headers });
  }
}
