import {HttpClient} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from '../@core/service/user.service';
import {FlamingoModule} from '../@flamingo/flamingo.module';
import {FlamingoAuthService} from '../@flamingo/service/flamingo-auth.service';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp} from './app.startup';
import {AuthService} from './children/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FlamingoModule.forRoot({storagePrefix: 'cibame_admin_'}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [FlamingoAuthService, UserService]
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
