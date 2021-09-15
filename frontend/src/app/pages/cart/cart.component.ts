import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Cart, Item } from '../../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Shopping Cart');
    this.cartService.currentCart.subscribe((x) => (this.cart = x));
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
  checkout() {
    if (this.cart.itemsCount === 0) {
      this.snackBar.open('Cart is empty', '', { panelClass: 'error-snackbar' });
      return;
    }
    this.router.navigate(['/shipping']);
  }
}
