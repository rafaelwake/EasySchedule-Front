import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SessionModel } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  session: SessionModel;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  current_password: string;

  // Injeta o UserService no construtor
  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {
    this.session = sessionService.getSession();
    this.name = this.session.user.name;
    this.email = this.session.user.email;
    this.password = '';
    this.confirmPassword = '';
    this.current_password = '';
  }

  ngOnInit(): void {
    // ...
  }

  // Função para atualizar os dados do usuário
  updateUser() {
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const updatedUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      current_password: this.current_password,
    };

    this.userService.updateAccount(this.session.token, updatedUser).subscribe(
      (res: any) => {
        console.log(res);
        alert('Dados atualizados com sucesso!');
      },
      (err: any) => console.error(err)
    );
  }
}
