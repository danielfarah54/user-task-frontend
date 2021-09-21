import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, catchError, tap } from 'rxjs/operators';

import { FormService } from './../../../auth/form.service';
import { MutationRegisterUser } from '../../../types';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.formService.verificaValidacoesForm(this.formulario);
    }
  }

  submit() {
    const valueSubmit = Object.assign({}, this.formulario.value);
    const { name, email, password } = valueSubmit;

    // console.log(`values: ${JSON.stringify(valueSubmit)}`);

    const mutationString = gql`
      mutation Mutation($name: String!, $email: String!, $password: String!) {
        registerUser(name: $name, email: $email, password: $password)
      }
    `;

    this.apollo
      .mutate<MutationRegisterUser>({
        mutation: mutationString,
        variables: {
          name,
          email,
          password,
        },
      })
      .pipe(
        map((result) => result.data?.registerUser),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        tap((registerUser) => console.log(`registerUser: ${registerUser}`))
      )
      .subscribe();
  }
}
