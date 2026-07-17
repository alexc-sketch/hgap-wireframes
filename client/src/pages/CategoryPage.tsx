/*
 * STYLE: Blueprint Studio wireframe (ideas.md)
 * 05 — Category page template (example: Oil Flooded — agreed re-title of Oil Injected).
 * Real counts/series from ProductList-Marketing.xlsx (165 SKUs · 84 models).
 * Grayscale, radius 0. Sits between homepage and filtered product list.
 * Order: content → Blogs → Final CTA (centred) → FAQ → Footer? NO —
 * agreed order is Blogs → Final CTA → FAQs → Newsletter → Footer.
 */
import {
  KitShell,
  Note,
  WfUtilityBar,
  WfHeader,
  WfFooter,
  ImgPh,
  SheetTitle,
  type NoteDef,
} from "@/components/WireframeKit";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";

const NOTES: NoteDef[] = [
  { n: 1, title: "Category hero (SEO landing)", body: "H1 targets the category keyword using the agreed re-title — 'Oil Flooded Air Compressors' (keep 'oil injected screw' in the intro copy, buyers still search that term). This template serves all six Products-menu categories. Note the taxonomy crosses two axes: Stationary/Portable (configuration) and Oil Flooded/Oil Free (air type) — a model like the VOC 90 V appears under both without duplicate pages; JetSmartFilters + JetEngine handle the cross-listing." },
  { n: 2, title: "Sub-category tiles", body: "Splits the 165-SKU category the way buyers narrow down: configuration (stationary vs portable), capacity control (fixed speed vs VSD — real spec columns in the client's Excel), and brand. Each tile opens the product list pre-filtered." },
  { n: 3, title: "Series listing with spec ranges", body: "Series rows show real kW/cfm ranges from the client's spec sheet, so buyers pick a family (44 in the catalogue) before a model (150). Data comes from the same JetEngine meta fields as the product pages — no duplicate content entry." },
  { n: 4, title: "Selection guide block", body: "Editorial guidance ('which screw compressor do I need?') converts unsure visitors and earns featured-snippet real estate." },
  { n: 5, title: "Category social proof", body: "Case study relevant to this category plus trust stats — consistent with other templates." },
  { n: 6, title: "Blogs before final CTA", body: "Category-relevant articles in the agreed component order (Blogs → Final CTA → FAQs → Newsletter → Footer)." },
  { n: 7, title: "Final CTA (centred)", body: "Standard centred conversion block, consistent across templates." },
  { n: 8, title: "FAQ accordion (schema-ready)", body: "Category FAQs marked up with FAQPage schema for rich results. Placed after the final CTA per the agreed order." },
  { n: 9, title: "Newsletter signup", body: "Low-commitment capture for long-cycle buyers, last block before the footer." },
];

