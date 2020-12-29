import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('form') form?: NgForm;
  fg: FormGroup;
  isLoading = false;

  constructor(formBuilder: FormBuilder) {
    this.fg = formBuilder.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      company: [''],
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
