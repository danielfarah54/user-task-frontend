import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeadersService {
  constructor() {}

  setHeaders(accessToken: string, userId: string, expiresAt: string) {
    localStorage.setItem('id_token', accessToken);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('expires_at', expiresAt);
  }

  revokeHeaders() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('expires_at');
  }

  async fetchRefreshToken() {
    return await fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken, userId, expiresIn } = await x.json();
      this.setHeaders(accessToken, userId, expiresIn);
    });
  }
}
