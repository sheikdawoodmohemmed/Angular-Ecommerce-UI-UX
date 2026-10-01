import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public cart = inject(CartService);

  orderPlaced = signal(false);
  paymentMethod = signal<'card' | 'upi' | 'cod'>('card');

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required],
    cardNumber: [''],
  });

  placeOrder() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.orderPlaced.set(true);
    this.cart.clear();
  }

  backToShop() {
    this.router.navigate(['/shop']);
  }
}
