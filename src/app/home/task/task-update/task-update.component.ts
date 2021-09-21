import { ActivatedRoute } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';
import { catchError, map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FormService } from './../../../auth/form.service';
import { MutationUpdateTask } from './../../../types';
import { TaskService } from './../task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss'],
})
export class TaskUpdateComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private taskService: TaskService,
    private route: ActivatedRoute
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
      this.formService.verificaValidacoesForm(this.formulario);
    }
  }

  submit() {
    const valueSubmit = Object.assign({}, this.formulario.value);
    const { name, description } = valueSubmit;

    const mutationString = gql`
      mutation Mutation($name: String!, $description: String!, $id: Float!) {
        updateTask(name: $name, description: $description, id: $id)
      }
    `;

    let id = 0;

    this.route.params.pipe(map((value) => (id = value.id))).subscribe();
    // console.log('id', id);
    // console.log('name', name);
    // console.log('description', description);

    this.apollo
      .mutate<MutationUpdateTask>({
        mutation: mutationString,
        errorPolicy: 'all',
        variables: {
          name,
          description,
          id,
        },
      })
      .pipe(
        map((result) => result.data?.updateTask),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        map(() => this.taskService.listEmitter.emit(true))
      )
      .subscribe();
  }
}
