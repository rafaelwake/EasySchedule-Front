import { Component, OnInit } from '@angular/core';
import { SessionModel } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  session: SessionModel;

  constructor(private sessionService: SessionService) {
    this.session = {
      // Inicializa a propriedade session no construtor
      id: '',
      user: { name: '', email: '' },
      token: '',
      createdAt: new Date(),
    };
  }

  ngOnInit(): void {
    this.session = this.sessionService.getSession(); // Obtém o objeto session do serviço
  }
}
