import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginDto} from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(dto: LoginDto): Observable<any> {
    return this.http.post('/account/login', dto);
  }

  registerAccount(dto: Account): Observable<any> {
    return this.http.post('/account/login', dto);
  }

  getAccount(): Observable<any> {
    return this.http.get('/account/login');
  }

  resetEmail(email: string): Observable<any> {
    return this.http.post('/account/reset', {email});
  }

  checkCode(codeDto: { email: string, code: string }): Observable<any> {
    return this.http.post('/account/check-code', codeDto);
  }

  finalize(finalizeDto: { email: string, code: string, password: string }): Observable<any> {
    return this.http.post('/account/finalize', finalizeDto);
  }
}
