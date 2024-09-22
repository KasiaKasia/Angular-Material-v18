import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function digitsAndDotValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[0-9]*\.?[0-9]+$/.test(control.value);
    return valid ? null : { invalidFormat: 'Only digits and a single dot are allowed' };
  };
}