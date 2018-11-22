import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private path = `${environment.apiUrl}/authorization`;
  // private loggedIn = new BehaviorSubject<boolean>(this.getIsLoggedIn());

  constructor(private http: HttpClient) {}

  login(email: String, password: String): Observable<Boolean> {
    const subscription = new Subject<Boolean>();

    this.http.post(`${this.path}/login`, {email, password}).subscribe(data => {
      this.setSession(data.token);

      subscription.next(this.getIsLoggedIn());
    }, error => {
      subscription.next(false);
    });

    return subscription;
  }

  setSession(token: String): void {
    const decoded = jwt_decode(token);
    console.log(decoded);
  }

  getIsLoggedIn(): Boolean {
    return true;
  }
}
