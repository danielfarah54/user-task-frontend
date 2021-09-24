import { FormGroup, FormBuilder } from '@angular/forms';
import { map, switchMap, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { ModalService } from './../../../shared/modal.service';
import { User } from './../../../types';
import { UserRepositoryService } from './../../../shared/user-repository.service';
import { EMPTY } from 'rxjs';

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
    private modalService: ModalService
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
          return user.id;
        }),
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
    window.location.replace(`home/profile/edit/${this.user_id}`);
  }

  onDelete() {
    const title = 'Confirmação';
    const body = 'Tem certeza que deseja excluir a tarefa?';
    const result$ = this.modalService.showConfirm(title, body);
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(async (result) =>
          result ? this.repositoryService.deleteUser() : EMPTY
        )
      )
      .subscribe();
  }
}
