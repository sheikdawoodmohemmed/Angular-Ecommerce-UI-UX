export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  colors?: string[];
  badge?: 'new' | 'sale';
  description: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
