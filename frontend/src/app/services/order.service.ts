import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { CartService } from './cart.service';
import { Order, PaymentResult } from '../models/order';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient, private cartService: CartService) {}

  create(cart: Cart): Observable<Order> {
    return this.http.post<Order>(
      `${environment.apiUrl}/api/orders`,
      cart,
      httpOptions
    );
  }

  pay(orderId: string, paymentResult: PaymentResult): Observable<Order> {
    return this.http.put<Order>(
      `${environment.apiUrl}/api/orders/${orderId}/pay`,
      paymentResult,
      httpOptions
    );
  }

  deliver(orderId: string): Observable<Order> {
    return this.http.put<Order>(
      `${environment.apiUrl}/api/orders/${orderId}/deliver`,
      {},
      httpOptions
    );
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(
      `${environment.apiUrl}/api/orders/${orderId}`,
      httpOptions
    );
  }

  getAdminOrders(): Observable<Order> {
    return this.http.get<Order>(
      `${environment.apiUrl}/api/orders`,
      httpOptions
    );
  }

  getOrderSummary(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/orders/summary`,
      httpOptions
    );
  }

  getOrderHisoty(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${environment.apiUrl}/api/orders/hisotry`,
      httpOptions
    );
  }
}
