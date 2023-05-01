import { Component, OnInit } from '@angular/core';
import { SessionModel } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';
import { Router } from '@angular/router';
import { UpdateAppointmentsService } from 'src/app/services/scheduling/update-appointments.service';

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
    private updateAppointmentsService: UpdateAppointmentsService
  ) {
    this.session = sessionService.getSession();
  }

  ngOnInit() {
    this.updateAppointmentsService
      .getAppointments(this.session.token)
      .subscribe(
        (response) => {
          this.appointments = response.data;
          console.log('appointments', this.appointments);
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
}
