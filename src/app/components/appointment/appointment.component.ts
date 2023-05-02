import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CreateAppointmentsService } from 'src/app/services/scheduling/create-appointments.service';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { NgForm } from '@angular/forms';
import { EventInput, EventApi } from '@fullcalendar/core';
import { createEventId } from '../calendar/event-utils';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  @Input() showDialogFlag = false;
  @Output() showDialogRequested = new EventEmitter<Date>();

  // ... restante do código
  private callback?: (newEvent: EventInput) => void;

  appointment: AppointmentModel = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    duration: 0,
    location: '',
    invite: '',
  };

  //showDialogFlag = false;

  @Output() appointmentCreated = new EventEmitter<EventInput>();

  constructor(private createAppointmentsService: CreateAppointmentsService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    // if (form.valid) {
    //   this.createAppointmentsService
    //     .createAppointment(this.appointment)
    //     .subscribe(
    //       (res) => {
    //         console.log(res);
    //         const newEvent: EventInput = {
    //           id: createEventId(),
    //           title: this.appointment.title,
    //           start: this.appointment.duration,
    //           end: this.appointment.duration,
    //           description: this.appointment.description,
    //           backgroundColor: '#b3b3b3',
    //         };
    //         this.appointmentCreated.emit(newEvent);
    //         this.showDialogFlag = false;
    //       },
    //       (err) => console.error(err)
    //     );
    // }
  }

  showDialog(startDate: Date): void {
    this.appointment.date = startDate;
    this.showDialogRequested.emit(startDate);
  }

  saveAppointment(): void {
    // ...
    // Quando o compromisso for criado com sucesso
    if (this.callback) {
      const newEvent: EventInput = {
        // id: this.appointment.id.toString(),
        title: this.appointment.title,
        start: this.appointment.date,
        allDay: true,
      };
      this.callback(newEvent);
    }
    // ...
  }
}
