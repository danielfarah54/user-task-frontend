import { FormsService } from './../../../shared/forms.service';
import { TaskService } from './../task.service';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private taskService: TaskService,
    private formsService: FormsService
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
        map(() => this.taskService.listEmitter.emit(true))
      )
      .subscribe();
  }
}
