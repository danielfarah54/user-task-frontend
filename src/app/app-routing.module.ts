import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './home/logout/logout.component';
import { UserCreateComponent } from './home/user/user-create/user-create.component';
import { UserListaComponent } from './home/user/user-lista/user-lista.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'create', component: UserCreateComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'users',
        component: UserListaComponent,
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./home/task/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
