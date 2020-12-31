import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FlamingoHttpService} from '../../../@flamingo/service/flamingo-http.service';
import {LoginDto} from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(private http: FlamingoHttpService) {
  }

  login(dto: LoginDto): Observable<any> {
    return this.http.post('/auth/login', dto);
  }

  registerAccount(dto: Account): Observable<any> {
    return this.http.post('/auth/signup', dto);
  }

  getAccount(): Observable<any> {
    return this.http.get('/auth/me');
  }

  resetEmail(email: string): Observable<any> {
    return this.http.post('/auth/reset', {email});
  }

  checkCode(codeDto: { email: string, code: string }): Observable<any> {
    return this.http.post('/auth/check-code', codeDto);
  }

  finalize(finalizeDto: { email: string, code: string, password: string }): Observable<any> {
    return this.http.post('/auth/finalize', finalizeDto);
  }
}
