import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../../../types';
import { TaskService } from './../task.service';

@Component({
  selector: 'app-task-lista',
  templateUrl: './task-lista.component.html',
  styleUrls: ['./task-lista.component.scss'],
})
export class TaskListaComponent implements OnInit {
  tasks!: Observable<Task[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.refreshList();
  }
}
