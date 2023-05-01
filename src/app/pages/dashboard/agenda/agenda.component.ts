import { Component, OnInit } from '@angular/core';
import { SessionModel, UserModel } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';
import { Router } from '@angular/router';
import { UpdateAppointmentsService } from 'src/app/services/scheduling/update-appointments.service';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentModalComponent } from 'src/app/components/appointment-modal/appointment-modal.component';
import { forkJoin } from 'rxjs';

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
          const appointmentData = response.data;
          const userRequests = appointmentData.map((appointment: any) =>
            this.userService.findUserNameById(
              appointment.user_id,
              this.session.token
            )
          );

          forkJoin<string[]>(userRequests).subscribe(
            (userNames: string[]) => {
              this.appointments = appointmentData.map(
                (appointment: any, index: number): AppointmentModel => {
                  return {
                    id: appointment.id,
                    title: appointment.title,
                    description: appointment.description,
                    date: appointment.date,
                    duration: Number(appointment.duration),
                    location: appointment.location,
                    invite: userNames[index],
                  };
                }
              );
              console.log('appointments', this.appointments, response);
            },
            (error) => {
              console.error('Erro ao obter os nomes dos usuários:', error);
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
