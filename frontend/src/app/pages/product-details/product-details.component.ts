import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Review } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  error = false;
  loading = true;
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
    rating: 0,
    numReviews: 0,
    reviews: [],
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
          this.loading = false;
          this.product = data;
          this.titleService.setTitle(this.product.name);
        },
        (err) => {
          this.error = true;
          this.loading = false;
          this.snackBar.open(err, '', {
            panelClass: 'error-snackbar',
          });
        }
      );
    } else {
      this.error = true;
      this.loading = false;
      this.snackBar.open('Product not found', '', {
        panelClass: 'error-snackbar',
      });
    }
  }
  addToCart() {
    const { _id, image, name, slug, price } = this.product;
    this.cartService
      .add({ _id, image, name, slug, price, quantity: 1 })
      .subscribe(
        (productName) => {
          this.snackBar.open(`${productName} added to the cart`, '', {
            panelClass: 'success-snackbar',
          });
          this.router.navigate(['/cart']);
        },
        (err) => {
          this.snackBar.open(err.message, '', { panelClass: 'error-snackbar' });
        }
      );
  }
}
