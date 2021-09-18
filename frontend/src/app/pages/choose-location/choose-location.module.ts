import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { ChooseLocationRoutingModule } from './choose-location-routing.module';
import { ChooseLocationComponent } from './choose-location.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ChooseLocationComponent],
  imports: [
    CommonModule,
    ChooseLocationRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500 },
    },
  ],
})
export class ChooseLocationModule {}
