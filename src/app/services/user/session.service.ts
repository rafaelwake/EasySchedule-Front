import { Injectable } from '@angular/core';
import { SessionModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  session: SessionModel = {
    id: '',
    user: { name: '', email: '' },
    token: '',
    createdAt: new Date(),
  };

  constructor() {}

  getSession(): SessionModel {
    return this.session;
  }

  setSession(session: SessionModel): void {
    this.session = session;
  }
}
