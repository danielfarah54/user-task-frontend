import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListaComponent } from './task-lista/task-lista.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [TaskListaComponent, TaskCreateComponent],
  imports: [CommonModule, TaskRoutingModule, ReactiveFormsModule],
})
export class TaskModule {}
