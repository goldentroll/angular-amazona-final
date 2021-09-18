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
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminGuard } from './helpers/admin.guard';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminProductEditComponent } from './pages/admin-product-edit/admin-product-edit.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminUserEditComponent } from './pages/admin-user-edit/admin-user-edit.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
  },
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
  {
    path: 'admin/dashboard',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./pages/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/product/:id',
    component: AdminProductEditComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/user/:id',
    component: AdminUserEditComponent,
    canActivate: [AdminGuard],
  },
  { path: 'product/:slug', component: ProductDetailsComponent },
  { path: '', component: HomeComponent },
  { path: 'choose-location', loadChildren: () => import('./pages/choose-location/choose-location.module').then(m => m.ChooseLocationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
