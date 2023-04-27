import { Injectable } from '@angular/core';
import { SessionModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  getSession(): SessionModel {
    return this.session;
  }

  setSession(session: SessionModel): void {
    this.session = session;
  }

  getSessionFromLocalStorage(): SessionModel | null {
    const sessionStr = localStorage.getItem('session');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      return session;
    }
    return null;
  }

  setSessionInLocalStorage(session: SessionModel): void {
    localStorage.setItem('session', JSON.stringify(session));
  }

  logout(): void {
    this.session = {
      id: '',
      user: { name: '', email: '' },
      token: '',
      createdAt: new Date(),
    };
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
