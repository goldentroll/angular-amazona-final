import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from './models';
import { AuthenticationService } from './services/authentication.service';
import { CartService } from './services/cart.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ProductService } from './services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  categories: [] = [];
  searchForm: FormGroup;
  title = 'Amazona';
  itemsCount: number = 0;
  currentUser: UserInfo | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private productService: ProductService
  ) {
    this.searchForm = this.formBuilder.group({
      name: [''],
    });
  }
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.cartService.currentCart.subscribe(
      (x) => (this.itemsCount = x.itemsCount)
    );
    this.productService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }
  onSubmit() {
    this.router.navigate(['/search'], {
      queryParams: { name: this.searchForm.controls.name.value },
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
