import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public isPasswordVisible = false;
  public error = '';
  showError: boolean = false;
  public email: string = '';
  public password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private formValidationService: FormValidationService
  ) {}

  togglePasswordVisibility() {
    const passwordField = document.getElementById(
      'password'
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

  onSubmit() {
    const emailError = this.formValidationService.validateEmail(this.email);
    const passwordError = this.formValidationService.validatePassword(
      this.password
    );

    if (emailError) {
      this.showError = true;
      this.error = emailError;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
      return;
    }

    if (passwordError) {
      this.showError = true;
      this.error = passwordError;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
      return;
    }

    console.log(this.email, this.password);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
  redirectToRecovery() {
    this.router.navigate(['/recovery']);
  }
}
