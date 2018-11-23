import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  showSpinner = false;

  email: string;
  password: string;
  passwordConfirm: string;

  constructor(private authorizationService: AuthorizationService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  signup(): void {
    this.toggleSpinner();
    if (this.isEmailInvalid && this.isPasswordInvalid && this.isPasswordConfirmInvalid) {
      this.snackbar.open('Please correct your signup information.');
      return;
    }

    // Sign the dude up
    this.snackbar.open('Signed up ${email}.');
    this.toggleSpinner();
  }

  isEmailInvalid(): boolean {
    return (this.email == null || this.email === ' ');
  }

  isPasswordInvalid(): boolean {
    return this.password == null || this.password.length < 8;
  }

  isPasswordConfirmInvalid(): boolean {
    return this.passwordConfirm == null || !this.isPasswordConfirmSame();
  }

  isPasswordConfirmSame(): boolean {
    return this.password === this.passwordConfirm;
  }

  toggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

}
