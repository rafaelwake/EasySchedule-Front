import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public isPasswordVisible = false;
  public error = '';

  constructor(private userService: UserService) {}

  togglePasswordVisibility() {
    const passwordField = document.getElementById(
      'form1Example23'
    ) as HTMLInputElement;
    if (passwordField !== null) {
      passwordField.type =
        passwordField.type === 'password' ? 'text' : 'password';
      const showPasswordIcon = document.getElementById('show-password-icon');
      if (showPasswordIcon !== null) {
        showPasswordIcon.classList.toggle('fa-eye-slash');
      }
    }
  }

  onSubmit(email: string, password: string) {
    const user = { email, password };
    this.userService.login(user).subscribe(
      (data) => {
        console.log('data to login', data);
        // Aqui você pode redirecionar o usuário para a página de dashboard ou fazer qualquer outra coisa que desejar
      },
      (error) => {
        console.log(error);
        this.error = error.error.message;
      }
    );
  }
}
