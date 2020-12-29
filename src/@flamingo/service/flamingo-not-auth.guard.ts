import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {FlamingoAuthService} from './flamingo-auth.service';

@Injectable({
  providedIn: 'root',
})
export class FlamingoNotAuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private authService: FlamingoAuthService) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return !this.authService.hasAuthorizationToken;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.authService.hasAuthorizationToken;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.authService.hasAuthorizationToken;
  }

}
