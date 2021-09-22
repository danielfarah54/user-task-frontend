import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskCreateComponent } from './task-create/task-create.component';
// import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { TaskListaComponent } from './task-lista/task-lista.component';
import { TaskUpdateComponent } from './task-update/task-update.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListaComponent,
  },
  { path: 'create', component: TaskCreateComponent },
  { path: 'edit/:id', component: TaskUpdateComponent },
  // { path: 'delete/:id', component: TaskDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}