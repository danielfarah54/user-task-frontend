import { Apollo, gql } from 'apollo-angular';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, take, switchMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import { ModalService } from './../../../shared/modal.service';
import { MutationDeleteTask, Task } from '../../../types';
import { TaskService } from './../task.service';

@Component({
  selector: 'app-task-lista',
  templateUrl: './task-lista.component.html',
  styleUrls: ['./task-lista.component.scss'],
})
export class TaskListaComponent implements OnInit {
  tasks!: Observable<Task[]>;
  modalRef?: BsModalRef;

  @ViewChild('deleteModal') deleteModal: any;

  constructor(
    private taskService: TaskService,
    private modalService: ModalService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskService.refreshList();
    this.taskService.listEmitter
      .pipe(
        map((v) =>
          v == true ? (this.tasks = this.taskService.refreshList()) : null
        ),
        map(() => window.location.replace('home/tasks'))
      )
      .subscribe();
  }

  onDelete(id: number) {
    const mutationString = gql`
      mutation Mutation($id: Float!) {
        deleteTask(id: $id)
      }
    `;
    const title = 'Confirmação';
    const body = 'Tem certeza que deseja excluir a tarefa?';
    const result$ = this.modalService.showConfirm(title, body);
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(async (result) =>
          result
            ? this.apollo.mutate<MutationDeleteTask>({
                mutation: mutationString,
                variables: {
                  id,
                },
              })
            : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.taskService.refreshList();
        },
        (error) => {
          throw new Error('DEU RUIM!!');
        }
      );
  }
}
