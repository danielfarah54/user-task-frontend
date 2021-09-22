import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, take, switchMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import { ModalService } from '../../../shared/modal.service';
import { RepositoryService } from '../../../shared/repository.service';
import { Task } from '../../../types';

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
    private modalService: ModalService,
    private repositoryService: RepositoryService
  ) {}

  ngOnInit(): void {
    this.tasks = this.repositoryService.getTasks();
    this.repositoryService.listEmitter
      .pipe(
        map((v) =>
          v == true ? (this.tasks = this.repositoryService.getTasks()) : null
        ),
        map(() => window.location.replace('home/tasks'))
      )
      .subscribe();
  }

  onDelete(id: number) {
    const title = 'Confirmação';
    const body = 'Tem certeza que deseja excluir a tarefa?';
    const result$ = this.modalService.showConfirm(title, body);
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(async (result) =>
          result ? this.repositoryService.deleteTask(id) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.repositoryService.getTasks();
        },
        (error) => {
          throw new Error('DEU RUIM!!');
        }
      );
  }
}
