import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './services/user/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean {
    try {
      const session = this.sessionService.getSession();
      console.log('seção', session);
      if (session && session.token) {
       return true; // usuário autenticado
      } else {
        this.router.navigate(['/login']); // redireciona para a página de login
        return false;
      }
    } catch (e) {
      console.error(e); // loga o erro para depuração
      this.router.navigate(['/login']); // redireciona para a página de login
      return false;
    }

   
  }
}
