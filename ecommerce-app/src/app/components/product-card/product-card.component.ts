import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  wishlisted = signal(false);
  justAdded = signal(false);

  toggleWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.wishlisted.update((v) => !v);
  }

  onAdd(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.product);
    this.justAdded.set(true);
    setTimeout(() => this.justAdded.set(false), 1400);
  }

  stars(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
