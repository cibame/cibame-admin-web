import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MustMatch} from '../../../../../../../@flamingo/validator/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('form') form?: NgForm;
  fg: FormGroup;
  isLoading = false;

  constructor(formBuilder: FormBuilder) {
    this.fg = formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, MustMatch('password')]],
      oldPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.fg.invalid) {
      return;
    }

    this.form?.resetForm();
  }

  onCancel(): void {
    this.form?.resetForm();
  }
}
