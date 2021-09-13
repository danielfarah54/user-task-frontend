import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, Query } from '../../types';

@Component({
  selector: 'app-user-lista',
  templateUrl: './user-lista.component.html',
  styleUrls: ['./user-lista.component.css'],
})
export class UserListaComponent implements OnInit {
  users!: Observable<User[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.users = this.apollo
      .watchQuery<Query>({
        query: gql`
          query Query {
            users {
              id
              name
              email
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.users));

    console.log(`users here: ${this.users}`);
  }
}
