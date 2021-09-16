import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductFilter } from '../models/product';

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

  searchProducts(productFilter: ProductFilter): Observable<any> {
    let qs = '';
    if (productFilter.category) {
      qs += `category=${productFilter.category}&`;
    }
    if (productFilter.name) {
      qs += `name=${productFilter.name}&`;
    }
    return this.http.get(`${environment.apiUrl}/api/products?${qs}`, {
      responseType: 'json',
    });
  }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/categories`, {
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
