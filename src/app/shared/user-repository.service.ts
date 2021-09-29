import { Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';
import { Injectable, EventEmitter } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  MutationDeleteUser,
  MutationLogin,
  MutationRegisterUser,
  MutationRevokeRefreshTokens,
  MutationUpdateUser,
  QueryUser,
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
        map((token: Token) =>
          this.authService.setSession({
            accessToken: token.accessToken,
            userId: token.userId,
            expiresIn: token.expiresIn,
          })
        ),
        map(() => {
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
        map(() => this.listEmitter.emit(true))
      )
      .subscribe();
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

  deleteUser() {
    const mutationString = gql`
      mutation Mutation {
        deleteUser
      }
    `;

    this.apollo
      .mutate<MutationDeleteUser>({
        mutation: mutationString,
      })
      .pipe(
        map((result) => result.data?.deleteUser),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        switchMap(() => this.router.navigate(['home/logout']))
      )
      .subscribe();
  }

  revokeRefreshTokens() {
    const mutationString = gql`
      mutation Mutation {
        revokeRefreshTokensForUser
      }
    `;

    this.apollo
      .mutate<MutationRevokeRefreshTokens>({
        mutation: mutationString,
      })
      .pipe(
        map((result) => result.data?.revokeRefreshTokensForUser),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
