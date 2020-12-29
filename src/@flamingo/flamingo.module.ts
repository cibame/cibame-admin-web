import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FlamingoChangePasswordDialogComponent } from './component/flamingo-change-password-dialog.component';
import { FlamingoConfirmDialogComponent } from './component/flamingo-confirm-dialog.component';
import { FlamingoInputDialogComponent } from './component/flamingo-input-dialog.component';
import { FlamingoSpinnerBtnComponent } from './component/flamingo-spinner-btn.component';
import { FlamingoSnackBarLoaderComponent } from './component/snackbar-loader.component';
import {FLAMINGO_APP_CONFIG, FlamingoAppConfig} from './flaming.config';
import { FlamingoAuthGuard } from './service/flamingo-auth.guard';
import { FlamingoAuthService } from './service/flamingo-auth.service';
import { FlamingoErrorHandler } from './service/flamingo-error.handler';
import { FlamingoHttpInterceptor } from './service/flamingo-http.interceptor';
import { FlamingoMessageService } from './service/flamingo-message.service';
import { initializeFlamingo } from './service/flamingo.startup';

@NgModule({
  declarations: [
    FlamingoInputDialogComponent,
    FlamingoConfirmDialogComponent,
    FlamingoChangePasswordDialogComponent,
    FlamingoSpinnerBtnComponent,
    FlamingoSnackBarLoaderComponent
  ],
  entryComponents: [
    FlamingoInputDialogComponent,
    FlamingoConfirmDialogComponent,
    FlamingoChangePasswordDialogComponent,
    FlamingoSnackBarLoaderComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    // Mat
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    FlamingoInputDialogComponent,
    FlamingoConfirmDialogComponent,
    FlamingoChangePasswordDialogComponent,
    FlamingoSpinnerBtnComponent,
  ]
})
export class FlamingoModule {
  static forRoot(config?: FlamingoAppConfig): ModuleWithProviders<FlamingoModule> {
    return {
      ngModule: FlamingoModule,
      providers: [
        {provide: FLAMINGO_APP_CONFIG, useValue: config},
        {provide: APP_INITIALIZER, useFactory: initializeFlamingo, multi: true, deps: [HttpClient]},
        {provide: ErrorHandler, useClass: FlamingoErrorHandler},
        {provide: HTTP_INTERCEPTORS, useClass: FlamingoHttpInterceptor, multi: true},
        FlamingoAuthService,
        FlamingoMessageService,
        FlamingoAuthGuard
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: FlamingoModule) {
    if (parentModule) {
      throw new Error('FlamingoModule has already been imported.');
    }
  }
}
