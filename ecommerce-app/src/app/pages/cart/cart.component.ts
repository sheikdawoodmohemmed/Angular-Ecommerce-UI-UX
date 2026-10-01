import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  promoCode = signal('');
  promoApplied = signal(false);

  constructor(public cart: CartService) {}

  applyPromo() {
    if (this.promoCode().trim().toUpperCase() === 'PURPLE10') {
      this.promoApplied.set(true);
    }
  }
}
