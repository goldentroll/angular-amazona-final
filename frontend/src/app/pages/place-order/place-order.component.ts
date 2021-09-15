import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Title } from '@angular/platform-browser';
import { Cart, Item } from 'src/app/models/cart';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/services/order.service';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  loadingPlaceOrder = false;
  cart!: Cart;
  cartService: CartService;
  orderService: OrderService;
  stepperOrientation: Observable<StepperOrientation>;

  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'quantity',
    'subtotal',
  ];
  error: string = '';

  constructor(
    private titleService: Title,
    private router: Router,
    private snackBar: MatSnackBar,
    cartService: CartService,
    orderService: OrderService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.cartService = cartService;
    this.orderService = orderService;
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.titleService.setTitle('Shopping Cart');
    this.cartService.currentCart.subscribe((x) => (this.cart = x));
  }
  goPayment() {
    this.router.navigate(['/payment']);
  }
  goShipping() {
    this.router.navigate(['/shipping']);
  }
  placeOrder() {
    // place order
    this.loadingPlaceOrder = true;
    this.orderService.create(this.cart).subscribe(
      (order) => {
        this.snackBar.open('Order placed successfully.', '', {
          panelClass: 'success-snackbar',
        });
        this.loadingPlaceOrder = false;
        this.cartService.clearItems();
        this.router.navigate([`/order/${order._id}`]);
      },
      (err) => {
        this.loadingPlaceOrder = false;
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      }
    );
  }

  add(item: Item) {
    this.cartService.add(item).subscribe(
      (productName) =>
        this.snackBar.open(`${productName} added to the cart`, '', {
          panelClass: 'success-snackbar',
        }),
      (err) => {
        this.snackBar.open(err.message, '', { panelClass: 'error-snackbar' });
      }
    );
  }

  remove(item: Item) {
    this.snackBar.dismiss();
    this.cartService.remove(item._id);
  }
}
