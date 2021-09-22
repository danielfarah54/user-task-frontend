import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  onProfile() {
    localStorage.getItem('id_token')
    // this.route.params.pipe(
    //   map((params) => params.id),
    //   map((id) =>
    //     this.router.navigate(['profile', id], { relativeTo: this.route })
    //   )
    // );
  }
}
