import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, take, tap} from 'rxjs/operators';
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
    return this.flamingoHttpService.get<User>(`/me`).pipe(
      tap((user) => this._user$.next(user))
    );
  }

  public clearUser(): void {
    this._user$.next(null);
  }

  public setPassword(changePassword: ChangePasswordDto): Observable<User> {
    return this.flamingoHttpService.post<User>(`/me/change-password`, changePassword);
  }
}
