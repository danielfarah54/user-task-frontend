import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EmailPasswordComponent } from './email-password/email-password.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [ConfirmModalComponent, EmailPasswordComponent, AlertComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [EmailPasswordComponent, CommonModule, FormsModule, AlertComponent],
  providers: [ConfirmModalComponent, BsModalService],
})
export class SharedModule {}
