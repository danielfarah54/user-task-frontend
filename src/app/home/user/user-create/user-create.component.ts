import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserRepositoryService } from './../../../shared/user-repository.service';
import { FormsService } from '../../../shared/forms.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  formulario!: FormGroup;
  isValid = true;

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private repositoryService: UserRepositoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [null, Validators.required],
      login: [],
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
    console.log(valueSubmit);

    const { name, login } = valueSubmit;
    const { email, password } = login;

    this.repositoryService.createUser(name, email, password);
  }

  onCancel() {
    this.router.navigate(['login']);
  }

  aplicaCssErro(nomeCampo: string) {
    const campo = this.formulario.get(nomeCampo)!;
    this.formsService.verificaInvalid(campo)
      ? (this.isValid = false)
      : (this.isValid = true);

    return this.formsService.aplicaCssErro(campo);
  }
}
