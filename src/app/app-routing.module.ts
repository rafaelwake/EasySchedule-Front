import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { AgendaComponent } from './pages/dashboard/agenda/agenda.component';
import { KanbanComponent } from './pages/dashboard/kanban/kanban.component';
import { MembersComponent } from './pages/dashboard/members/members.component';
import { QuickGuideComponent } from './pages/dashboard/quick-guide/quick-guide.component';
import { AboutComponent } from './pages/dashboard/about/about.component';
import { AuthGuard } from './auth.guard';
import { RedirectAuthGuard } from './redirect-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectAuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'recovery', component: RecoveryComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'agenda', pathMatch: 'full' },
      { path: 'agenda', component: AgendaComponent },
      { path: 'kanban', component: KanbanComponent },
      { path: 'members', component: MembersComponent },
      { path: 'quick-guide', component: QuickGuideComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
