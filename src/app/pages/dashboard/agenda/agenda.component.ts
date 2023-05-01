import { Component, OnInit } from '@angular/core';
import { SessionModel, UserModel } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';
import { Router } from '@angular/router';
import { UpdateAppointmentsService } from 'src/app/services/scheduling/update-appointments.service';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentModalComponent } from 'src/app/components/appointment-modal/appointment-modal.component';

@Component({
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  session: SessionModel;
  appointments: any[] = [];

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private updateAppointmentsService: UpdateAppointmentsService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.session = sessionService.getSession();
  }

  ngOnInit() {
    this.updateAppointmentsService
      .getAppointments(this.session.token)
      .subscribe(
        (response) => {
          this.appointments = response.data.map(
            (appointment: any): AppointmentModel => {
              return {
                id: appointment.id,
                title: appointment.title,
                description: appointment.description,
                date: appointment.date,
                duration: Number(appointment.duration),
                location: appointment.location,
                invite: appointment.user_id,
              };
            }
          );
          console.log('appointments', this.appointments, response);

          this.userService
            .findUserNameById(this.appointments[0].invite, this.session.token)
            .subscribe(
              (userName) => {
                console.log('User name:', userName);
              },
              (error) => {
                console.error('Erro ao obter o nome do usuário:', error);
              }
            );
        },
        (error) => {
          console.error('Erro ao obter compromissos:', error);
        }
      );
  }

  parseDate(dateStr: string): Date {
    const [datePart, timePart] = dateStr.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute);
  }

  parseEndTime(dateStr: string, duration: number): Date {
    const startTime = this.parseDate(dateStr);
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    return endTime;
  }

  newAppointment() {
    const modalRef = this.modalService.open(AppointmentModalComponent);
  }
}
