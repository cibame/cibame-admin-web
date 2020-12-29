import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InitialsAvatarModule} from '../../../../../@shared/initials-avatar/initials-avatar.module';
import {SettingsRoutingModule} from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './children/profile/profile.component';
import { ChangePasswordComponent } from './children/change-password/change-password.component';



@NgModule({
  declarations: [SettingsComponent, ProfileComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
    InitialsAvatarModule
  ]
})
export class SettingsModule { }
