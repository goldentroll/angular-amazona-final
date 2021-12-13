import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.component.html',
  styleUrls: ['./choose-location.component.css'],
})
export class ChooseLocationComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  loading = true;
  center: google.maps.LatLngLiteral = { lat: 45.5017, lng: 73.5673 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  idle() {
    this.center = this.map?.getCenter()?.toJSON() ?? {
      lat: 45.5017,
      lng: 73.5673,
    };
  }
  confirm() {
    this.cartService.saveShippingLocation(this.center.lat, this.center.lng);
    this.router.navigate(['/shipping']);
  }
  ngOnInit(): void {
    this.httpClient.get(`${environment.apiUrl}/api/config/google`).subscribe(
      (data: any) => {
        this.httpClient
          .jsonp(
            `https://maps.googleapis.com/maps/api/js?key=${data.key}`,
            'callback'
          )
          .subscribe(
            (m) => {
              this.loading = false;
              navigator.geolocation.getCurrentPosition((position) => {
                this.center = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
              });
            },
            (err) => {
              this.loading = false;
              this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
            }
          );
      },
      (err) => {
        this.snackBar.open(err, '', {
          panelClass: 'error-snackbar',
        });
      }
    );
  }
}
