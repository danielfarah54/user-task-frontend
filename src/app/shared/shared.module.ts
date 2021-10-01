import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EmailPasswordComponent } from './email-password/email-password.component';
import { AlertDangerComponent } from './alert/alert-danger.component';
import { AlertSuccessComponent } from './alert/alert-success.component';

@NgModule({
  declarations: [ConfirmModalComponent, EmailPasswordComponent, AlertDangerComponent, AlertSuccessComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [EmailPasswordComponent, CommonModule, FormsModule, AlertDangerComponent],
  providers: [ConfirmModalComponent, BsModalService],
})
export class SharedModule {}
