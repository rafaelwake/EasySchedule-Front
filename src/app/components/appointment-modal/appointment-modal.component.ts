import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAppointmentsService } from 'src/app/services/scheduling/create-appointments.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css'],
})
export class AppointmentModalComponent implements OnInit {
  @Input() appointment!: AppointmentModel;
  @Output() saveAppointment = new EventEmitter<AppointmentModel>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  save() {
    this.saveAppointment.emit(this.appointment);
    this.activeModal.close();
  }

  // onSubmit() {
  //   if (form.valid) {
  //     this.createAppointmentsService
  //       .createAppointment(this.appointment)
  //       .subscribe(
  //         (res) => {
  //           console.log(res);
  //         },
  //         (err) => console.error(err)
  //       );
  //   }
}
