import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { MutationLogin } from './../types';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt!: {
    accessToken: string;
    expiresIn: string;
  };

  constructor(private http: HttpClient, private apollo: Apollo) {}

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
        // tap(res => console.log(res)),
        map(({ accessToken, expiresIn }) =>
          this.setSession({ accessToken, expiresIn })
        )
      )
      .subscribe();
  }

  private setSession(authResult: { accessToken: string; expiresIn: string }) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
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
}
