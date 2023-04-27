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
    console.log('inico', this.session);
    if (this.session.token !== '') {
      console.log('primeiro', this.session);
      return this.session;
    } else {
      const session = this.getSessionFromSessionStorage();
      if (session != null) {
        this.session = session;
        console.log('segundo', this.session);
        return this.session;
      } else {
        throw new Error('Session not found');
      }
    }
  }

  getSessionFromSessionStorage(): SessionModel | null {
    const sessionStr = sessionStorage.getItem('session');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      return session;
    } else {
      const sessionStr = this.getSessionFromLocalStorage();
      if (sessionStr) {
        const session = sessionStr;
        return session;
      }
    }
    return null;
  }

  setSession(session: SessionModel): void {
    this.session = session;
    this.setSessionInSessionStorage(session);
  }

  setSessionInSessionStorage(session: SessionModel): void {
    sessionStorage.setItem('session', JSON.stringify(session));
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
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
