import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { Synonym } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private path = `${environment.apiUrl}/brands`;

  constructor(private http: HttpClient) {}

  get(brandId: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.path}/${brandId}`);
  }

  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.path);
  }

  create(brand: Brand): Observable<any> {
    return this.http.post(this.path, {'name': brand.name});
  }

  delete(brandId: number): Observable<any> {
    return this.http.delete(`${this.path}/${brandId}`);
  }

  update(brand: Brand): Observable<any> {
    return this.http.put(`${this.path}/${brand.id}`, {'name': brand.name});
  }

  getSynonyms(brandId: number): Observable<Synonym[]> {
    return this.http.get<Synonym[]>(`${this.path}/${brandId}/synonyms`);
  }

  createSynonym(brandId: number, synonym: Synonym): Observable<any> {
    return this.http.post(`${this.path}/${brandId}/synonyms`, synonym);
  }

  deleteSynonym(brandId: number, synonym: String): Observable<any> {
    return this.http.delete(`${this.path}/${brandId}/${synonym}`);
  }
}
