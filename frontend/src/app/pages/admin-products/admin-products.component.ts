import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-products-history',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  loading = true;
  error = false;
  products: Product[] = [];
  productService: ProductService;
  displayedColumns: string[] = [
    '_id',
    'name',
    'price',
    'category',
    'brand',
    'countInStock',
    'action',
  ];

  constructor(
    private titleService: Title,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    productService: ProductService,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.productService = productService;
  }

  ngOnInit() {
    this.getAdminProducts();
  }

  private getAdminProducts() {
    this.loading = true;
    this.productService.getAdminProducts().subscribe(
      (data: any) => {
        this.products = data;

        this.titleService.setTitle(`Product History`);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = true;
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      }
    );
  }

  createProduct() {
    if (confirm('Are you sure to create product?')) {
      this.productService.createProduct().subscribe(
        (data: any) => {
          this.router.navigate(['/admin/product/' + data._id]);
        },
        (err) => {
          this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
        }
      );
    }
  }
  deleteProduct(productId: string) {
    if (confirm('Are you sure to delete product?')) {
      this.productService.deleteProduct(productId).subscribe(
        (data: any) => {
          this.getAdminProducts();
        },
        (err) => {
          this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
        }
      );
    }
  }
}
