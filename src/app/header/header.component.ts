import { AuthService } from './../auth/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  mostrarMenu: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(
      (mostrar) => (this.mostrarMenu = mostrar)
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
