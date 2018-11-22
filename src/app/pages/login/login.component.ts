
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSpinner} from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor (private router: Router) { }

  email: string;
  password: string;

  showSpinner = false;
  ngOnInit() {}
  toggleSpinner() {
    this.showSpinner = !this.showSpinner;
  }

  async login() : Promise<void> {
    this.toggleSpinner();
    await sleep(5000);
    if(this.email == 'admin' && this.password == 'admin'){
    this.router.navigate(["home"]);
    } else {
      alert("Invalid credentials");
    }

    this.toggleSpinner()
  }
}


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }