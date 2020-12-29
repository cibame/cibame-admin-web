import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChangePasswordValidator, CrossFieldErrorMatcher} from '../validator/change-password.validator';

@Component({
  selector: 'app-flamingo-change-password-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <form fxLayout="column" [formGroup]="changePasswordFormGroup" (ngSubmit)="submit()">
      <p>{{data.description}}</p>
      <mat-form-field fxFlex>
        <input matInput [type]="data.inputType" [placeholder]="data.inputOldPassword" formControlName="oldPassword">
        <mat-error *ngIf="oldPassword?.invalid && (oldPassword?.dirty || oldPassword?.touched)">
          <span *ngIf="oldPassword?.hasError('required')">Campo obbligatorio</span>
        </mat-error>
      </mat-form-field>
      <div fxLayout="column" [formGroup]="passwordFormGroup">
        <mat-form-field fxFlex>
          <input matInput [type]="data.inputType" [placeholder]="data.inputNewPassword" formControlName="password">
          <mat-error *ngIf="newPassword?.invalid && (newPassword?.dirty || newPassword?.touched)">
            <span *ngIf="newPassword?.hasError('required')">Campo obbligatorio</span>
          </mat-error>
        </mat-form-field>
        <mat-form-field fxFlex>
          <input matInput [type]="data.inputType" [placeholder]="data.inputRepeatPassword" formControlName="repeatPassword"
                 [errorStateMatcher]="errorMatcher">
          <mat-error *ngIf="repeatPassword?.invalid && (repeatPassword?.dirty || repeatPassword?.touched)">
            <span *ngIf="repeatPassword?.hasError('required')">Campo obbligatorio</span>
          </mat-error>
          <mat-error *ngIf="passwordFormGroup.hasError('passwordsDoNotMatch')">
            Le password non corrispondono
          </mat-error>
        </mat-form-field>
      </div>
      <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
        <button mat-button mat-dialog-close>{{data.actionCancel}}</button>
        <button mat-button [disabled]="!changePasswordFormGroup.valid"
                type="submit"
                color="accent">{{data.actionConfirm}}</button>
      </div>
    </form>
  `
})
export class FlamingoChangePasswordDialogComponent {
  changePasswordFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) public data: FlamingoChangePasswordDialogModel,
              private dialogRef: MatDialogRef<FlamingoChangePasswordDialogComponent>, private formBuilder: FormBuilder
  ) {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {
      validator: ChangePasswordValidator.validate
    });
    this.changePasswordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      passwordFormGroup: this.passwordFormGroup
    });
  }

  get newPassword(): AbstractControl | null {
    return this.passwordFormGroup.get('password');
  }

  get repeatPassword(): AbstractControl | null {
    return this.passwordFormGroup.get('repeatPassword');
  }

  get oldPassword(): AbstractControl | null {
    return this.changePasswordFormGroup.get('oldPassword');
  }

  submit(): void {
    this.dialogRef.close([this.oldPassword?.value, this.newPassword?.value]);
  }
}

export interface FlamingoChangePasswordDialogModel {
  title: string;
  description?: string;
  inputOldPassword: string;
  inputNewPassword: string;
  inputRepeatPassword: string;
  inputType: string;
  actionConfirm: string;
  actionCancel: string;
}

