import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input() reviewUrl!: [string];
  @Input() rating!: number;
  @Input() numReviews!: number;
  ratings: [string, string, string, string, string] = [
    'star_outline',
    'star_outline',
    'star_outline',
    'star_outline',
    'star_outline',
  ];

  constructor() {}

  ngOnInit() {
    if (this.rating > 4.5) {
      this.ratings = ['star', 'star', 'star', 'star', 'star'];
    } else if (this.rating > 4) {
      this.ratings = ['star', 'star', 'star', 'star', 'star_half'];
    } else if (this.rating > 3.5) {
      this.ratings = ['star', 'star', 'star', 'star', 'star_outline'];
    } else if (this.rating > 3) {
      this.ratings = ['star', 'star', 'star', 'star_half', 'star_outline'];
    } else if (this.rating > 2.5) {
      this.ratings = ['star', 'star', 'star', 'star_outline', 'star_outline'];
    } else if (this.rating > 2) {
      this.ratings = [
        'star',
        'star',
        'star_half',
        'star_outline',
        'star_outline',
      ];
    } else if (this.rating > 1.5) {
      this.ratings = [
        'star',
        'star',
        'star_outline',
        'star_outline',
        'star_outline',
      ];
    } else if (this.rating > 1) {
      this.ratings = [
        'star',
        'star_half',
        'star_outline',
        'star_outline',
        'star_outline',
      ];
    } else if (this.rating > 0.5) {
      this.ratings = [
        'star',
        'star_outline',
        'star_outline',
        'star_outline',
        'star_outline',
      ];
    } else if (this.rating > 0) {
      this.ratings = [
        'star_half',
        'star_outline',
        'star_outline',
        'star_outline',
        'star_outline',
      ];
    }
  }
}
