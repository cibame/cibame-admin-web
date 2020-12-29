import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {flamingoAnimations} from '../../../../../@flamingo/animations';
import {FlamingoAuthService, StorageMode, TokenType} from '../../../../../@flamingo/service/flamingo-auth.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['../common/scss/layout.scss', './login.component.scss'],
  animations: flamingoAnimations
})
export class LoginComponent implements OnInit {
  fg: FormGroup;
  isLogging = false;

  constructor(private flamingoAuthService: FlamingoAuthService,
              private authService: AuthService,
              private router: Router,
              formBuilder: FormBuilder) {
    this.fg = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    }, {
      updateOn: 'submit'
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.fg.invalid) {
      return;
    }

    this.flamingoAuthService.setAuthorizationToken(
      'asd',
      this.fg.get('rememberMe')?.value ? StorageMode.local : StorageMode.session,
      TokenType.bearer);
    this.router.navigate(['/']);
    return;

    this.isLogging = true;

    this.authService.login({
      username: this.fg.get('email')?.value,
      password: this.fg.get('password')?.value
    })
      .pipe(
        finalize(() => this.isLogging = false)
      )
      .subscribe(res => {
        // Set Authorization Token
        this.flamingoAuthService.setAuthorizationToken(
          res.jwt,
          this.fg.get('rememberMe')?.value ? StorageMode.local : StorageMode.session,
          TokenType.bearer);
        // Navigate to root
        this.router.navigate(['/']);
      }, _ => {
        this.fg.get('password')?.setErrors({invalidLogin: true});
        this.flamingoAuthService.logout();
      });
  }

}
