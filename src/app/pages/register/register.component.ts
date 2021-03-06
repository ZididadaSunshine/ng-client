import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AccountService } from '../../services/';
import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  spinner = false;
  registerForm: FormGroup;

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get cpassword() { return this.registerForm.get('cpassword'); }

  constructor(
    private accountService: AccountService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required]),
    }, { validators: [this.checkPasswords] });

    this.cpassword.setErrors({ foo: true });
    this.cpassword.setErrors({ bar: true });
    console.log(Object.keys(this.cpassword.errors));
  }

  onSubmit() {
    this.toggleSpinner();
    const formData = this.registerForm.value;
    this.accountService.create(formData['email'], formData['password'], formData['username'])
      .subscribe(
        () => this.router.navigate(['/login']),
        () => {
          setTimeout(() => {
            this.toggleSpinner();
            this.snackbar.open('Something went wrong 🤯');
          }, 1000);
        }
      )
  }

  toggleSpinner() {
    this.spinner = !this.spinner;
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password');
    const cpassword = group.get('cpassword');
    const error = { matchPassword: true };

    if (password.value !== cpassword.value) {
      cpassword.setErrors(error);
    }

    return password && cpassword && password.value !== cpassword.value ? error : null;
  }
}
