# My Online Store

![App Preview](https://imgix.cosmicjs.com/8bb1fed0-7170-11f1-a87f-d72293b1048a-autopilot-photo-1556821840-3a63f95609a7-1782486361865.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern e-commerce storefront built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Browse products, explore categories, read customer reviews, and discover featured items — all powered by your existing Cosmic content structure.

## Features

- 🛍️ **Product Catalog** — Browse all products with images, pricing, sale prices, and inventory status
- 🏷️ **Category Pages** — Explore products organized by category with rich category imagery
- ⭐ **Customer Reviews** — Star ratings and detailed reviews displayed on product pages
- 🎨 **Variants Support** — Display product variants seamlessly
- 💰 **Sale Pricing** — Automatic display of sale prices with original price strikethrough
- 📦 **Inventory Status** — Clear in-stock / out-of-stock indicators
- 📱 **Fully Responsive** — Beautiful experience on mobile, tablet, and desktop
- ⚡ **Server Components** — Fast, SEO-friendly server-rendered pages

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a3e94f700113b4e40c8d632&clone_repository=6a3e961600113b4e40c8d68b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — React framework with App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `categories`, `products`, and `reviews` object types

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Set the following environment variables in your hosting platform (these are provided automatically when cloning in Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all products with connected category data
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch reviews for a specific product
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .depth(1)
```

## Cosmic CMS Integration

This application reads from three object types:

- **categories** — `name`, `description`, `category_image`
- **products** — `name`, `description`, `price`, `sale_price`, `sku`, `featured_image`, `gallery`, `inventory_status`, `variants`, `category`
- **reviews** — `reviewer_name`, `rating`, `review_title`, `review_text`, `date_submitted`, `product`

All data is fetched server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with the `depth` parameter to resolve connected objects (e.g. a product's category and a review's product).

## Deployment Options

### Vercel

1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Push your code to a Git repository
2. Import the project into [Netlify](https://netlify.com)
3. Add the environment variables
4. Deploy

<!-- README_END -->