export interface Item {
  _id: string;
  image: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
}
export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
}
export interface Cart {
  items: Item[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsCount: number;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}
