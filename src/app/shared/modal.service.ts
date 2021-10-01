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
    const bsModalRef: BsModalRef =
      this.bsModalService.show(AlertComponent);
    bsModalRef.content.classAlert = 'danger'
    bsModalRef.content.title = 'Holy guacamole!'
    bsModalRef.content.body = ' You should check in on some of those fields below.'
  }

  showAlertSuccess() {
    const bsModalRef: BsModalRef =
      this.bsModalService.show(AlertComponent);
    bsModalRef.content.classAlert = 'success'
    bsModalRef.content.title = `You're fine.`
    bsModalRef.content.body = ' Go ahead kid.'
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
