import { Component } from '@angular/core';
import { SessionModel } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  dropdownHidden = true;
  session: SessionModel;

  constructor(private sessionService: SessionService) {
    this.session = sessionService.getSession();
    console.log(this.session);
  }

  showDropdown() {
    this.dropdownHidden = !this.dropdownHidden;
  }
}
