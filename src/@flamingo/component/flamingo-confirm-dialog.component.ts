import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-flamingo-confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content fxLayout="column">
      <p>{{data.description}}</p>
    </div>
    <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
      <button mat-button mat-dialog-close class="btn-margin">{{data.cancel}}</button>
      <button mat-button [mat-dialog-close]="true" color="accent" class="btn-margin">{{data.confirm}}</button>
    </div>
  `
})
export class FlamingoConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FlamingoConfirmDialogModel>,
    @Inject(MAT_DIALOG_DATA) public data: FlamingoConfirmDialogModel) {
  }

  close(res: boolean): void {
    this.dialogRef.close(res);
  }
}

export interface FlamingoConfirmDialogModel {
  title: string;
  description: string;
  confirm: string;
  cancel: string;
}
