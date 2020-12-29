import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class ChangePasswordValidator {
  static validate(changePasswordFormGroup: FormGroup): any {
    const condition = changePasswordFormGroup?.get('password')?.value !== changePasswordFormGroup.get('repeatPassword')?.value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }
}

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!((control?.dirty || control?.touched) && form?.hasError('passwordsDoNotMatch'));
  }
}
