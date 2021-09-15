import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

import { Cart } from '../../models/cart';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  error: string = '';
  product: Product = {
    _id: '',
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    description: '',
    countInStock: 0,
    slug: '',
  };
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const slug = routeParams.get('slug');
    if (slug) {
      this.productService.getProductBySlug(slug).subscribe(
        (data) => {
          this.product = data;
          this.titleService.setTitle(this.product.name);
        },
        (err) => {
          this.error = err.message;
        }
      );
    } else {
      this.error = 'Product not found';
    }
  }
  addToCart() {
    const { _id, image, name, slug, price } = this.product;
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
    this.router.navigate(['/cart']);
  }
}
