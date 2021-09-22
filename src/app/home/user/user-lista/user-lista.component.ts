import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../../types';
import { UserRepositoryService } from './../../../shared/user-repository.service';

@Component({
  selector: 'app-user-lista',
  templateUrl: './user-lista.component.html',
  styleUrls: ['./user-lista.component.scss'],
})
export class UserListaComponent implements OnInit {
  users!: Observable<User[]>;

  constructor(private repositoryService: UserRepositoryService) {}

  ngOnInit(): void {
    this.users = this.repositoryService.getUsers();
    this.repositoryService.listEmitter
      .pipe(
        map((v) =>
          v == true ? (this.users = this.repositoryService.getUsers()) : null
        ),
        map(() => window.location.replace('home/users'))
      )
      .subscribe();
  }
}
