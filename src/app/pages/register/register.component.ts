import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AccountService } from '../../services/'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  spinner = false;
  registerForm: FormGroup;

  get firstname() { return this.registerForm.get('firstname') }
  get lastname() { return this.registerForm.get('lastname') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get cpassword() { return this.registerForm.get('cpassword') }

  constructor(
    private accountService: AccountService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
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
        () => console.log('Succeded'),
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

    if (password.value != cpassword.value) cpassword.setErrors(error);

    return password && cpassword && password.value != cpassword.value ? error : null;
  }
}
