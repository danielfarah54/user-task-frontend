import { FormsService } from './../forms.service';
import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';

// describes what the return value of the form control will look like
export interface LoginFormValues {
  email: string;
  password: string;
}

@Component({
  selector: 'app-email-password',
  templateUrl: './email-password.component.html',
  styleUrls: ['./email-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailPasswordComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailPasswordComponent),
      multi: true,
    },
  ],
})
export class EmailPasswordComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  isValid = true;
  formulario!: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): LoginFormValues {
    return this.formulario.value;
  }

  set value(value: LoginFormValues) {
    this.formulario.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl() {
    return this.formulario.controls.email;
  }

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.formulario.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.formulario.reset();
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.formulario.valid ? null : { login: { valid: false } };
  }

  aplicaCssErro(nomeCampo: string) {
    const campo = this.formulario.get(nomeCampo)!;
    this.formsService.verificaInvalid(campo)
      ? (this.isValid = false)
      : (this.isValid = true);

    return this.formsService.aplicaCssErro(campo);
  }
}
