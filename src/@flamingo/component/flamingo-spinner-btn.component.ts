import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-flamingo-spinner-btn',
  template: `
    <button #btn mat-button fxLayout="row" fxLayoutAlign="center center"
            [color]="color" style="height: 36px" [ngStyle]="{'width': btnWidth}"
            (click)="setWidthAndSubmit()"
            [disabled]="disabledBtn">
      <ng-container *ngIf="!showSpinner">
        <ng-content></ng-content>
      </ng-container>
      <ng-container *ngIf="showSpinner">
        <mat-progress-spinner mode="indeterminate" color="primary" diameter="18"></mat-progress-spinner>
      </ng-container>
    </button>
  `
})
export class FlamingoSpinnerBtnComponent {

  @Input() showSpinner = false;
  @Input() disabledBtn = false;
  @Input() color: ThemePalette = 'accent';
  @Output() submitBtn = new EventEmitter<any>();

  @ViewChild('btn') btnElement?: MatButton;
  btnWidth = 'auto';

  setWidthAndSubmit(): void {
    this.btnWidth = this.btnElement?._elementRef.nativeElement.offsetWidth + 'px';
    this.submitBtn.emit();
  }

}
