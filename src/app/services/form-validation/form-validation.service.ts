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

  validatePassword(password: any): string | null {
    if (!password) {
      return 'Senha é obrigatória';
    }

    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Senha deve ter pelo menos 8 caracteres';
    }

    return null;
  }

  validateName(name: string): string | null {
    if (!name) {
      return 'Nome é obrigatório';
    }

    return null;
  }

  validatePasswordConfirmation(
    password: any,
    passwordConfirmation: string
  ): string | null {
    if (!passwordConfirmation) {
      return 'Confirmação de senha é obrigatória';
    }

    if (password !== passwordConfirmation) {
      return 'As senhas não coincidem';
    }

    return null;
  }
}
