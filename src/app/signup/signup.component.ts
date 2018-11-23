import { AccountService } from './../services/account.service';
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

  constructor(private accountService: AccountService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  signUp(): void {
    if (this.isEmailInvalid && this.isPasswordInvalid && this.isPasswordConfirmInvalid) {
      this.snackbar.open('Please correct your signup information.');

      return;
    }

    this.toggleSpinner();
    this.accountService.create(this.email, this.password, 'Anders', 'Jakobsen').subscribe(result => {
      this.toggleSpinner();

      this.snackbar.open('Signed up ${email}.');
    }, error => {
      this.toggleSpinner();

      console.log(error);
    });
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
