import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeadersService {
  constructor() {}

  setHeaders(accessToken: string, expiresAt: string) {
    localStorage.setItem('id_token', accessToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  revokeHeaders() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
