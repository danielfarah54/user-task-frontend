import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserListaComponent } from './user-lista/user-lista.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserListaComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
