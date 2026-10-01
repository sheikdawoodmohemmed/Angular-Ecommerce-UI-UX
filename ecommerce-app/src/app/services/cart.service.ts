import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();

  readonly count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));

  readonly subtotal = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity * i.product.price, 0)
  );

  readonly shipping = computed(() => (this.subtotal() > 75 || this.subtotal() === 0 ? 0 : 6.99));

  readonly total = computed(() => this.subtotal() + this.shipping());

  add(product: Product, quantity = 1) {
    const existing = this.items().find((i) => i.product.id === product.id);
    if (existing) {
      this.items.update((list) =>
        list.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
      );
    } else {
      this.items.update((list) => [...list, { product, quantity }]);
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.items.update((list) =>
      list.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }

  remove(productId: number) {
    this.items.update((list) => list.filter((i) => i.product.id !== productId));
  }

  clear() {
    this.items.set([]);
  }
}
