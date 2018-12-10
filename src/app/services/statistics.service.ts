import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private path = `${environment.apiUrl}/statistics`;

  constructor(private http: HttpClient) {}

  get(from: string, to: string, granularity: string, brandId: number): Observable<any> {
    return this.http.post(`${this.path}`, {from, to, granularity, 'brand_id': brandId});
  }
}
