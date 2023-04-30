import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { FooterComponent } from './components/footer/footer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentModalComponent } from './components/appointment-modal/appointment-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SchedulingComponent } from './components/scheduling/scheduling.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AgendaComponent } from './pages/dashboard/agenda/agenda.component';
import { KanbanComponent } from './pages/dashboard/kanban/kanban.component';
import { MembersComponent } from './pages/dashboard/members/members.component';
import { AccountComponent } from './pages/dashboard/account/account.component';
import { QuickGuideComponent } from './pages/dashboard/quick-guide/quick-guide.component';
import { AboutComponent } from './pages/dashboard/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { TermsModalComponent } from './components/terms-modal/terms-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RecoveryComponent,
    FooterComponent,
    CalendarComponent,
    AppointmentComponent,
    AppointmentModalComponent,
    SchedulingComponent,
    SidebarComponent,
    AgendaComponent,
    KanbanComponent,
    MembersComponent,
    AccountComponent,
    QuickGuideComponent,
    AboutComponent,
    HeaderComponent,
    TermsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
