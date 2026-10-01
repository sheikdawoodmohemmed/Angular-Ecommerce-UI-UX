import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  mobileOpen = signal(false);
  searchOpen = signal(false);

  constructor(public cart: CartService) {}

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }

  toggleSearch() {
    this.searchOpen.update((v) => !v);
  }
}
