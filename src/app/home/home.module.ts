import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home.component';
import { LogoutComponent } from './logout/logout.component';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [HeaderComponent, HomeComponent, LogoutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    TaskModule,
    UserModule,
  ],
  bootstrap: [HomeComponent],
})
export class HomeModule {}
