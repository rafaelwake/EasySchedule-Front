import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppointmentEventService {
  onAppointmentCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
}
