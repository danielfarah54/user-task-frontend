import { Router } from '@angular/router';
import { FormsService } from './../../../shared/forms.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { User } from './../../../types';
import { UserRepositoryService } from './../../../shared/user-repository.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  formulario!: FormGroup;
  user_id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private repositoryService: UserRepositoryService,
    private formsService: FormsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });

    this.repositoryService
      .getUser()
      .pipe(
        map((user) => {
          this.user_id = user.id.toString();
          return user;
        }),
        map((user) => this.updateForm(user))
      )
      .subscribe();
  }

  updateForm(user: User) {
    this.formulario.patchValue({
      name: user.name,
      email: user.email,
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.formsService.verificaValidacoesForm(this.formulario);
    }
  }

  submit() {
    const valueSubmit = Object.assign({}, this.formulario.value);
    const { name, email } = valueSubmit;
    this.repositoryService.updateUser(name, email);
    window.location.replace(`home/profile/${this.user_id}`);
  }

  onCancel() {
    this.router.navigate(['home/profile', this.user_id]);
  }
}
