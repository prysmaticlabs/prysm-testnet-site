import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[depositDataValidation]',
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: DepositDataValidatorDirective,
    multi: true,
  }],
})
export class DepositDataValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors|null {
    if (/^0x[0-9a-f]*$/.test((control.value || '').trim())) {
      return null;
    }
    return { 'invalidDepositData': {value: control.value}};
  }
}
