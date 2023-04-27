import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './services/user/session.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectAuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean {
    try {
      const session = this.sessionService.getSession();
      if (session && session.token) {
        this.router.navigate(['/dashboard']); // redireciona para o painel (dashboard)
        return false;
      } else {
        return true; // usuário não está logado, pode acessar a rota
      }
    } catch (e) {
      return true; // usuário não está logado, pode acessar a rota
    }
  }
}
