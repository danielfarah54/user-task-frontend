import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [ConfirmModalComponent, BsModalService],
})
export class SharedModule {}
