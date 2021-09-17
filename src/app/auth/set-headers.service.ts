import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SetHeadersService {
  constructor() {}

  setHeaders() {
    const token = localStorage.getItem('id_token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `bearer ${token}`,
      }),
    };
    return httpOptions;
  }
}
