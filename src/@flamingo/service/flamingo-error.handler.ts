import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {throwError} from 'rxjs';
import {FlamingoMessageService} from './flamingo-message.service';

@Injectable()
export class FlamingoErrorHandler implements ErrorHandler {

  constructor(private injector: Injector,
              private ngZone: NgZone) {
  }

  handleError(error: any): void {
    const messageService = this.injector.get(FlamingoMessageService);

    if (error instanceof HttpErrorResponse) {
      console.error(error.message);
      this.ngZone.run(() => messageService.showMessage('Errore: ' + error.message));
    } else {
      console.error('Errore applicazione.', error);
      throwError(error);
    }
  }

}
