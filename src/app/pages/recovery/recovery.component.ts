import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormValidationService } from '../../services/form-validation/form-validation.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css'],
})
export class RecoveryComponent {
  email: string;
  showError: boolean;
  error: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private formValidationService: FormValidationService
  ) {
    this.email = '';
    this.showError = false;
    this.error = '';
  }

  sendRecoveryEmail() {
    const emailError = this.formValidationService.validateEmail(this.email);

    if (emailError) {
      this.showError = true;
      this.error = emailError;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
      return;
    }

    this.userService.recovery({ email: this.email }).subscribe(
      (res) => {
        console.log('E-mail de recuperação enviado com sucesso', res);
        // Trate aqui o sucesso do envio do e-mail de recuperação.
      },
      (err) => {
        console.error('Error', err);
        this.showError = true;
        this.error = 'E-mail não está cadastrado em nosso banco de dados';
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
