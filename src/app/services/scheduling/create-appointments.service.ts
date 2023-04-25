import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentModel } from 'src/app/models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class CreateAppointmentsService {
  constructor(private http: HttpClient) {}

  createAppointment(appointment: AppointmentModel) {
    return this.http.post('http://localhost:3000/appointments', appointment);
  }
}
