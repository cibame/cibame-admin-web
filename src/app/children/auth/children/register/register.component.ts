import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {flamingoAnimations} from '../../../../../@flamingo/animations';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['../common/scss/layout.scss', './register.component.scss'],
  animations: flamingoAnimations
})
export class RegisterComponent implements OnInit {
  fg: FormGroup;
  loading = false;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              formBuilder: FormBuilder) {
    this.fg = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9\\-\\+]{9,15}$')]],
      acceptance: [false, Validators.requiredTrue]
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

    this.loading = true;

    this.authService.registerAccount(this.fg.getRawValue())
      .subscribe(_ => {
        this.router.navigate(['set-password'], {
          queryParams: {email: this.fg.get('email')?.value},
          relativeTo: this.activatedRoute.parent
        });
      }, err => {
        if (err.status === 403) {
          this.fg.get('email')?.setErrors({forbidden: true});
        }
        this.loading = false;
      });
  }

}
