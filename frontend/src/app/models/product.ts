export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  description: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: any[];
}

export interface ProductFilter {
  category: string;
  name: string;
}
