import {Component, OnDestroy} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {flamingoAnimations} from '../../../@flamingo/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: flamingoAnimations
})
export class MainComponent implements OnDestroy {
  mediaObserver: MediaObserver;

  constructor(mediaObserver: MediaObserver) {
    this.mediaObserver = mediaObserver;
  }

  ngOnDestroy(): void {
  }
}
