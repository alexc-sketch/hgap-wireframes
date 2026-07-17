/*
 * STYLE: Blueprint Studio wireframe kit (ideas.md)
 * 00 — Cover page: what this kit contains, context, how to present it.
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
          product detail page, industry archive and industry page — together
          covering the journey from landing to enquiry for all{" "}
          <strong>258 SKUs · 150 models</strong> across <strong>6 industries</strong>.
          Now dressed in the Hitachi brand system — Hitachi Red, corporate type and the correct
            HITACHI + Global Air Power lockup — while imagery stays as placeholders. Mobile-first:
            resize the window to preview drawer filters and the sticky quote bar.
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
              series spec table, downloads, case-study proof and
              Salesforce-integrated enquiry form.
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
              Structured hero with dual CTA, intent router, brand strip,
              categories, industries, service &amp; AirLinx band, social proof
              and centred final CTA.
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
              Sullair example — brand hero with proof chips, heritage block,
              ranges by series, signature technology, brand case study and
              cross-brand explore strip.
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
              Oil Flooded Screw example — SEO landing hero, sub-category
              tiles, series comparison rows, selection guide, FAQs with schema
              and newsletter capture.
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
              /industries/ hub — application-led hero, six industry tiles with
              live product counts, how-we-work band, featured case study and
              centred final CTA.
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
              Mining example — challenges-to-solutions grid, recommended
              ranges, pre-filtered product link (/products/?industry=mining),
              industry case study and sibling-industry explore strip.
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
                Amber numbered badges mark annotated sections — each page ends
                with an annotation index explaining the rationale (toggle them
                off with the button in the top bar for a clean client view).
                Crossed boxes are image placeholders. The filter sidebar,
                compare tray and section tabs are lightly interactive so the
                client can feel the intended behaviour. Content shown (models,
                series, branches, case studies) is real data from the site
                audit — not lorem ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </KitShell>
  );
}
