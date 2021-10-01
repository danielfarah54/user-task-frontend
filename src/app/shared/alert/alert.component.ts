import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-danger-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() type!: string;
  @Input() message!: string;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  onClose() {
    this.bsModalRef.hide();
  }
}
