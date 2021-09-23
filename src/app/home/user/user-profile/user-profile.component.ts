import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { User } from './../../../types';
import { UserRepositoryService } from './../../../shared/user-repository.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user_id!: string;
  formulario!: FormGroup;

  constructor(
    private repositoryService: UserRepositoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [null],
      email: [null],
    });

    this.formulario.get('name')?.disable();
    this.formulario.get('email')?.disable();

    this.repositoryService
      .getUser()
      .pipe(
        map((user) => {
          this.updateProfile(user);
          // console.log('user', user)
          return user.id;
        }),
        // tap(id => console.log(id)),
        map((id: number) => (this.user_id = id.toString()))
      )
      .subscribe();
  }

  private updateProfile(user: User) {
    this.formulario.patchValue({
      name: user.name,
      email: user.email,
    });
  }

  onSubmit() {
    window.location.replace(`home/profile/edit/${this.user_id}`)
  }
}
