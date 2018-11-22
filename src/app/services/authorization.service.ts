import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private path = `${environment.apiUrl}/authorization`;
  // private loggedIn = new BehaviorSubject<boolean>(this.getIsLoggedIn());

  constructor(private http: HttpClient) {}

  login(email: String, password: String): boolean {
    this.http.post(`${this.path}/login`, {email, password}).subscribe(data => {
      console.log(data);

      return true;
    }, error => {
      console.log(error);
    });

    return false;
  }
}
