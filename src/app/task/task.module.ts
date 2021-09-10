import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskListaComponent } from './task-lista/task-lista.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [TaskListaComponent],
  imports: [CommonModule, TaskRoutingModule],
})
export class TaskModule {}
