import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public isPasswordVisible = false;
  public error = '';
  showError: boolean = false;
  public email: string = '';
  public password: string = '';
  public passwordConfirmation: string = '';
  public name: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private formValidationService: FormValidationService
  ) {}

  togglePasswordVisibility(passwordFieldId: string, buttonClicked: Event) {
    const passwordField = document.getElementById(
      passwordFieldId
    ) as HTMLInputElement;
    if (passwordField !== null) {
      passwordField.type =
        passwordField.type === 'password' ? 'text' : 'password';
      const showPasswordIcon = buttonClicked.target as HTMLElement;
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
    const nameError = this.formValidationService.validateName(this.name);
    const passwordValidationError =
      this.formValidationService.validatePasswordConfirmation(
        this.password,
        this.passwordConfirmation
      );

    if (nameError) {
      this.showError = true;
      this.error = nameError;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
      return;
    }

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

    if (passwordValidationError) {
      this.showError = true;
      this.error = passwordValidationError;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
      return;
    }

    const isAccepted = (
      document.getElementById('form1Example3') as HTMLInputElement
    ).checked;

    if (!isAccepted) {
      this.showError = true;
      this.error = 'Você precisa aceitar os termos de uso e privacidade';
      setTimeout(() => {
        this.showError = false;
      }, 2000);
      return;
    }

    console.log(this.email, this.password, this.name);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToRecovery() {
    this.router.navigate(['/recovery']);
  }
}
