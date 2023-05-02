import { Component, OnInit, Output } from '@angular/core';
import { SessionModel, UserModel } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';
import { Router } from '@angular/router';
import { UpdateAppointmentsService } from 'src/app/services/scheduling/update-appointments.service';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { UserService } from 'src/app/services/user/user.service';
import { AppointmentModalComponent } from 'src/app/components/appointment-modal/appointment-modal.component';
import { forkJoin } from 'rxjs';
import { DeleteAppointmentService } from 'src/app/services/scheduling/delete-appointment.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './ngbd-modal-content';
import { EventInput } from '@fullcalendar/core';
import { AppointmentEventService } from 'src/app/services/scheduling/appointment-event.service';

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

@Component({
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  session: SessionModel;
  appointments: any[] = [];
  modalRef!: NgbModalRef;
  @Output() eventArray: EventInput[] = [];

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private updateAppointmentsService: UpdateAppointmentsService,
    private userService: UserService,
    private modalService: NgbModal,
    private deleteAppointmentService: DeleteAppointmentService,
    private appointmentEventService: AppointmentEventService
  ) {
    this.session = sessionService.getSession();
  }

  ngOnInit() {
    this.loadAppointments();
    this.appointmentEventService.onAppointmentCreated.subscribe(() => {
      this.loadAppointments();
    });
  }
  loadAppointments() {
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
              this.eventArray = this.convertAppointmentsToEvents(
                this.appointments
              );
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
    this.modalService.open(AppointmentModalComponent);
  }

  openModal(id: number) {
    this.modalRef = this.modalService.open(NgbdModalContent);
    this.modalRef.componentInstance.confirmationText =
      'Tem certeza que deseja excluir o compromisso?';
    this.modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.deleteAppointment(id);
      }
    });
  }

  deleteAppointment(id: number) {
    this.deleteAppointmentService
      .deleteAppointment(id, this.session.token)
      .subscribe(
        (response) => {
          // Atualiza a lista de compromissos após a exclusão
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
                    console.error(
                      'Erro ao obter os nomes dos usuários:',
                      error
                    );
                  }
                );
              },
              (error) => {
                console.error('Erro ao obter compromissos:', error);
              }
            );
        },
        (error) => {
          console.error('Erro ao efetuar a exclusão:', error);
        }
      );
  }

  convertAppointmentsToEvents(appointments: AppointmentModel[]): EventInput[] {
    console.error('teste', appointments);

    return appointments.map((appointment) => ({
      id: appointment.id?.toString() || '',
      title: appointment.title,
      start: appointment.date,
      end: appointment.date,
      description: appointment.description,
    }));
  }
}
