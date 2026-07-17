# HGAP Wireframe Kit — hitachiglobalairpower.au rebuild

Client-presentation wireframe kit for the Hitachi Global Air Power Australia website rebuild. Built as a React 19 + Vite + Tailwind 4 prototype, styled to the Hitachi brand system (Hitachi Red `#b1000e`, Hitachi Sans with Arial fallback, HITACHI + Global Air Power header lockup) with layouts kept as unfilled placeholders and toggleable numbered annotations explaining the rationale of each section.

## Key pages

The three pages requested for this commit, plus the rest of the kit, live in `client/src/pages/`:

| Route | File | Description |
|---|---|---|
| `/` | `Home.tsx` | **Cover page** — kit overview and links to all templates |
| `/product-list` | `ProductList.tsx` | **Product List page** — faceted filters (category, air type, brand, industry, pressure, power), guided finder, compare tray, Quick Quote modal, mobile filter drawer |
| `/product-page` | `ProductPage.tsx` | **Single Product page** — VOC 90 V example with gallery, spec snapshot, quote CTA stack, section tabs, series spec table, enquiry form, sticky mobile quote bar |
| `/homepage` | `HomePageWf.tsx` | Homepage — category-focused hero carousel, intent router, brand strip |
| `/brand-page` | `BrandPage.tsx` | Brand page template (Sullair example) |
| `/category-page` | `CategoryPage.tsx` | Product category template (Oil Flooded example) |
| `/industries` | `IndustryArchive.tsx` | Industry archive hub |
| `/industry-page` | `IndustryPage.tsx` | Industry page template (Mining example) |

Shared wireframe components (header/footer chrome, annotation system, Quick Quote modal) are in `client/src/components/WireframeKit.tsx` and `client/src/components/QuickQuoteModal.tsx`.

## Running locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Data sources

Product counts and taxonomy (258 SKUs, 150 models, 44 series; Stationary/Portable × Oil Flooded/Oil Free axes) come from the client's `ProductList-Marketing.xlsx`. The Accessories category is included as a live sixth category with indicative sub-types (dryers, filtration, receivers, lubricants) pending SKU-level data from the client. CTA labels match the current live site.
