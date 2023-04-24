import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SessionModel } from 'src/app/models/user.model';

interface MyActivatedRouteSnapshot extends ActivatedRouteSnapshot {
  session?: SessionModel;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  session: SessionModel = {
    id: '',
    user: { name: '', email: '' },
    token: '',
    createdAt: new Date(),
  };

  constructor() {}

  ngOnInit(): void {
    const routeSnapshot: MyActivatedRouteSnapshot = window.history.state;
    if (routeSnapshot.session) {
      this.session = routeSnapshot.session;
    }
    console.log('object:', this.session);
  }
}