export default function CategoryPage() {
  return (
    <KitShell page="category" notes={NOTES}>
      <SheetTitle
        code="Template 05 / Category page — /products/oil-flooded/"
        title="Product Category Page"
        desc="Responsive wireframe using Oil Flooded (agreed re-title of Oil Injected; 165 SKUs · 84 models in the client product list) as the example. Same structure serves all six Products-menu categories."
      />

      <div className="wf-sheet overflow-hidden">
        <WfUtilityBar />
        <WfHeader active="products" />

        {/* Breadcrumb */}
        <div className="border-b px-4 lg:px-8 py-3 bg-secondary/60">
          <p className="font-mono text-[11px] text-muted-foreground">
            Home <ChevronRight className="inline w-3 h-3" /> Products{" "}
            <ChevronRight className="inline w-3 h-3" />{" "}
            <span className="text-foreground font-medium">Oil Flooded Air Compressors</span>
          </p>
        </div>

        {/* Category hero */}
        <section className="relative grid lg:grid-cols-[1fr_380px] gap-8 border-b bg-card px-4 lg:px-8 py-10">
          <Note n={1} />
          <div>
            <h2 className="font-bold text-3xl leading-tight">
              Oil Flooded Air Compressors
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed">
              Indexable category intro — what oil flooded (oil injected) screw
              technology is, who it suits (continuous industrial duty), and the
              Champion / Sullair / Hitachi ranges available from 4 kW workshop
              units to 340 kW two-stage machines.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-3">
                View all products
              </span>
              <span className="border font-medium text-sm px-6 py-3">
                Help me choose
              </span>
            </div>
            <div className="flex gap-6 mt-7 font-mono text-[11px] uppercase text-muted-foreground">
              <span>84 models · 165 SKUs</span>
              <span>4–340 kW</span>
              <span>3 brands</span>
            </div>
          </div>
          <ImgPh label="Category hero image" className="min-h-52" />
        </section>

        {/* Sub-category tiles */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={2} />
          <p className="wf-kicker mb-1">Narrow it down</p>
          <h3 className="font-bold text-xl mb-5">Shop by type</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Stationary", "Plant rooms & workshops — fixed installations", "135 SKUs"],
              ["Portable", "CAT-powered diesel — site & fleet work", "30 SKUs"],
              ["Variable Speed (VSD)", "Fluctuating demand, energy savings", "Filter: VSD"],
              ["By Brand", "Champion · Sullair · Hitachi", "3 ranges"],
            ].map(([t, s, n]) => (
              <div key={t} className="bg-card border p-5 group hover:bg-secondary transition-colors duration-150">
                <ImgPh label="Type image" className="h-20 mb-4" />
                <p className="font-semibold text-[15px]">{t}</p>
                <p className="text-[12px] text-muted-foreground mt-1">{s}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">{n}</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Series listing */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={3} />
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="wf-kicker mb-1">Ranges in this category</p>
              <h3 className="font-bold text-xl">Compare series at a glance</h3>
            </div>
            <span className="border bg-card px-3 py-1.5 text-[13px] flex items-center gap-2">
              Sort: Power <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="border divide-y">
            {[
              ["FOCUS 4-15", "Champion", "4–15 kW", "21–88 cfm", "Workshops & trades"],
              ["VOCV 45-90", "Champion", "45–90 kW", "280–591 cfm", "Variable demand plants"],
              ["LS Series", "Sullair", "90–260 kW", "500–1,600 cfm", "Continuous industrial duty"],
              ["TS Two-Stage", "Sullair", "190–340 kW", "1,000–2,200 cfm", "Large-scale plants"],
              ["Portable 375–425", "Sullair", "CAT diesel", "375–425 cfm", "Construction & rental fleets"],
            ].map(([series, brand, kw, cfm, use]) => (
              <div key={series} className="grid grid-cols-2 lg:grid-cols-[220px_100px_1fr_1fr_1fr_130px] gap-3 items-center px-4 py-4 hover:bg-secondary/60 transition-colors duration-150">
                <div className="flex items-center gap-3">
                  <ImgPh label="img" className="w-14 h-11 flex-none hidden lg:block" />
                  <p className="font-semibold text-[14px]">{series}</p>
                </div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">{brand}</span>
                <span className="text-[13px]"><span className="font-mono text-[10px] uppercase text-muted-foreground block">Power</span>{kw}</span>
                <span className="text-[13px]"><span className="font-mono text-[10px] uppercase text-muted-foreground block">Flow</span>{cfm}</span>
                <span className="text-[13px] hidden lg:block"><span className="font-mono text-[10px] uppercase text-muted-foreground block">Best for</span>{use}</span>
                <span className="text-center border font-medium text-[12px] py-2 col-span-2 lg:col-span-1">View series</span>
              </div>
            ))}
          </div>
        </section>

        {/* Selection guide */}
        <section className="relative border-b grid lg:grid-cols-2 gap-8 px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={4} />
          <div>
            <p className="wf-kicker mb-1">Selection guide</p>
            <h3 className="font-bold text-xl mb-3">
              Which screw compressor do I need?
            </h3>
            <div className="space-y-2 max-w-lg">
              {[100, 94, 88, 96, 62].map((w, i) => (
                <div key={i} className="h-3 bg-card border" style={{ width: `${w}%` }} />
              ))}
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-5 text-primary">
              Read the full buying guide <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {[
              ["Duty cycle", "Continuous vs intermittent"],
              ["Air demand", "cfm at operating pressure"],
              ["Demand profile", "Steady vs variable → VSD"],
              ["Air quality", "Oil flooded vs oil free"],
            ].map(([t, s]) => (
              <div key={t} className="bg-card border p-4">
                <p className="font-semibold text-[13px]">{t}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social proof */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={5} />
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">
            <div className="border-l-4 border-primary pl-5">
              <p className="text-lg font-medium leading-relaxed max-w-2xl">
                Category-relevant case-study pull-quote — e.g. VSD retrofit
                energy savings at a manufacturing plant.
              </p>
              <p className="font-mono text-[11px] text-muted-foreground mt-3">
                — Client name, role · Read the full case study →
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <ImgPh key={i} label="Client" className="h-12" />
              ))}
            </div>
          </div>
        </section>

        {/* Blogs */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={6} />
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="wf-kicker mb-1">Insights</p>
              <h3 className="font-bold text-xl">Guides for this category</h3>
            </div>
            <span className="font-mono text-[11px] underline">View all insights →</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              "How does a rotary screw compressor work?",
              "Fixed speed vs VSD — running cost comparison",
              "Sizing guide: matching cfm to your tools",
            ].map((t) => (
              <div key={t} className="bg-card border">
                <ImgPh label="Article image" className="h-24" />
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">Insights</p>
                  <p className="font-medium text-[13px] leading-snug">{t}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA — centred */}
        <section className="relative border-b bg-foreground text-background px-4 py-12 text-center">
          <Note n={7} />
          <h3 className="font-bold text-2xl">Not sure which model fits?</h3>
          <p className="text-sm text-background/70 mt-2 max-w-md mx-auto">
            Send us your air demand and application — we'll size it for you.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <span className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-3">
              Request a Quote
            </span>
            <span className="border border-background/40 text-sm font-medium px-6 py-3">
              Call 1300 266 773
            </span>
          </div>
        </section>

        {/* FAQs */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={8} />
          <p className="wf-kicker mb-1">FAQs</p>
          <h3 className="font-bold text-xl mb-5">
              Oil flooded air compressor questions
          </h3>
          <div className="border divide-y max-w-3xl">
            {[
              "What is the difference between oil flooded and oil free?",
              "How often does a screw compressor need servicing?",
              "Can I run a screw compressor on single-phase power?",
              "What warranty applies to Sullair airends in Australia?",
            ].map((q, i) => (
              <div key={q} className="flex items-center justify-between px-4 py-4">
                <p className={`text-[14px] ${i === 0 ? "font-semibold" : "font-medium"}`}>{q}</p>
                <ChevronDown className={`w-4 h-4 text-muted-foreground ${i === 0 ? "rotate-180" : ""}`} />
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-muted-foreground mt-2">
            FAQPage schema markup for rich results.
          </p>
        </section>

        {/* Newsletter */}
        <section className="relative px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={9} />
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-bold text-lg">Compressed air insights, quarterly</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Maintenance tips, energy-saving guides and new-release news.
            </p>
            <div className="flex gap-2 mt-5 max-w-md mx-auto">
              <div className="flex-1 border bg-card px-3 py-3 text-[13px] text-muted-foreground text-left">
                Email address
              </div>
              <span className="bg-foreground text-background font-semibold text-[13px] px-5 py-3">
                Subscribe
              </span>
            </div>
          </div>
        </section>

        <WfFooter />
      </div>
    </KitShell>
  );
}
