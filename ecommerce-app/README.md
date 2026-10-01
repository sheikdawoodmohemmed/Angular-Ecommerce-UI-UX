# PurpleCart — Angular Ecommerce UI/UX

A complete, fully-wired Angular 17 (standalone components + signals) ecommerce
front-end with a cohesive purple design system, distinct UI per page, and
realistic interactions — add to cart, wishlist, filtering/sorting, checkout
form, and a working cart/order flow (all client-side, mock data).

## Pages
- **Home** — hero banner, category grid, featured products, promo banner, testimonials, newsletter
- **Shop** — sidebar filters (category, price range, search) + sort + responsive product grid
- **Product Detail** — gallery, color swatches, quantity stepper, tabs (description/reviews), related products
- **Cart** — quantity editing, promo code (`PURPLE10`), live totals
- **Checkout** — reactive form, payment method selector, order confirmation screen
- **Login / Register** — tabbed auth card

## Tech
- Angular 17, standalone components (no NgModules)
- Signals for state (`CartService`, filters in `ShopComponent`)
- Lazy-loaded routes (`loadComponent`)
- SCSS with CSS custom properties for the purple theme (`src/styles.scss`)
- Reactive Forms for checkout

## Getting started

```bash
npm install
npm start      # ng serve, then open http://localhost:4200
```

To build for production:

```bash
npm run build
```

## Customizing the theme
All colors, radii and shadows live as CSS variables at the top of
`src/styles.scss` under `:root`. Change `--purple-600`, `--accent-pink`, etc.
to re-theme the whole app instantly.

## Notes
- Product data is generated client-side in `ProductService` (no backend needed) — swap in real API calls there when ready.
- Cart state lives in `CartService` using Angular signals; it resets on page refresh since there's no persistence layer wired in yet (easy to add via localStorage if needed).
