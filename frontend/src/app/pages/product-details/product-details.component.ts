import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfo } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  form: FormGroup;
  currentUser: UserInfo | null = null;
  submitted = false;
  error = false;
  loading = true;
  createReviewLoading = false;
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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private titleService: Title,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.getProduct();
  }
  getProduct() {
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

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const { comment, rating } = this.form.controls;
    this.createReviewLoading = true;
    this.productService
      .createReview(this.product._id, comment.value, rating.value)
      .subscribe(
        (data) => {
          this.getProduct();
          this.createReviewLoading = false;
        },
        (error) => {
          this.snackBar.open(error, '', { panelClass: 'error-snackbar' });
          this.createReviewLoading = false;
        }
      );
  }
}
