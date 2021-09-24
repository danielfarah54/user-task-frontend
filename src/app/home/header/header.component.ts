import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user_id!: string | null;
  constructor(private route: ActivatedRoute, private router: Router) {}

  onProfile() {
    this.user_id = localStorage.getItem('user_id');
    this.router.navigate(['profile', this.user_id], { relativeTo: this.route });
  }
}
