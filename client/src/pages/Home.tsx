/*
 * STYLE: Blueprint Studio wireframe kit (ideas.md)
 * 00 / Cover page: what this kit contains, context, how to present it.
 * COPY: real English, no em dashes. Build stack is Gutenberg block theme plus ACF Pro.
 */
import { Link } from "wouter";
import { KitShell } from "@/components/WireframeKit";
import {
  ArrowRight,
  Award,
  Factory,
  FolderTree,
  Grid3x3,
  Home as HomeIcon,
  Layers,
  ListFilter,
  PackageOpen,
} from "lucide-react";

export default function Home() {
  return (
    <KitShell page="cover">
      <div className="wf-sheet p-8 lg:p-14 max-w-5xl mx-auto">
        <p className="wf-kicker mb-3">
          Hitachi Global Air Power Australia · Website rebuild · Client presentation
        </p>
        <h1 className="font-bold text-4xl lg:text-5xl leading-tight max-w-3xl">
          Product template wireframes for the new hitachiglobalairpower.au
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
          Seven structural templates for the rebuilt site: homepage, brand
          page, product category page, filterable product archive, single
          product detail page, industry archive and industry page. Together they
          cover the journey from landing to enquiry for all{" "}
          <strong>258 SKUs across 150 models</strong> and{" "}
          <strong>6 industries</strong>. Product data is real, taken from the
          client product list. Imagery stays as placeholders. The kit is built
          mobile first, so resize the window to preview the drawer filters and
          the sticky quote bar.
        </p>
        <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
          Build stack for the rebuild is a WordPress Gutenberg block theme with
          ACF Pro for the product data, so each annotation names the blocks,
          fields and patterns the developer needs rather than describing a
          visual layout alone.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <Link href="/product-list" className="group border-2 border-foreground p-6 hover:bg-secondary transition-colors duration-150 block">
            <ListFilter className="w-6 h-6 mb-4" />
            <p className="wf-kicker mb-1">Template 01</p>
            <h2 className="font-bold text-xl">Product List + Faceted Filters</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Archive of all products with live filter sidebar (brand, type,
              drive, pressure, power, flow), guided finder, compare tray and
              trust band.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-4 text-primary">
              Open wireframe <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
            </span>
          </Link>

          <Link href="/product-page" className="group border-2 border-foreground p-6 hover:bg-secondary transition-colors duration-150 block">
            <PackageOpen className="w-6 h-6 mb-4" />
            <p className="wf-kicker mb-1">Template 02</p>
            <h2 className="font-bold text-xl">Single Product Page</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Gallery, spec snapshot, quote CTA stack, anchored section tabs,
              grouped ACF specifications, a variant comparison table,
              downloads, the Request a Quote form and related products.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-4 text-primary">
              Open wireframe <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-5">
          <Link href="/homepage" className="group border-2 border-foreground p-6 hover:bg-secondary transition-colors duration-150 block">
            <HomeIcon className="w-6 h-6 mb-4" />
            <p className="wf-kicker mb-1">Template 03</p>
            <h2 className="font-bold text-xl">Homepage</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Working mega menu, hero carousel, product range, five brand
              tiles, a dedicated AirLinx section, industries, Insights and a
              centred final CTA.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-4 text-primary">
              Open wireframe <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
            </span>
          </Link>

          <Link href="/brand-page" className="group border-2 border-foreground p-6 hover:bg-secondary transition-colors duration-150 block">
            <Award className="w-6 h-6 mb-4" />
            <p className="wf-kicker mb-1">Template 04</p>
            <h2 className="font-bold text-xl">Brand Page</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Sullair worked example using real catalogue data. Brand hero,
              live model counts, ranges by series, signature technology,
              service and parts proof, and a cross brand explore strip.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-4 text-primary">
              Open wireframe <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
            </span>
          </Link>

          <Link href="/category-page" className="group border-2 border-foreground p-6 hover:bg-secondary transition-colors duration-150 block">
            <FolderTree className="w-6 h-6 mb-4" />
            <p className="wf-kicker mb-1">Template 05</p>
            <h2 className="font-bold text-xl">Category Page</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Oil Free worked example using real catalogue data. SEO landing
              hero, benefit tiles, technology tiles, series comparison rows,
              selection guide, industries and FAQs with schema.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-4 text-primary">
              Open wireframe <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <Link href="/industry-archive" className="group border-2 border-foreground p-6 hover:bg-secondary transition-colors duration-150 block">
            <Grid3x3 className="w-6 h-6 mb-4" />
            <p className="wf-kicker mb-1">Template 06</p>
            <h2 className="font-bold text-xl">Industry Archive</h2>
            <p className="text-sm text-muted-foreground mt-2">
              The /industries/ hub. Application led hero, six industry tiles
              with live product counts, a how we work band and a centred final
              CTA. Placeholder copy on this template.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-4 text-primary">
              Open wireframe <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
            </span>
          </Link>

          <Link href="/industry-page" className="group border-2 border-foreground p-6 hover:bg-secondary transition-colors duration-150 block">
            <Factory className="w-6 h-6 mb-4" />
            <p className="wf-kicker mb-1">Template 07</p>
            <h2 className="font-bold text-xl">Industry Page</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Mining worked example. Challenges to solutions grid, recommended
              ranges, a pre filtered product link and a sibling industry
              explore strip. Placeholder copy on this template.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-4 text-primary">
              Open wireframe <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
            </span>
          </Link>
        </div>

        <div className="border-t mt-10 pt-8">
          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 mt-0.5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">How to read these wireframes</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-2xl">
                Amber numbered badges mark annotated sections, and each page
                ends with an annotation index explaining the rationale and the
                Gutenberg or ACF build approach. Toggle the badges off with the
                button in the top bar for a clean client view. Crossed boxes are
                image placeholders. The mega menu, filter sidebar, compare tray
                and section tabs are lightly interactive so the client can feel
                the intended behaviour.
              </p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-2xl">
                Copy status varies by template on purpose. The cover, homepage,
                brand, category, product list and product page templates carry
                real English content, with product figures taken from the client
                product list and tone influenced by the current live site. The
                industry archive and industry page still carry placeholder copy
                pending content direction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </KitShell>
  );
}
