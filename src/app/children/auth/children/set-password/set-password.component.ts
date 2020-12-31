import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {UserService} from '../../../../../@core/service/user.service';
import {flamingoAnimations} from '../../../../../@flamingo/animations';
import {FlamingoAuthService, StorageMode, TokenType} from '../../../../../@flamingo/service/flamingo-auth.service';
import {FlamingoMessageService} from '../../../../../@flamingo/service/flamingo-message.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-auth-forgot-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['../common/scss/layout.scss'],
  animations: [flamingoAnimations]
})
export class SetPasswordComponent implements OnInit {
  fg: FormGroup;
  SetPasswordState = SetPasswordState;
  state: SetPasswordState;
  loading = false;

  constructor(private flamingoAuthService: FlamingoAuthService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private messageService: FlamingoMessageService,
              private activatedRoute: ActivatedRoute) {
    this.state = this.activatedRoute.snapshot.queryParamMap.get('email') ? SetPasswordState.code : SetPasswordState.email;

    this.fg = this.formBuilder.group({
      email: [this.activatedRoute.snapshot.queryParamMap.get('email'), [Validators.required, Validators.email]],
      code: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
    }, {
      updateOn: 'submit',
      validators: confirmPasswordValidator
    });

    this.router.navigate(
      ['.'],
      {relativeTo: this.activatedRoute, queryParams: {}}
    );
  }

  ngOnInit(): void {

  }

  sendEmailForm(): void {
    if (this.fg.get('email')?.valid) {
      this.loading = true;

      this.authService.resetEmail(this.fg.get('email')?.value)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe(_ => {
          this.state = SetPasswordState.code;
        }, _ => {
          this.state = SetPasswordState.code;
        });
    }
  }

  sendCodeForm(): void {
    if (this.fg.get('email')?.valid && this.fg.get('code')?.valid) {
      this.loading = true;

      this.authService.checkCode({
        email: this.fg.get('email')?.value,
        code: this.fg.get('code')?.value
      })
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe(_ => {
          this.state = SetPasswordState.password;
        }, _ => {
          this.fg.get('code')?.setErrors({notFound: true});
        });
    }
  }

  sendPasswordForm(): void {
    if (this.fg.valid) {
      this.loading = true;

      this.authService.finalize(this.fg.getRawValue())
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe(res => {
            // Set Authorization Token
            this.flamingoAuthService.setAuthorizationToken(
              res.jwt,
              StorageMode.session,
              TokenType.bearer);
            this.userService.fetchUser().subscribe(
              _ => this.router.navigate(['/']),
              err => {
                console.error(err);
                this.messageService.showMessage(err.message);
                this.flamingoAuthService.logout();
              }
            );
          }
        );
    }
  }

}

enum SetPasswordState {
  email,
  code,
  password
}

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return {passwordsNotMatching: true};
};
