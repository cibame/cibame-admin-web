import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsAvatarComponent } from './initials-avatar.component';



@NgModule({
  declarations: [InitialsAvatarComponent],
  exports: [
    InitialsAvatarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InitialsAvatarModule { }
