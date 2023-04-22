import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  validateEmail(email: string): string | null {
    if (!email) {
      return 'Endereço de e-mail é obrigatório';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Endereço de e-mail inválido';
    }

    return null;
  }

  validatePassword(password: string): string | null {
    if (!password) {
      return 'Senha é obrigatória';
    }

    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Senha deve ter pelo menos 8 caracteres';
    }

    return null;
  }
}
