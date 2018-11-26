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

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  showSpinner = false;

  toggleSpinner() {
    this.showSpinner = !this.showSpinner;
  }

  login(): void {
    this.toggleSpinner();

    this.authorizationService.login(this.email.value, this.password.value)
      .subscribe(
        () => console.log('Succeded'),
        () => this.snackbar.open('Invalid credentials 🤯'),
        () => console.log('Completed')
      );
  }
}
