import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  // encapsulation: ViewEncapsulation.None, //add this line
  styleUrls: ['./shipping-address.component.css'],
})
export class ShippingAddressComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;
  form: FormGroup;
  submitted = false;
  cartService: CartService;
  shippingLocation: { lat: number; lng: number } = { lat: 0, lng: 0 };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    cartService: CartService
  ) {
    this.cartService = cartService;
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cartService.currentCart.subscribe((x) => {
      this.shippingLocation.lat = x.shippingAddress.lat;
      this.shippingLocation.lng = x.shippingAddress.lng;
      this.form.patchValue({ fullName: x.shippingAddress.fullName });
      this.form.patchValue({ address: x.shippingAddress.address });
      this.form.patchValue({ city: x.shippingAddress.city });
      this.form.patchValue({ country: x.shippingAddress.country });
      this.form.patchValue({ postalCode: x.shippingAddress.postalCode });
    });
  }
  chooseLocation() {
    this.router.navigate(['/choose-location']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const { fullName, address, city, country, postalCode } = this.form.controls;
    this.cartService.saveShippingAddress({
      fullName: fullName.value,
      address: address.value,
      city: city.value,
      country: country.value,
      postalCode: postalCode.value,
      lat: 0,
      lng: 0,
    });
    this.router.navigate(['/payment']);
  }
}
