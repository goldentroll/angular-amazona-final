import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { ShippingAddressComponent } from './pages/shipping-address/shipping-address.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { OrderComponent } from './pages/order/order.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'shipping',
    component: ShippingAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    component: PaymentMethodComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'place-order',
    component: PlaceOrderComponent,
    canActivate: [AuthGuard],
  },
  { path: 'order/:id', canActivate: [AuthGuard], component: OrderComponent },
  { path: 'product/:slug', component: ProductDetailsComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
