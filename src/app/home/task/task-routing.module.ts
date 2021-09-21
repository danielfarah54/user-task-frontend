import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListaComponent } from './task-lista/task-lista.component';
import { TaskUpdateComponent } from './task-update/task-update.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListaComponent,
  },
  { path: 'create', component: TaskCreateComponent },
  { path: 'edit/:id', component: TaskUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
