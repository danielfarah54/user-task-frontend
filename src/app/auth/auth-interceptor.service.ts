// import { SetHeadersService } from './set-headers.service';
// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthInterceptorService implements HttpInterceptor {
//   constructor(private setHeadersService: SetHeadersService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     try {
//       const cloned = req.clone({
//         headers: this.setHeadersService.setHeaders(),
//       });
//       return next.handle(cloned);
//     } catch (error) {
//       return next.handle(req);
//     }
//   }
// }
