import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAppointmentsService } from 'src/app/services/scheduling/create-appointments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css'],
})
export class AppointmentModalComponent implements OnInit {
  @Input() appointment!: AppointmentModel;
  @Output() saveAppointment = new EventEmitter<AppointmentModel>();
  form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private createAppointmentsService: CreateAppointmentsService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.appointment.title, Validators.required],
      description: [this.appointment.description, Validators.required],
      date: [this.appointment.date, Validators.required],
      duration: [
        this.appointment.duration,
        [Validators.required, Validators.min(1)],
      ],
      location: [this.appointment.location, Validators.required],
      invite: [this.appointment.invite, [Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.appointment.title = this.form.get('title')?.value;
      this.appointment.description = this.form.get('description')?.value;
      this.appointment.date = this.form.get('date')?.value;
      this.appointment.duration = this.form.get('duration')?.value;
      this.appointment.location = this.form.get('location')?.value;
      this.appointment.invite = this.form
        .get('invite')
        ?.value.split(';')
        .map((email: string) => email.trim());

      console.log('objeto final', this.appointment);

      this.createAppointmentsService
        .createAppointment(this.appointment)
        .subscribe(
          (res) => {
            console.log(res);
            this.saveAppointment.emit(this.appointment);
            this.activeModal.close();
          },
          (err) => console.error(err)
        );
    }
  }
}
