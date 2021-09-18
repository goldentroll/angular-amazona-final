import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/models';

@Component({
  selector: 'app-admin-orders-history',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  loading = true;
  error = false;
  orders: Order[] = [];
  orderService: OrderService;
  displayedColumns: string[] = [
    '_id',
    'user',
    'createdAt',
    'totalPrice',
    'isPaid',
    'isDelivered',
    'action',
  ];

  constructor(
    private titleService: Title,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    orderService: OrderService,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.orderService = orderService;
  }

  ngOnInit() {
    this.getAdminOrders();
  }

  private getAdminOrders() {
    this.loading = true;
    this.orderService.getAdminOrders().subscribe(
      (data: any) => {
        this.orders = data;

        this.titleService.setTitle(`Order History`);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = true;
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      }
    );
  }
}
