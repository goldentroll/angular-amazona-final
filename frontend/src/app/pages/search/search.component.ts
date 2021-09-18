import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  category = '';
  name = '';
  loading = true;
  error = false;
  products!: Product[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private cartService: CartService,
    private titleService: Title
  ) {
    route.queryParams.subscribe((p) => {
      this.category = p.category || '';
      this.name = p.name || '';
      this.searchProducts();
    });

    this.titleService.setTitle('Amazona');
  }

  ngOnInit() {}
  searchProducts() {
    this.productService
      .searchProducts({ category: this.category, name: this.name })
      .subscribe(
        (products: Product[]) => {
          this.loading = false;
          this.products = products;
          this.cd.detectChanges();
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
