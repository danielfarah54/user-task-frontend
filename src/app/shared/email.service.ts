import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, FormGroup } from '@angular/forms';

import { QueryEmails } from '../types';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  verificarEmail(email: string) {
    return this.apollo
      .watchQuery<QueryEmails>({
        query: gql`
          query Query {
            emails {
              email
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((dados) => dados.data.emails),
        map((emails) => emails.length > 0)
      );
  }

  validarEmail(formControl: FormControl) {
    return this.verificarEmail(formControl.value).pipe(
      map((emailExiste) => (emailExiste ? { emailInvalido: true } : null))
    );
  }

  equalsTo(otherField: string) {

    const validator: ValidatorFn = (formControl: AbstractControl) => {
      if(otherField == null) {
        throw new Error('É necessário informar um campo.')
      }

      if(!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null
      }

      const field = (<FormGroup>formControl.root).get(otherField)
      if(!field){
        throw new Error('É necessário informar um campo válido.')
      }

      if(field.value !== formControl.value) {
        return { equalsTo: otherField }
      }

      return null
    }
    return validator
  }
}
