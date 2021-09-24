import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserListaComponent } from './user-lista/user-lista.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    UserListaComponent,
    UserCreateComponent,
    UserProfileComponent,
    UserEditComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserModule {}
