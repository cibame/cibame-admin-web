import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../../../../../../../@core/model/user.model';
import {UserService} from '../../../../../../../@core/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('form') form?: NgForm;
  fg: FormGroup;
  isLoading = false;
  user: User | null;

  constructor(formBuilder: FormBuilder,
              private userService: UserService) {
    this.user = userService.user;
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
