import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo, private headersService: HeadersService) {}

  setSession(tokenResult: {
    accessToken: string;
    userId: string;
    expiresIn: string;
  }) {
    this.headersService.setHeaders(
      tokenResult.accessToken,
      tokenResult.userId,
      tokenResult.expiresIn
    );
  }

  logout() {
    this.headersService.revokeHeaders();
    this.apollo.client.resetStore();
  }
}
