import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

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
      subscription.next(true);
    }, error => {
      subscription.next(false);
    });

    return subscription;
  }
}
