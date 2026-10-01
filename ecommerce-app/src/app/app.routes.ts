import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Purple Cart | Home',
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.component').then((m) => m.ShopComponent),
    title: 'Purple Cart | Shop',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
    title: 'Purple Cart | Product',
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then((m) => m.CartComponent),
    title: 'Purple Cart | Your Cart',
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'Purple Cart | Checkout',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    title: 'Purple Cart | Login',
  },
  { path: '**', redirectTo: '' },
];
