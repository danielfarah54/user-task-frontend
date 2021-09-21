import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Task } from '../types';
import { TaskService } from './../home/task/task.service';

@Injectable({ providedIn: 'root' })
export class TaskListResolver implements Resolve<Task[]> {
  constructor(private taskService: TaskService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Task[]> | Task[] {
    return this.taskService.refreshList();
  }
}
