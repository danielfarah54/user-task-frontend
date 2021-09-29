import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRepositoryService } from './../../shared/user-repository.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userRepositoryService: UserRepositoryService
  ) {}

  ngOnInit(): void {
    this.userRepositoryService.revokeRefreshTokens();
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
