import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-initials-avatar',
  templateUrl: './initials-avatar.component.html',
  styleUrls: ['./initials-avatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InitialsAvatarComponent implements OnInit {

  @Input() firstLetter = '';
  @Input() secondLetter = '';
  @Input() fallback = '';

  calculatedString = '';

  constructor() {
  }

  ngOnInit(): void {
    this.calculatedString = this.firstLetter || this.secondLetter ?
      this.firstLetter.charAt(0) + this.secondLetter.charAt(0) :
      this.fallback.charAt(0);
  }

}
