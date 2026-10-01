import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  categories: string[];
  selectedCategory = signal('All');
  sort = signal('featured');
  maxPrice = signal(250);
  searchTerm = signal('');
  gridView = signal(true);

  results = computed(() =>
    this.productService.search(this.searchTerm(), this.selectedCategory(), this.sort(), this.maxPrice())
  );

  constructor(private productService: ProductService, public cart: CartService) {
    this.categories = this.productService.categories;
  }

  onAdd(product: Product) {
    this.cart.add(product);
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }
}
