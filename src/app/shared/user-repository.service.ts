import { ModalService } from './modal.service';
import { Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
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
  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
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
          this.modalService.showAlertDanger();
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
          window.location.replace('home');
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
          this.modalService.showAlertDanger();
          return EMPTY;
        }),
        map(() => {
          this.modalService.showAlertSuccess();
          this.router.navigate(['login']);
        })
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
          this.modalService.showAlertDanger();
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
          this.modalService.showAlertDanger();
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
          this.modalService.showAlertDanger();
          return EMPTY;
        })
      )
      .subscribe();
  }
}
