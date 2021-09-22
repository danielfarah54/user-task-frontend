import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RepositoryService } from './../shared/repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  jwt!: {
    accessToken: string;
    expiresIn: string;
  };

  constructor(
    private formBuilder: FormBuilder,
    private repositoryService: RepositoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  createAccount() {
    console.log('create');
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

    this.repositoryService.login(email, password);
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  resetar() {
    this.formulario.reset();
  }
}
