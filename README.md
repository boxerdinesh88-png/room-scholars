# Room Scholars 🏠

> Premium Student Accommodation Platform — Book verified student housing across the UK.

## ✨ Features

- **Property Listings** — Browse 16+ properties with photos, amenities, and pricing
- **Advanced Filters** — Filter by city, beds, bathrooms, price range, and tags
- **Property Details** — Full specs, image galleries, and enquiry forms
- **Enquiry System** — Built-in API for booking enquiries
- **Newsletter** — Email subscription via API
- **Fast & Optimized** — Next.js App Router, Turbopack, WebP/AVIF images, dynamic imports, `content-visibility`

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org) 16.2.6 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Inter + Playfair Display |
| Images | Next.js `<Image>` with WebP/AVIF |
| Database | MySQL (via `mysql2`) |
| Build | Turbopack |

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your MySQL credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/            # API routes (enquiry, subscribe)
│   ├── destinations/   # Full property listing page
│   ├── property/       # Property detail pages
│   └── page.tsx        # Homepage
├── components/         # Reusable React components
│   ├── ui/             # Primitive UI components
│   └── ...             # Feature components
└── lib/                # Utilities, DB client, property data
```

## 🌐 Deployment

### Vercel (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import repo in Vercel
3. Set environment variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)
4. Deploy

### Manual

```bash
npm run build
npm start
```

## 📄 Environment Variables

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port |
| `DB_USER` | MySQL user |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |

## 📬 API Endpoints

- `POST /api/enquiry` — Submit a property enquiry
- `POST /api/subscribe` — Subscribe to newsletter

## 📝 License

MIT
