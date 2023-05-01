import { Component, ChangeDetectorRef } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { ViewChild } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Calendar } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  @ViewChild('sidenav') sidenav!: NgbCollapse;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    locale: 'pt-br',
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,next',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this),
    dayCellClassNames:
      'border border-red-300 bg-white/30 text-center font-semibold text-indigo-900 text-center',
    dayHeaderClassNames:
      ' border-b border-indigo-500 text-indigo-500 text-semibold text-sm border-none',
    viewClassNames: 'backdrop-blur-lg bg-indigo-50',
    allDayClassNames: 'bg-red-300',
  };
  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection

    // const appointment: AppointmentModel = {
    //   id: 0,
    //   title: '',
    //   description: '',
    //   date: new Date(selectInfo.startStr),
    //   duration: 0,
    //   location: '',
    //   invite: '',
    // };

    const modalRef = this.modalService.open(AppointmentModalComponent);
    // modalRef.componentInstance.appointment = appointment;

    // modalRef.componentInstance.saveAppointment.subscribe(
    //   (newAppointment: AppointmentModel) => {
    //     calendarApi.addEvent({
    //       id: createEventId(),
    //       title: newAppointment.title,
    //       start: newAppointment.date,
    //       end: selectInfo.endStr,
    //       allDay: selectInfo.allDay,
    //       description: newAppointment.description, // Add the description property to the event
    //     });
    //   }
    // );
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  toggleSidebar() {
    this.sidenav.toggle();
  }

  createNewAppointment() {
    // Adicione a lógica para criar um novo compromisso aqui
  }

  logout() {
    // Adicione a lógica para sair aqui
  }
}
