<<<<<<< HEAD
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormService } from './../../../auth/form.service';
import { MutationCreateTask } from './../../../types';
import { TaskService } from './../task.service';
=======
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '../../../shared/forms.service';
import { TaskRepositoryService } from '../../../shared/task-repository.service';
>>>>>>> delete-task

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
<<<<<<< HEAD
    private taskService: TaskService,
    private formService: FormService
=======
    private formsService: FormsService,
    private repositoryService: TaskRepositoryService
>>>>>>> delete-task
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
<<<<<<< HEAD
      this.formService.verificaValidacoesForm(this.formulario);
=======
      this.formsService.verificaValidacoesForm(this.formulario);
>>>>>>> delete-task
    }
  }

  submit() {
    const valueSubmit = Object.assign({}, this.formulario.value);
    const { name, description } = valueSubmit;
<<<<<<< HEAD

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
        },
      })
      .pipe(
        map((result) => result.data?.registerTask),
        // tap((c) => console.log('resultao:', c)),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        // tap((registerTask) => console.log(`registerTask: ${registerTask}`)),
        map(() => this.taskService.listEmitter.emit(true))
      )
      .subscribe();
=======
    this.repositoryService.createTask(name, description);
>>>>>>> delete-task
  }
}
