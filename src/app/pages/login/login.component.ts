import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';
import { UserModel } from 'src/app/models/user.model';
import { SessionModel } from 'src/app/models/user.model';

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
  public rememberMe: boolean = false;

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

    const user = {
      email: this.email,
      password: this.password,
    };

    this.userService.login(user).subscribe(
      (response: any) => {
        if (response.success) {
          const session: SessionModel = {
            token: response.data.token,
            id: response.data.user.id,
            createdAt: response.data.user.createdAt,
            user: {
              email: response.data.user.email,
              name: response.data.user.name,
            },
          };
          if (this.rememberMe) {
            localStorage.setItem('session', JSON.stringify(session));
          }
          this.router.navigate(['/dashboard'], { state: { session } });
        } else {
          this.showError = true;
          this.error = response.message;
          setTimeout(() => {
            this.showError = false;
          }, 2000);
        }
      },
      (error) => {
        console.log(error);
        this.showError = true;
        this.error = 'Invalid email or password';
        setTimeout(() => {
          this.showError = false;
        }, 2000);
      }
    );
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  redirectToRecovery() {
    this.router.navigate(['/recovery']);
  }

  onChangeRememberMe(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.rememberMe = checkbox.checked;
  }
}
