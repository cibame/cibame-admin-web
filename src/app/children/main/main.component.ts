import {Component, OnDestroy} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Router} from '@angular/router';
import {User} from '../../../@core/model/user.model';
import {UserService} from '../../../@core/service/user.service';
import {flamingoAnimations} from '../../../@flamingo/animations';
import {FlamingoAuthService} from '../../../@flamingo/service/flamingo-auth.service';
import {FlamingoMessageService} from '../../../@flamingo/service/flamingo-message.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: flamingoAnimations
})
export class MainComponent implements OnDestroy {
  mediaObserver: MediaObserver;
  user: User | null;

  constructor(mediaObserver: MediaObserver,
              private router: Router,
              private userService: UserService,
              private authService: FlamingoAuthService,
              private messageService: FlamingoMessageService) {
    this.user = userService.user;
    this.mediaObserver = mediaObserver;
  }

  ngOnDestroy(): void {
  }

  logout(): void {
    this.messageService.showConfirmDialog('Uscire', 'Sei sicuro di voler uscire?', 'No', 'Esci')
      .subscribe(res => {
        if (res) {
          this.userService.clearUser();
          this.authService.logout();
          document.location.reload();
        }
      });
  }
}
