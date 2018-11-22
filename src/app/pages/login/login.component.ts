import { AuthorizationService } from './../../services/authorization.service';

import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators, ValidationErrors,
        FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatSpinner, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  signupPasswordForm: FormGroup;

  constructor (private router: Router,
               private authorizationService: AuthorizationService,
               private snackbar: MatSnackBar) {}

  // Login fields
  loginEmail: string;
  loginPassword: string;

  // Signup fields
  signupEmail: string;
  signupPassword: string;
  signupConfirmPassword: string;

  showSpinner = false;

  toggleSpinner() {
    this.showSpinner = !this.showSpinner;
  }

  login(): void {
    this.toggleSpinner();

    this.authorizationService.login(this.loginEmail, this.loginPassword).subscribe(success => {
      this.toggleSpinner();

      if (!success) {
        this.snackbar.open('Invalid credentials 🤯');
      }
    });
  }

  signup(): void {
    this.toggleSpinner();
    if (this.checkConfirmPassword()) {
      // Sign that BIH up
    } else {
      alert('Passwords do not match.');
    }
    this.toggleSpinner();
  }

  checkConfirmPassword(): boolean {
    return this.signupPassword === this.signupConfirmPassword;
  }
}
