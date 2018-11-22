import { AuthorizationService } from './../../services/authorization.service';

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSpinner, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor (private router: Router,
               private authorizationService: AuthorizationService,
               private snackbar: MatSnackBar) { }

  email: string;
  password: string;

  showSpinner = false;

  toggleSpinner() {
    this.showSpinner = !this.showSpinner;
  }

  login(): void {
    this.toggleSpinner();

    this.authorizationService.login(this.email, this.password).subscribe(success => {
      this.toggleSpinner();

      if (!success) {
        this.snackbar.open('Invalid credentials 🤯');
      }
    });
  }
}
