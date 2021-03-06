import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '../../../shared/forms.service';
import { TaskRepositoryService } from '../../../shared/task-repository.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit {
  formulario!: FormGroup;
  isValid = true;

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private repositoryService: TaskRepositoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
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
    const { name, description } = valueSubmit;
    this.repositoryService.createTask(name, description);
  }

  onClick() {
    this.router.navigate(['home']);
  }

  aplicaCssErro(nomeCampo: string) {
    const campo = this.formulario.get(nomeCampo)!;
    this.formsService.verificaInvalid(campo)
      ? (this.isValid = false)
      : (this.isValid = true);

    return this.formsService.aplicaCssErro(campo);
  }
}
