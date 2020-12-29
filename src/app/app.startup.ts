import {UserService} from '../@core/service/user.service';
import {FlamingoAuthService} from '../@flamingo/service/flamingo-auth.service';

export function initializeApp(authService: FlamingoAuthService, userService: UserService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-console
      console.info('Startup App');
      if (authService.hasAuthorizationToken) {
        userService.fetchUser().subscribe(
          _ => resolve(),
          error => {
            console.error(error);
            authService.logout();
            resolve();
          });
      } else {
        authService.logout();
        resolve();
      }
    });
  };
}
