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

  constructor(private sessionService: SessionService, private router: Router) {
    this.session = sessionService.getSession();
  }

  showDropdown() {
    this.dropdownHidden = !this.dropdownHidden;
  }

  navigateTo(route: string) {
    this.router.navigate(['/dashboard', route]);
  }

  logout() {
    this.sessionService.logout();
  }
}
