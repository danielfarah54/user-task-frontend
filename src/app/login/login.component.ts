import { Apollo, gql } from 'apollo-angular';
import { catchError, map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { MutationLogin } from './../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  jwt!: {
    accessToken: string;
    expiresIn: string;
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  submit() {
    const valueSubmit = Object.assign({}, this.formulario.value);
    const { email, password } = valueSubmit;

    // console.log(`values: ${JSON.stringify(valueSubmit)}`);

    const mutationString = gql`
      mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          expiresIn
        }
      }
    `;

    this.apollo
      .mutate<MutationLogin>({
        mutation: mutationString,
        variables: {
          email,
          password,
        },
      })
      .pipe(
        map((result) => result.data?.login),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        tap((token) => console.log(`jwt: ${JSON.stringify(token)}`)),
        map((token) => (this.jwt = token!)),
        map((res) => this.setSession(res))
      )
      .subscribe();
  }

  private setSession(authResult: { accessToken: string; expiresIn: string }) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    let expiration = null;
    try {
      expiration = localStorage.getItem('expires_at');
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  resetar() {
    this.formulario.reset();
  }
}
