import { AuthService } from './../auth/auth.service';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MutationLogin } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  jwt!: {
    accessToken: string;
    expiresIn: string;
  };

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
        map((result) => result.data?.login),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        tap((token) => console.log(`jwt: ${JSON.stringify(token)}`)),
        map((token) => (this.jwt = token!)),
        map(({ accessToken, expiresIn }) =>
          this.authService.setSession({ accessToken, expiresIn })
        ),
        map((_) => {
          this.router.navigate(['home/tasks']);
        })
      )
      .subscribe();
  }
}
