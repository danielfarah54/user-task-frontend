import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListaComponent } from './task-lista/task-lista.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskUpdateComponent } from './task-update/task-update.component';

@NgModule({
  declarations: [TaskListaComponent, TaskCreateComponent, TaskUpdateComponent],
  imports: [CommonModule, TaskRoutingModule, ReactiveFormsModule],
})
export class TaskModule {}
