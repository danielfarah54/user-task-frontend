import { HeadersService } from './headers.service';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt!: {
    accessToken: string;
    expiresIn: string;
  };

  constructor(private apollo: Apollo, private headersService: HeadersService) {}

  setSession(tokenResult: { accessToken: string; expiresIn: string }) {
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
}
