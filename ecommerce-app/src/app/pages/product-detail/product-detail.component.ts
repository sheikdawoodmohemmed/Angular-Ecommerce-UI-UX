import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product?: Product;
  related: Product[] = [];
  quantity = signal(1);
  activeTab = signal<'description' | 'reviews'>('description');
  selectedColor = signal(0);
  justAdded = signal(false);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public cart: CartService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getById(id);
    if (this.product) {
      this.related = this.productService.getRelated(this.product);
    }
  }

  changeQty(delta: number) {
    this.quantity.update((q) => Math.max(1, q + delta));
  }

  addToCart() {
    if (!this.product) return;
    this.cart.add(this.product, this.quantity());
    this.justAdded.set(true);
    setTimeout(() => this.justAdded.set(false), 1600);
  }

  onRelatedAdd(product: Product) {
    this.cart.add(product);
  }

  stars(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
