import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-flamingo-input-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content fxLayout="column">
      <p>{{data.description}}</p>
      <mat-form-field fxFlex>
        <input matInput #inputValue [type]="data.inputType" [placeholder]="data.inputPlaceholder">
      </mat-form-field>
    </div>
    <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
      <button mat-button mat-dialog-close>{{data.actionCancel}}</button>
      <button mat-button [mat-dialog-close]="inputValue.value" color="accent">{{data.actionConfirm}}</button>
    </div>
  `
})
export class FlamingoInputDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FlamingoInputDialogModel) {

  }
}

export interface FlamingoInputDialogModel {
  title: string;
  description: string;
  inputPlaceholder: string;
  inputType: string;
  actionConfirm: string;
  actionCancel: string;
}
