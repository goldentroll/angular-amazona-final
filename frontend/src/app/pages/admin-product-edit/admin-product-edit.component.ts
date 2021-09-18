import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css'],
})
export class AdminProductEditComponent implements OnInit {
  form: FormGroup;
  product: Product = {
    _id: '',
    name: '',
    slug: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    description: '',
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    reviews: [],
  };
  uploadLoading = false;
  loading = false;
  error = false;

  submitted = false;
  returnUrl: string;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      countInStock: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productId = routeParams.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe(
        (product: Product) => {
          this.product = product;
          this.loading = false;
          this.form.patchValue({ name: product.name });
          this.form.patchValue({ slug: product.slug });
          this.form.patchValue({ price: product.price });
          this.form.patchValue({ image: product.image });
          this.form.patchValue({ category: product.category });
          this.form.patchValue({ brand: product.brand });
          this.form.patchValue({ description: product.description });
          this.form.patchValue({ countInStock: product.countInStock });
          this.titleService.setTitle(`Admin Edit Product ${product._id}`);
        },
        (err: any) => {
          this.error = true;
          this.snackBar.open(err, '', {
            panelClass: 'error-snackbar',
          });
        }
      );
    } else {
      this.snackBar.open('Product Not Found', '', {
        panelClass: 'error-snackbar',
      });
    }
  }
  uploadImage(event: any) {
    const file: File = event.target.files[0];
    this.uploadLoading = true;
    this.productService.postFile(file).subscribe(
      (data) => {
        this.uploadLoading = false;
        this.form.patchValue({ image: data.secure_url });
        this.snackBar.open('Image uploaded successfully', '', {
          panelClass: 'success-snackbar',
        });
      },
      (err) => {
        this.uploadLoading = false;
        this.snackBar.open(err, '', {
          panelClass: 'error-snackbar',
        });
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const {
      name,
      slug,
      price,
      image,
      category,
      brand,
      countInStock,
      description,
    } = this.form.controls;
    this.loading = true;
    this.productService
      .update({
        _id: this.product._id,
        name: name.value,
        slug: slug.value,
        price: price.value,
        image: image.value,
        category: category.value,
        brand: brand.value,
        countInStock: countInStock.value,
        description: description.value,
        rating: this.product.rating,
        numReviews: this.product.numReviews,
        reviews: [],
      })
      .subscribe(
        () => {
          this.snackBar.open('Product updated successfully', '', {
            panelClass: 'success-snackbar',
          });
          this.loading = false;
          this.router.navigate(['/admin/products']);
        },
        (err: any) => {
          this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
          this.loading = false;
        }
      );
  }
}
