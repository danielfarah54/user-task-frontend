import { TaskService } from './../task.service';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MutationCreateTask } from './../../../types';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService
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
    const { name, description, completed } = valueSubmit;

    const mutationString = gql`
      mutation Mutation($name: String!, $description: String!) {
        registerTask(name: $name, description: $description)
      }
    `;

    this.apollo
      .mutate<MutationCreateTask>({
        mutation: mutationString,
        variables: {
          name,
          description,
          completed,
        },
      })
      .pipe(
        map((result) => result.data?.registerTask),
        tap((c) => console.log('resultao:', c)),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        tap((registerTask) => console.log(`registerTask: ${registerTask}`)),
        map(() => {
          this.router.navigate(['/home/tasks']);
        })
      )
      .subscribe();
  }
}
