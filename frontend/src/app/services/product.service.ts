import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products`, {
      responseType: 'json',
    });
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/${productId}`, {
      responseType: 'json',
    });
  }

  getProductBySlug(slug: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/slug/${slug}`, {
      responseType: 'json',
    });
  }
}
