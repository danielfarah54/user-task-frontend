import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalService } from './../shared/modal.service';
import { FormsService } from '../shared/forms.service';
import { UserRepositoryService } from './../shared/user-repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  isValid = true;

  constructor(
    private formBuilder: FormBuilder,
    private repositoryService: UserRepositoryService,
    private formsService: FormsService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
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

    const { login } = valueSubmit;
    const { email, password } = login;

    this.alert()
    this.repositoryService.login(email, password);
  }

  alert() {
    this.modalService.showAlert()
  }

  onCreate() {
    this.router.navigate(['create']);
  }

  aplicaCssErro(nomeCampo: string) {
    const campo = this.formulario.get(nomeCampo)!;
    this.formsService.verificaInvalid(campo)
      ? (this.isValid = false)
      : (this.isValid = true);

    return this.formsService.aplicaCssErro(campo);
  }
}
