import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

import { AlertSuccessComponent } from './alert/alert-success.component';
import { AlertDangerComponent } from './alert/alert-danger.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private bsModalService: BsModalService) {}

  showAlertDanger() {
    this.bsModalService.show(AlertDangerComponent);
  }

  showAlertSuccess() {
    this.bsModalService.show(AlertSuccessComponent);
  }

  showConfirm(
    title: string,
    body: string,
    primaryButton?: string,
    secondaryButton?: string
  ) {
    const bsModalRef: BsModalRef = this.bsModalService.show(
      ConfirmModalComponent
    );
    bsModalRef.content.title = title;
    bsModalRef.content.body = body;
    primaryButton ? (bsModalRef.content.primaryButton = primaryButton) : null;
    secondaryButton
      ? (bsModalRef.content.secondaryButton = secondaryButton)
      : null;

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
