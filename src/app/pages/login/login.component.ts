import { AuthorizationService } from './../../services/authorization.service';

import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl, FormGroupDirective, NgForm, Validators, ValidationErrors,
  FormGroup, FormBuilder, ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatSpinner, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  hide = true;
  spinner = false;

  constructor(private router: Router,
    private authorizationService: AuthorizationService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  toggleSpinner() {
    this.spinner = !this.spinner;
  }

  onSubmit() {
    this.toggleSpinner();
    const formData = this.loginForm.value;
    this.authorizationService.login(formData['email'], formData['password'])
      .subscribe(
        () => this.router.navigate(['']),
        () => {
          setTimeout(() => {
            this.toggleSpinner();
            this.loginForm.setErrors({
              'incorrect': true
            });
            this.snackbar.open('Invalid credentials 🤯');
          }, 1000)
        },
      );
  }
}
