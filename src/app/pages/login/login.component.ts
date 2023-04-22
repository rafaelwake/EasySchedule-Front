import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public isPasswordVisible = false;

  constructor() {}

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
}
