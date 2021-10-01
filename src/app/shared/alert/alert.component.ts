import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-danger-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() classAlert!: string;
  @Input() title!: string;
  @Input() body!: string;
  constructor() {}

  ngOnInit(): void {}
}
