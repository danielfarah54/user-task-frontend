import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Task } from '../../../types';
import { TaskService } from './../task.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-lista',
  templateUrl: './task-lista.component.html',
  styleUrls: ['./task-lista.component.scss'],
})
export class TaskListaComponent implements OnInit {
  tasks!: Observable<Task[]>;

  constructor(private taskService: TaskService, private router: Router) {}

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
}
