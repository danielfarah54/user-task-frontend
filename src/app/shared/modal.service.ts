import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private bsModalService: BsModalService) {}

  showAlertDanger() {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertComponent);
    bsModalRef.content.type = 'danger';
    bsModalRef.content.message =
      'Holy guacamole! You should check in on some of those fields below.';
  }

  showAlertSuccess() {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertComponent);
    bsModalRef.content.type = 'success';
    bsModalRef.content.message = `You're fine. Go ahead kid.`;
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
