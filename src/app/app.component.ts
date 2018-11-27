import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  isLoggedIn: boolean;

  constructor(private authorizationService: AuthorizationService) { 
  }
  
  ngOnInit(): void {
    this.authorizationService.isLoggedIn.subscribe(res => this.isLoggedIn = res)
  }

  

}
