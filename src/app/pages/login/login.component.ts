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

export class LoginComponent {

  signupPasswordForm: FormGroup;

  constructor(private router: Router,
    private authorizationService: AuthorizationService,
    private snackbar: MatSnackBar) { }
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  
  hide = true;
  showSpinner = false;

  toggleSpinner() {
    this.showSpinner = !this.showSpinner;
  }

  onSubmit() {
    this.toggleSpinner();
    const formData = this.loginForm.value
    this.authorizationService.login(formData['email'], formData['password'])
      .subscribe(
        () => console.log('Succeded'),
        () => {
          setTimeout(() => {
            this.toggleSpinner();
            this.loginForm.setErrors({
              Invalid: true
            });
            this.snackbar.open('Invalid credentials 🤯');
          }, 1000)
        },
      );
  }
}
