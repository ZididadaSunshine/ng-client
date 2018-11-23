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

  constructor(private formBuilder: FormBuilder,
              private authorizationService: AuthorizationService,
              private snackbar: MatSnackBar) {
                this.signupForm = this.formBuilder.group({
                  email : ['', Validators.required],
                  password : ['', [Validators.required, Validators.minLength(8)]],
                  passwordConfirm : ['', Validators.required]
                });
              }

  ngOnInit() {
  }

  signup(): void {
    if (this.isEmailInvalid && this.isPasswordInvalid && this.isPasswordConfirmInvalid) {
      this.snackbar.open('Please correct your signup information.');
      return;
    }

    // Sign the dude up
    this.snackbar.open('Signed up ${email}.');
  }

  isEmailInvalid(): boolean {
    return this.signupForm.controls.email.errors.required;
  }

  isPasswordInvalid(): boolean {
    return this.signupForm.controls.password.errors.requried || this.signupForm.controls.password.errors.minLength(8);
  }

  isPasswordConfirmInvalid(): boolean {
    return this.signupForm.controls.passwordConfirm.errors.required || !this.isPasswordConfirmSame();
  }

  isPasswordConfirmSame(): boolean {
    return this.password === this.passwordConfirm;
  }

  toggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

}
