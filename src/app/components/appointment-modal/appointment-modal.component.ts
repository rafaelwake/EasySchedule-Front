import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAppointmentsService } from 'src/app/services/scheduling/create-appointments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import { SessionModel } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';
import { DatePipe } from '@angular/common';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApplicationRef } from '@angular/core';
import { AppointmentEventService } from 'src/app/services/scheduling/appointment-event.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css'],
})
export class AppointmentModalComponent implements OnInit {
  @Input() appointment!: AppointmentModel;
  @Output() saveAppointment = new EventEmitter<AppointmentModel>();
  form!: FormGroup;
  session: SessionModel;
  showError: boolean = false;
  successMessage: string;
  public error = '';

  constructor(
    private sessionService: SessionService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private createAppointmentsService: CreateAppointmentsService,
    private datePipe: DatePipe,
    private appRef: ApplicationRef,
    private router: Router,
    private appointmentEventService: AppointmentEventService
  ) {
    this.session = sessionService.getSession();
    this.successMessage = '';
  }

  ngOnInit(): void {
    this.appointment = this.appointment || {
      id: 0,
      title: '',
      description: '',
      date: new Date(),
      duration: 0,
      location: '',
      invite: '',
    };
    this.form = this.formBuilder.group({
      title: [this.appointment.title, Validators.required],
      description: [this.appointment.description, Validators.required],
      date: [this.appointment.date, Validators.required],
      duration: [
        this.appointment.duration,
        [Validators.required, Validators.min(0)],
      ],
      location: [this.appointment.location, Validators.required],
    });
  }

  onSubmit() {
    console.log('tes', this.form.valid);
    console.log(this.form.controls);

    if (this.form.valid) {
      console.log('tes', this.form.valid);
      console.log(this.form.controls);

      if (this.form.valid) {
        let dateValue = this.form.get('date')?.value.replace('T', ' ');
        dateValue += ':00';

        const durationValue = this.form.get('duration')?.value;
        const [hours, minutes] = durationValue.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;

        const newAppointment: AppointmentModel = {
          title: this.form.get('title')?.value,
          description: this.form.get('description')?.value,
          date: dateValue,
          duration: totalMinutes, // Utiliza o valor em minutos
          location: this.form.get('location')?.value,
        };

        console.log('objeto final', newAppointment);

        this.createAppointmentsService
          .createAppointment(newAppointment, this.session.token)
          .subscribe(
            (res) => {
              console.log(res);
              this.successMessage = 'Compromisso criado com sucesso!';
              setTimeout(() => {
                this.activeModal.close();
                this.appointmentEventService.onAppointmentCreated.emit();
              }, 1000);
            },
            (err) => {
              console.error(err);
              this.showError = true;
              this.error = err;
              setTimeout(() => {
                this.showError = false;
              }, 3000);
              return;
            }
          );
      }
    } else {
      this.showError = true;
      this.error = 'Preencha todos os campos em "*"';
      setTimeout(() => {
        this.showError = false;
      }, 3000);
      return;
    }
  }
}
