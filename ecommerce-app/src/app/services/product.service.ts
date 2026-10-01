import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

const EMOJI = ['👟', '🎧', '👜', '⌚', '👗', '🕶️', '📷', '💻', '🧴', '🧢', '🩴', '🎒'];

function makeProducts(): Product[] {
  const categories = ['Footwear', 'Electronics', 'Accessories', 'Apparel', 'Beauty'];
  const names: Record<string, string[]> = {
    Footwear: ['Nova Runner Sneakers', 'Urban Street Boots', 'Velocity Trail Shoes', 'Classic Canvas Low-Tops'],
    Electronics: ['AuraSound Wireless Headphones', 'PulseBand Smartwatch', 'ClickShot Mini Camera', 'AirLight Ultrabook'],
    Accessories: ['Luxe Woven Tote Bag', 'Horizon Aviator Sunglasses', 'Orbit Leather Backpack', 'Mono Chain Wallet'],
    Apparel: ['Dreamline Wrap Dress', 'Mono Oversized Hoodie', 'Linen Breeze Shirt', 'Cloud Knit Sweater'],
    Beauty: ['Velvet Glow Serum', 'Bloom Botanical Mist', 'Silk Matte Lip Set', 'Pure Radiance Cream'],
  };
  let id = 1;
  const products: Product[] = [];
  categories.forEach((cat, ci) => {
    names[cat].forEach((name, ni) => {
      const price = 29 + ((id * 17) % 180) + 0.99;
      const hasSale = (id + ci) % 3 === 0;
      products.push({
        id: id,
        name,
        category: cat,
        price: hasSale ? Math.round(price * 0.78 * 100) / 100 : Math.round(price * 100) / 100,
        oldPrice: hasSale ? Math.round(price * 100) / 100 : undefined,
        rating: Math.round((3.6 + ((id * 7) % 14) / 10) * 10) / 10,
        reviews: 12 + ((id * 31) % 480),
        image: EMOJI[id % EMOJI.length],
        colors: ['#9333ea', '#1e1b2e', '#ec4899', '#fbbf24'].slice(0, 2 + (id % 3)),
        badge: hasSale ? 'sale' : ni === 0 ? 'new' : undefined,
        description:
          `The ${name} blends premium materials with everyday comfort. Thoughtfully designed in our studio, ` +
          `it pairs a refined silhouette with durable craftsmanship — made to be worn, used, and loved daily.`,
        stock: 4 + ((id * 13) % 40),
      });
      id++;
    });
  });
  return products;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products = signal<Product[]>(makeProducts());

  readonly all = this.products.asReadonly();

  readonly categories = ['All', 'Footwear', 'Electronics', 'Accessories', 'Apparel', 'Beauty'];

  getById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  getFeatured(count = 8): Product[] {
    return this.products().slice(0, count);
  }

  getRelated(product: Product, count = 4): Product[] {
    return this.products()
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, count);
  }

  search(term: string, category: string, sort: string, maxPrice: number): Product[] {
    let list = this.products();
    if (category && category !== 'All') {
      list = list.filter((p) => p.category === category);
    }
    if (term) {
      const t = term.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(t));
    }
    list = list.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }
}
