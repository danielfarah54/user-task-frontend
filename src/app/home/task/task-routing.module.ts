import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListaComponent } from './task-lista/task-lista.component';
import { TaskListResolver } from './../../guards/task-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: TaskListaComponent,
  },
  { path: 'create', component: TaskCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
