import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, take, tap} from 'rxjs/operators';
import {FlamingoHttpService} from '../../@flamingo/service/flamingo-http.service';
import {ChangePasswordDto} from '../dto/change-password.dto';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this._user$.asObservable()
    .pipe(
      filter(user => !!user),
      take(1)
    );

  get user(): User | null {
    return this._user$.value;
  }

  constructor(private flamingoHttpService: FlamingoHttpService) {
  }

  public fetchUser(): Observable<User> {
    return this.flamingoHttpService.get<any>('/auth/me').pipe(
      map(user => user.profile as User),
      tap((user) => this._user$.next(user))
    );
  }

  public clearUser(): void {
    this._user$.next(null);
  }

  public setPassword(changePassword: ChangePasswordDto): Observable<User> {
    return this.flamingoHttpService.post<User>('/auth/change-password', changePassword);
  }
}
