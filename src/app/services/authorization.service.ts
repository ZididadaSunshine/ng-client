import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private path = `${environment.apiUrl}/authorization`;
  private loggedIn = new BehaviorSubject<boolean>(this.getIsLoggedIn());

  constructor(private http: HttpClient) {}

  login(email: String, password: String) {
    return this.http.post(`${this.path}/login`, { email, password })
    .pipe(
      tap(response => {
        this.setSession(response);
        this.loggedIn.next(true);
      }),
      shareReplay()
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');

    this.loggedIn.next(false);

    return this.http.get(`${this.path}/logout`);
  }

  setSession(result: any): void {
    localStorage.setItem('token', result.token);
    localStorage.setItem('expires', JSON.stringify(result.expires));

    this.loggedIn.next(this.getIsLoggedIn());
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getIsLoggedIn(): boolean {
    const expiration = localStorage.getItem('expires');
    if (!expiration) {
      return false;
    } else {
      return new Date().getTime() < Number(expiration);
    }
  }
}
