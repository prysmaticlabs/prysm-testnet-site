import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';

export const DEPOSIT_DATA_LENGTH = 842;

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
    if (/^0x[0-9a-f]+$/.test((control.value || '').trim()) && (control.value || '').trim().length === DEPOSIT_DATA_LENGTH) {
      return null;
    }
    return { 'invalidDepositData': {value: control.value}};
  }
}
