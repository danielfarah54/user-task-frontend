import {
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  verificaInvalid(campo: AbstractControl) {
    return !campo.valid && campo.touched;
  }

  verificaValid(campo: AbstractControl) {
    return campo.valid && campo.touched;
  }

  aplicaCssErro(campo: AbstractControl) {
    return {
      'is-invalid': this.verificaInvalid(campo),
      'is-valid': this.verificaValid(campo),
    };
  }
}
