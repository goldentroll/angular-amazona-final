import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { Item } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loading = true;
  error = false;
  products!: Product[];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Amazona');
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.loading = false;
        this.products = products;
      },
      (err) => {
        this.loading = false;
        this.error = true;
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      }
    );
  }

  addToCart(product: Product) {
    const { _id, image, name, slug, price } = product;
    this.cartService
      .add({ _id, image, name, slug, price, quantity: 1 })
      .subscribe(
        (productName) =>
          this.snackBar.open(`${productName} added to the cart`, '', {
            panelClass: 'success-snackbar',
          }),
        (err) => {
          this.snackBar.open(err.message, '', { panelClass: 'error-snackbar' });
        }
      );
  }
}
