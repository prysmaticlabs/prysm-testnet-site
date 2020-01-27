import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

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
    const isHex = (/^0x[0-9a-f]+$/).test((control.value || '').replace(/\s+/g, ''));
    const hasRightLength = (control.value || '').replace(/\s+/g, '').length === DEPOSIT_DATA_LENGTH;
    if (isHex && hasRightLength) {
      return null;
    }
    return { 'invalidDepositData': {value: control.value}};
  }
}
