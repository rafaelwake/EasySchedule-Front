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
      // Adicione outros campos conforme necessário
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.appointment.title = this.form.get('title')?.value;
      this.appointment.description = this.form.get('description')?.value;
      // Atualize outros campos conforme necessário

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
