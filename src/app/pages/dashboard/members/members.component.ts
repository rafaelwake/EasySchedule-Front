import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SessionService } from 'src/app/services/user/session.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: any[] = [];

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    const token = this.sessionService.getSession().token;
    this.userService.getAllUsers(token).subscribe(
      (response) => {
        this.members = response;
        console.log('members', this.members);
      },
      (error) => {
        console.error('Erro ao obter membros:', error);
      }
    );
  }
}
