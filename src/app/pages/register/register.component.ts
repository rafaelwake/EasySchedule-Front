import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';
import { UserModel } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TermsModalComponent } from 'src/app/components/terms-modal/terms-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public isPasswordVisible = false;
  public error = '';
  showError: boolean = false;
  public passwordConfirmation: string = '';
  public user: UserModel = {
    name: '',
    email: '',
    password: '',
  };
  successMessage: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private formValidationService: FormValidationService,
    private modalService: NgbModal
  ) {
    this.successMessage = '';
  }

  openTermsModal() {
    const modalRef = this.modalService.open(TermsModalComponent);
    modalRef.componentInstance.name = 'World';
  }

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
    const emailError = this.formValidationService.validateEmail(
      this.user.email
    );
    const passwordError = this.formValidationService.validatePassword(
      this.user.password
    );
    const nameError = this.formValidationService.validateName(this.user.name);
    const passwordValidationError =
      this.formValidationService.validatePasswordConfirmation(
        this.user.password,
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

    console.log(this.user);

    this.userService.createUser(this.user).subscribe(
      (response: any) => {
        if (response.success) {
          this.successMessage =
            'Conta criada com sucesso! Redirecionando para área de Entrar...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
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
        this.error = error;
        setTimeout(() => {
          this.showError = false;
        }, 2000);
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
