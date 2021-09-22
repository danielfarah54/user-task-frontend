import { Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MutationLogin, Token } from '../types';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
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
        map((result) => <Token>result.data?.login),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        tap((token: Token) => console.log(`jwt: ${JSON.stringify(token)}`)),
        map((token: Token) =>
          this.authService.setSession({
            accessToken: token.accessToken,
            expiresIn: token.expiresIn,
          })
        ),
        map((_) => {
          this.router.navigate(['home/tasks']);
        })
      )
      .subscribe();
  }
}
