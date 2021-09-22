import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '../shared/forms.service';
import { UserRepositoryService } from './../shared/user-repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private repositoryService: UserRepositoryService,
    private formsService: FormsService
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
      this.formsService.verificaValidacoesForm(this.formulario);
    }
  }

  submit() {
    const valueSubmit = Object.assign({}, this.formulario.value);
    const { email, password } = valueSubmit;

    this.repositoryService.login(email, password);
  }
}
