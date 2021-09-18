import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, ProductFilter } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAdminProducts() {
    return this.http.get(`${environment.apiUrl}/api/products`, {
      responseType: 'json',
    });
  }
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products`, {
      responseType: 'json',
    });
  }

  createProduct(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/products`, {
      responseType: 'json',
    });
  }

  createReview(
    productId: string,
    comment: string,
    rating: number
  ): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/products/${productId}/reviews`,
      { comment, rating },
      {
        responseType: 'json',
      }
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/products/${productId}`, {
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
  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(`${environment.apiUrl}/api/uploads`, formData);
  }

  update(product: Product) {
    return this.http.put<Product>(
      `${environment.apiUrl}/api/products/${product._id}`,
      product
    );
  }
}
