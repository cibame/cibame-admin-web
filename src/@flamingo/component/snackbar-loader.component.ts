import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flamingo-snackbar-loader',
  template: `
    <div fxLayout="row" fxLayoutAlign="space-between center">
      {{data.message}}
      <mat-progress-spinner mode="indeterminate" color="accent" diameter="18"></mat-progress-spinner>
    </div>
  `
})
export class FlamingoSnackBarLoaderComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }

}
