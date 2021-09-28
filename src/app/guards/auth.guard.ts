import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, defer } from 'rxjs';

import { HeadersService } from './../auth/headers.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private headerService: HeadersService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return defer(() =>
      this.headerService
        .fetchRefreshToken()
        .then(() => {
          if (localStorage.getItem('id_token')) {
            return true;
          }
          this.router.navigate(['login']);
          return false;
        })
        .catch((err) => {
          console.error(err);
          return false;
        })
    );
  }
}
