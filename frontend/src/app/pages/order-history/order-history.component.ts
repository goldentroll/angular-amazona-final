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
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  loading = true;
  error = false;
  orders: Order[] = [];
  orderService: OrderService;
  displayedColumns: string[] = [
    '_id',
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
    this.getOrderHisoty();
  }

  private getOrderHisoty() {
    this.loading = true;
    this.orderService.getOrderHisoty().subscribe(
      (data) => {
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
