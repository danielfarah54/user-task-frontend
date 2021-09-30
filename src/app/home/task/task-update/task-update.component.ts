import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Task } from './../../../types';
import { TaskRepositoryService } from './../../../shared/task-repository.service';
import { FormsService } from './../../../shared/forms.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss'],
})
export class TaskUpdateComponent implements OnInit {
  formulario!: FormGroup;
  id!: string;
  isValid = true;

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private repositoryService: TaskRepositoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.route.params
      .pipe(
        map((value) => (this.id = value.id)),
        map((id) => this.repositoryService.getTask(id)),
        switchMap((task) => task),
        map((task) => this.updateForm(task))
      )
      .subscribe();
  }

  private updateForm(task: Task) {
    this.formulario.patchValue({
      name: task.name,
      description: task.description,
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

    this.repositoryService.updateTask(this.id, name, description);
  }

  onClick() {
    this.router.navigate(['home'])
  }

  aplicaCssErro(nomeCampo: string) {
    const campo = this.formulario.get(nomeCampo)!;
    this.formsService.verificaInvalid(campo)
      ? (this.isValid = false)
      : (this.isValid = true);

    return this.formsService.aplicaCssErro(campo);
  }
}
