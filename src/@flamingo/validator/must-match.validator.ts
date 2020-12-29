import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function MustMatch(matchControlField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const matchControl = control.parent?.get(matchControlField);

    if (!matchControl) {
      return null;
    }

    if (!control.value || !matchControl.value) {
      return null;
    }

    if (matchControl.value === '') {
      return null;
    }

    if (control.value === matchControl.value) {
      return null;
    }
    return {doesNotMatch: true};
  };
}
