import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  currentUser: UserInfo | null = null;
  public payPalConfig?: IPayPalConfig;
  loading = true;
  error = false;
  order!: Order;
  orderService: OrderService;
  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'quantity',
    'subtotal',
  ];

  constructor(
    private titleService: Title,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    orderService: OrderService,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.orderService = orderService;
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    const routeParams = this.route.snapshot.paramMap;
    const orderId = routeParams.get('id');
    if (orderId) {
      this.getOrder(orderId);
    } else {
      this.snackBar.open('Order Not Found', '', {
        panelClass: 'error-snackbar',
      });
    }
  }
  private getOrder(orderId: string) {
    this.orderService.getOrder(orderId).subscribe(
      (data) => {
        this.order = data;
        this.cd.detectChanges();
        this.titleService.setTitle(`Order ${this.order._id}`);
        this.loading = false;
        if (!this.order.isPaid) {
          this.initConfig();
        }
      },
      (err) => {
        this.loading = false;
        this.error = true;
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      }
    );
  }
  deliverOrder() {
    this.orderService.deliver(this.order._id).subscribe(
      (data) => {
        this.getOrder(this.order._id);
        this.snackBar.open('Order delivered successfully', '', {
          panelClass: 'success-snackbar',
        });
      },
      (err) => {
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      }
    );
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.order.totalPrice.toString(),
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        actions.order.get().then((details: any) => {
          const { id, status, update_time, email_address } = details;
          this.orderService
            .pay(this.order._id, { id, status, update_time, email_address })
            .subscribe(
              (data) => {
                this.getOrder(this.order._id);
                this.snackBar.open('Order paid successfully', '', {
                  panelClass: 'success-snackbar',
                });
              },
              (err) => {
                this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
              }
            );
        });
      },
      onCancel: (data, actions) => {
        this.snackBar.open('Payment canceled', '', {
          panelClass: 'error-snackbar',
        });
      },
      onError: (err) => {
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      },
    };
  }
}
