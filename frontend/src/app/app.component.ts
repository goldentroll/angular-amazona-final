import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from './models';
import { AuthenticationService } from './services/authentication.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Amazona';
  itemsCount: number = 0;
  currentUser: UserInfo | null = null;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.cartService.currentCart.subscribe(
      (x) => (this.itemsCount = x.itemsCount)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
