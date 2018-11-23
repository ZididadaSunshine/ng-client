import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private path = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) {}

  create(email: String, password: String, firstName: String, lastName: String): Observable<any> {
    return this.http.post(`${this.path}`, {email, password, firstName, lastName});
  }
}
