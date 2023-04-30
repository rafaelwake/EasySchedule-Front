import { Component } from '@angular/core';
import { SessionModel } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  dropdownHidden = true;
  session: SessionModel;
  currentPage = '';
  pages = [
    {
      text: 'Minha Agenda',
      route: 'agenda',
      path: '/dashboard/agenda',
      icon: 'fa-solid fa-calendar-days',
    },
    {
      text: 'Membros',
      route: 'members',
      path: '/dashboard/members',
      icon: 'fa-solid fa-users',
    },
  ];

  ngOnInit() {
    this.currentPage = window.location.pathname;
  }

  constructor(private sessionService: SessionService, private router: Router) {
    this.session = sessionService.getSession();
  }

  showDropdown() {
    this.dropdownHidden = !this.dropdownHidden;
  }

  navigateTo(route: string) {
    this.currentPage = `/dashboard/${route}`;
    console.log(this.currentPage);
    this.router.navigate(['/dashboard', route]);
  }

  logout() {
    this.sessionService.logout();
  }
}
