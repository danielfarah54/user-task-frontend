import { Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';
import { Injectable, EventEmitter } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {
  MutationLogin,
  MutationRegisterUser,
  MutationUpdateUser,
  QueryUser,
  QueryUsers,
  Token,
} from '../types';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  listEmitter = new EventEmitter<boolean>();

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    const mutationString = gql`
      mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          userId
          expiresIn
        }
      }
    `;

    this.apollo
      .mutate<MutationLogin>({
        mutation: mutationString,
        variables: {
          email,
          password,
        },
      })
      .pipe(
        map((result) => <Token>result.data?.login),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        tap((token: Token) => console.log(`jwt: ${JSON.stringify(token)}`)),
        map((token: Token) =>
          this.authService.setSession({
            accessToken: token.accessToken,
            userId: token.userId,
            expiresIn: token.expiresIn,
          })
        ),
        map((_) => {
          this.router.navigate(['home/tasks']);
        })
      )
      .subscribe();
  }

  createUser(name: string, email: string, password: string) {
    const mutationString = gql`
      mutation Mutation($name: String!, $email: String!, $password: String!) {
        registerUser(name: $name, email: $email, password: $password)
      }
    `;

    this.apollo
      .mutate<MutationRegisterUser>({
        mutation: mutationString,
        variables: {
          name,
          email,
          password,
        },
      })
      .pipe(
        map((result) => result.data?.registerUser),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        tap((registerUser) => console.log(`registerUser: ${registerUser}`)),
        map(() => this.listEmitter.emit(true))
      )
      .subscribe();
  }

  getUsers() {
    return this.apollo
      .watchQuery<QueryUsers>({
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
  }

  getUser() {
    return this.apollo
      .watchQuery<QueryUser>({
        query: gql`
          query Query {
            user {
              id
              name
              email
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.user));
  }

  updateUser(name: string, email: string) {
    const mutationString = gql`
      mutation Mutation($name: String!, $email: String!) {
        updateUser(name: $name, email: $email)
      }
    `;

    this.apollo
      .mutate<MutationUpdateUser>({
        mutation: mutationString,
        variables: {
          name,
          email,
        },
      })
      .pipe(
        map((result) => result.data?.updateUser),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
