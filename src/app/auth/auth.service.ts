import { Router } from '@angular/router';
import { HeadersService } from './headers.service';
import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { MutationLogin } from './../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt!: {
    accessToken: string;
    expiresIn: string;
  };

  usuarioAutenticado = false;

  constructor(
    private apollo: Apollo,
    private headersService: HeadersService,
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
          this.usuarioAutenticado = false;
          return EMPTY;
        }),
        tap((token) => console.log(`jwt: ${JSON.stringify(token)}`)),
        map((token) => (this.jwt = token!)),
        map(({ accessToken, expiresIn }) =>
          this.setSession({ accessToken, expiresIn })
        ),
        map((_) => {
          this.usuarioAutenticado = true;
          this.router.navigate(['home/tasks']);
        })
      )
      .subscribe();
  }

  private setSession(tokenResult: { accessToken: string; expiresIn: string }) {
    const expiresAt = JSON.stringify(
      moment().add(tokenResult.expiresIn, 'second').valueOf()
    );

    this.headersService.setHeaders(tokenResult.accessToken, expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return moment().isAfter(this.getExpiration());
  }

  getExpiration() {
    let expiration = null;
    try {
      expiration = localStorage.getItem('expires_at');
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  logout() {
    moment().add('0', 'millisecond').valueOf();
    this.headersService.revokeHeaders();
    this.apollo.client.resetStore();
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
