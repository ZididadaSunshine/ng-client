import { AuthorizationService } from './../../services/authorization.service';

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSpinner} from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor (private router: Router,
               private authorizationService: AuthorizationService) { }

  email: string;
  password: string;

  showSpinner = false;

  toggleSpinner() {
    this.showSpinner = !this.showSpinner;
  }

  login(): void {
    this.toggleSpinner();

    if (this.authorizationService.login(this.email, this.password)) {
      this.router.navigate(['home']);
    } else {
      alert('Invalid credentials');
    }

    this.toggleSpinner();
  }
}
