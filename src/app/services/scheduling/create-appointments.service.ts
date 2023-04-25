import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateAppointmentsService {
  constructor(private http: HttpClient) {}

  createAppointment(appointment: AppointmentModel) {
    //return this.http.post('http://localhost:3000/appointments', appointment);

    // Simula uma resposta de sucesso
    const response = {
      status: 'success',
      message: 'Appointment created successfully.',
      data: appointment,
    };

    // Retorna um Observable com a resposta simulada
    return of(response);
  }
}
