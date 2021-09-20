import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserCreateComponent } from './user-create/user-create.component';
import { UserListaComponent } from './user-lista/user-lista.component';

const routes: Routes = [
  // { path: '', component: UserListaComponent },
  // { path: 'create', component: UserCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
