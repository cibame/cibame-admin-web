import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FlamingoChangePasswordDialogComponent } from '../component/flamingo-change-password-dialog.component';
import { FlamingoConfirmDialogComponent } from '../component/flamingo-confirm-dialog.component';
import { FlamingoInputDialogComponent } from '../component/flamingo-input-dialog.component';
import { FlamingoSnackBarLoaderComponent } from '../component/snackbar-loader.component';

@Injectable()
export class FlamingoMessageService {

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  showMessage(message: string, duration: number = 5000): void {
    this.snackBar.open(message, undefined, {duration});
  }

  showMessageWithConfirm(message: string, action: string = 'OK'): void {
    this.snackBar.open(message, action);
  }

  showMessageWithLoader(message: string): void {
    const config = new MatSnackBarConfig();
    config.data = {
      message
    };
    this.snackBar.openFromComponent(FlamingoSnackBarLoaderComponent, config);
  }

  showModal(component: any, data: any = {}, autoFocus?: boolean, disableClose?: boolean, width?: number): Observable<any> {
    return this.dialog.open(component, {
      width: (width ? width : '600') + 'px',
      maxHeight: '95vh',
      maxWidth: '90vw',
      autoFocus,
      disableClose,
      data
    }).afterClosed();
  }

  showModalAndGetDialogRef<T, D = any, R = any>(component: any, data: any = {}, autoFocus?: boolean, disableClose?: boolean, width?: number): MatDialogRef<T, R> {
    return this.dialog.open(component, {
      width: (width ? width : '600') + 'px',
      maxHeight: '95vh',
      maxWidth: '90vw',
      autoFocus,
      disableClose,
      data
    });
  }

  showConfirmDialog(title?: string, description?: string, cancel?: string, confirm?: string, width?: number): Observable<boolean> {
    return this.dialog.open(FlamingoConfirmDialogComponent, {
      width: (width ? width : '400') + 'px',
      data: {
        title: title ? title : 'Confirm',
        description: description ? description : 'Are you sure?',
        cancel: cancel ? cancel : 'Cancel',
        confirm: confirm ? confirm : 'Confirm'
      }
    }).afterClosed();
  }

  showInputDialog(title?: string, description?: string, placeholder?: string, type?: string, cancel?: string, confirm?: string, width?: number): Observable<string> {
    return this.dialog.open(FlamingoInputDialogComponent, {
      width: (width ? width : '400') + 'px',
      data: {
        title: title ? title : 'Input',
        description: description ? description : 'Insert text',
        inputPlaceholder: placeholder ? placeholder : 'Label',
        inputType: type ? type : 'string',
        actionCancel: cancel ? cancel : 'Cancel',
        actionConfirm: confirm ? confirm : 'Confirm'
      }
    }).afterClosed();
  }

  showChangePasswordDialog(title?: string, description?: string, oldPassword?: string, newPassword?: string, repeatPassword?: string, type?: string, cancel?: string, confirm?: string, width?: number): Observable<any> {
    let passwordDialogRef: MatDialogRef<FlamingoChangePasswordDialogComponent>;
    passwordDialogRef = this.dialog.open(FlamingoChangePasswordDialogComponent, {
      width: (width ? width : '400') + 'px',
      data: {
        title: title ? title : 'Input',
        description: description ? description : '',
        inputOldPassword: oldPassword ? oldPassword : 'Label',
        inputNewPassword: newPassword ? newPassword : 'Label',
        inputRepeatPassword: repeatPassword ? repeatPassword : 'Label',
        inputType: type ? type : 'string',
        actionCancel: cancel ? cancel : 'Cancel',
        actionConfirm: confirm ? confirm : 'Confirm'
      }
    });
    return passwordDialogRef.afterClosed();
  }
}
