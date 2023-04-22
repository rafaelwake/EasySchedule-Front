import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  login(): void {
    const user = {
      email: this.email,
      password: this.password,
    };
    console.log('user body', user);
    if (this.loginInfoValid()) {
      this.userService.login(user).subscribe(
        (response) => {
          console.log(response);
          // redirecionar para a página de dashboard após o login
        },
        (error) => {
          console.log(error);
          // mostrar uma mensagem de erro para o usuário
        }
      );
    }
  }

  loginInfoValid(): boolean {
    if (!this.email || !this.password) {
      console.log('Email e senha são obrigatórios.');
      return false;
    }

    // Validar formato do email usando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(this.email)) {
      console.log('Email inválido.');
      return false;
    }
    return true;
  }
}
