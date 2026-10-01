import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroComponent, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  featured: Product[];
  categories = [
    { name: 'Footwear', emoji: '👟' },
    { name: 'Electronics', emoji: '🎧' },
    { name: 'Accessories', emoji: '👜' },
    { name: 'Apparel', emoji: '👗' },
    { name: 'Beauty', emoji: '🧴' },
  ];

  testimonials = [
    { name: 'Amelia R.', text: 'The quality blew me away and shipping was lightning fast. My new go-to shop.', rating: 5 },
    { name: 'Daniel K.', text: 'Beautiful packaging, even better products. The purple branding is so clean.', rating: 5 },
    { name: 'Priya S.', text: 'Customer support helped me swap sizes in minutes. Genuinely great experience.', rating: 4 },
  ];

  constructor(private productService: ProductService, public cart: CartService) {
    this.featured = this.productService.getFeatured(8);
  }

  onAdd(product: Product) {
    this.cart.add(product);
  }
}
