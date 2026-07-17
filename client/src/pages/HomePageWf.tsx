/*
 * STYLE: Blueprint Studio wireframe, Hitachi-branded (ideas.md)
 * 03 — Homepage template. Hitachi Red #b1000e CTAs, Hitachi Sans headings,
 * live-site CTA labels kept identical. Mobile-first stacking.
 * Component order rule: Blogs → Final CTA (centred) → Footer.
 * No dark-blue headers, no gradients, quicklink bars never sticky.
 */
import { useEffect, useState } from "react";
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
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headset,
  MapPin,
  Play,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

/* Hero carousel slides — product-category focus per client. 4 slides:
   1 value prop + 3 top categories. NOTE: HGAP does NOT offer rentals —
   rental content is a CAMPAIGN targeting product rental companies (buyers). */
const SLIDES = [
  {
    kicker: "Sullair · Champion · Hitachi — one Australian partner",
    headline: "Put your air compressor in expert hands with Hitachi Global Air Power",
    copy: "Value proposition — live-site H1 retained. Industrial & portable compressors, air treatment and 24/7 service from 6 local branches, backed by the global Hitachi Group.",
    ctas: ["View all products", "CONTACT US"],
    media: "Slide 1 media — facility image / brand video (16:9)",
  },
  {
    kicker: "Product category — stationary",
    headline: "Stationary air compressors — 1.5 to 355 kW, fixed speed & VSD",
    copy: "Category message — the deepest range in the catalogue (217 SKUs): oil flooded screw, oil free screw, scroll and piston across Champion, Sullair and Hitachi.",
    ctas: ["Find out more", "CONTACT US"],
    media: "Slide 2 media — stationary compressor plant room hero shot",
  },
  {
    kicker: "Product category — portable",
    headline: "Portable diesel compressors built for Australian conditions",
    copy: "Category message — 185 to 1550 cfm CAT-powered range (33 SKUs) for construction, mining and rental fleets.",
    ctas: ["Find out more", "CONTACT US"],
    media: "Slide 3 media — portable compressor on site",
  },
  {
    kicker: "Product category — oil free",
    headline: "Oil free air compressors for critical applications",
    copy: "Category message — 85 oil free SKUs: DSP screw, SRL scroll and Bebicon piston for food & beverage, pharma and electronics.",
    ctas: ["Find out more", "CONTACT US"],
    media: "Slide 4 media — oil free compressor / clean facility",
  },
];

const NOTES: NoteDef[] = [
  { n: 1, title: "Hero carousel — product category focus", body: "Functional in this prototype — 4 slides, auto-advance every 6s, pauses on hover, arrows + dot indicators. Slide 1 carries the value proposition; slides 2–4 each promote a top product category (stationary, portable, oil free — real SKU counts from the client's product list) linking straight to its category page. Slide slots can be swapped for campaign creative (e.g. targeting rental companies with the portable range). DEV NOTE: build with Elementor Pro's native Slides widget (or Essential Addons Content Slider) — NOT Slider Revolution, a known performance drag on the current site; first slide loads eagerly for LCP, respects prefers-reduced-motion, swipeable on mobile." },
  { n: 2, title: "Intent router", body: "Three self-selection doors modelled on Atlas Copco: 'I need a compressor', 'I need service or parts', and 'I run a rental fleet' — the third door targets product rental companies buying portable compressors for their own fleets (HGAP does not offer rentals; this replaces the misleading 'hire/rental' framing)." },
  { n: 3, title: "Brand strip", body: "HGAP's differentiator is the three-brand portfolio (Sullair, Champion, Hitachi) under Hitachi Group ownership. Each tile links to a brand page." },
  { n: 4, title: "Featured categories", body: "The six agreed Products menu categories (All / Stationary / Portable / Oil Flooded / Oil Free / Accessories) link into their category landing pages — the primary SEO landing routes. Counts are real SKU counts from ProductList-Marketing.xlsx. Note Stationary/Portable and Oil Flooded/Oil Free are two crossing taxonomies: a product appears in one of each pair without page duplication. Accessories is now a live sixth category covering air treatment (dryers, filtration), receivers and lubricants — indicative sub-types shown in the Product List; SKU-level data still to be supplied by the client." },
  { n: 5, title: "Industries served", body: "Industry tiles route buyers by application (mining, manufacturing, food & beverage...) and power internal linking to the 6 industry pages." },
  { n: 6, title: "Service & AirLinx band", body: "Aftermarket revenue driver: 24/7 service, maintenance plans and AirLinx IoT monitoring — competitor analysis showed CompAir iConn given equivalent prominence." },
  { n: 7, title: "Social proof band", body: "Case-study pull-quote + client logos + '50+ years in Australia' stat row. Real proof from the existing case-study library." },
  { n: 8, title: "Latest insights (Blogs)", body: "Three latest articles feed SEO freshness and demonstrate expertise. Positioned before the final CTA per the agreed component order." },
  { n: 9, title: "Final CTA (centred)", body: "Single centred conversion moment closing every page, using the live site's own H2 ('Let us help you find the right compressor for your needs') and phone 1300 266 773." },
  { n: 10, title: "Hitachi brand system applied", body: "Per the Hitachi brand guidelines review: Hitachi Red #b1000e for primary CTAs and active states only; HITACHI mark leads the header lockup with the 'Global Air Power' wordmark subordinate and never red; Hitachi Sans (site-hosted) for headings with Arial body fallback; sharp geometry (radius 0). CTA labels are kept identical to the live site (CONTACT US, Find out more, View all products, View all insights). Mobile-first: carousel is swipeable, sections stack single-column, tap targets ≥44px." },
];

export default function HomePageWf() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const cur = SLIDES[slide];

  return (
    <KitShell page="home" notes={NOTES}>
      <SheetTitle
        code="Template 03 / Homepage — /"
        title="Homepage"
        desc="Responsive, mobile-first wireframe. Hitachi-branded carousel hero, intent-based routing and the agreed component order ending in a centred CTA."
      />

      <div className="wf-sheet overflow-hidden">
        <div className="relative">
          <Note n={10} />
          <WfUtilityBar />
          <WfHeader />
        </div>

        {/* Hero carousel */}
        <section
          className="relative border-b bg-card"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Note n={1} />
          <div className="grid lg:grid-cols-2">
            <div key={slide} className="px-4 lg:px-8 py-12 flex flex-col justify-center animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                {cur.kicker}
              </span>
              <h2 className="font-bold text-4xl leading-tight max-w-lg">
                {cur.headline}
              </h2>
              <p className="text-sm text-muted-foreground mt-4 max-w-md leading-relaxed">
                {cur.copy}
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <span className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-3.5">
                  {cur.ctas[0]}
                </span>
                <span className="border font-medium text-sm px-6 py-3.5">
                  {cur.ctas[1]}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-5 mt-8 text-[12px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Hitachi Group company
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> 6 AU branches
                </span>
                <span className="flex items-center gap-1.5">
                  <Headset className="w-4 h-4" /> 24/7 support
                </span>
              </div>
            </div>
            <div className="relative min-h-72">
              <ImgPh key={slide} label={cur.media} className="absolute inset-0 animate-in fade-in duration-300" />
              {slide === 0 && (
                <span className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-foreground text-background font-mono text-[11px] uppercase px-3 py-2">
                  <Play className="w-3.5 h-3.5" /> Watch: inside HGAP Australia
                </span>
              )}
            </div>
          </div>

          {/* Carousel controls */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3">
            <button
              onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
              className="border-2 border-foreground bg-card p-2 hover:bg-secondary"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 bg-card border-2 border-foreground px-3 py-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 transition-all duration-200 ${
                    i === slide ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
              className="border-2 border-foreground bg-card p-2 hover:bg-secondary"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="absolute top-4 right-4 z-10 font-mono text-[9px] uppercase text-muted-foreground bg-card border px-2 py-1">
            Slide {slide + 1}/{SLIDES.length} · auto 6s · hover = pause
          </span>
        </section>

        {/* Intent router */}
        <section className="relative border-b grid sm:grid-cols-3 divide-x bg-secondary/40">
          <Note n={2} />
          {[
            ["I need a compressor", "Find the right model by application, air demand and power.", "Browse & filter products"],
            ["I need service or parts", "Factory-trained technicians, genuine OEM parts, maintenance plans.", "Book a service"],
            ["I run a rental fleet", "Portable diesel compressors built to earn in rental fleets — fleet pricing available.", "Explore the portable range"],
          ].map(([t, s, cta]) => (
            <div key={t} className="p-6 flex flex-col bg-transparent hover:bg-card transition-colors duration-150">
              <h3 className="font-bold text-lg">{t}</h3>
              <p className="text-sm text-muted-foreground mt-2 flex-1">{s}</p>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-4 text-primary">
                {cta} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </section>

        {/* Brand strip */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={3} />
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="wf-kicker mb-1">Our brands</p>
              <h3 className="font-bold text-xl">Three brands, one standard of support</h3>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["Sullair", "Industrial & portable air compressors — legendary airend durability since 1965."],
              ["Champion", "Reliable workshop & light-industrial compressors built for Australian trades."],
              ["Hitachi", "Oil-free scroll and screw technology for precision and clean-air applications."],
            ].map(([b, s]) => (
              <div key={b} className="border p-5 group hover:bg-secondary transition-colors duration-150">
                <ImgPh label={`${b} logo`} className="h-12 w-32 mb-4" />
                <p className="font-semibold">{b}</p>
                <p className="text-sm text-muted-foreground mt-1">{s}</p>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-3 text-primary">
                  Visit brand page <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured categories */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={4} />
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="wf-kicker mb-1">Products</p>
              <h3 className="font-bold text-xl">Shop by category</h3>
            </div>
            <span className="font-mono text-[11px] underline">All 150 models →</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["All Products", "150 models · 44 series"],
              ["Stationary Air Compressors", "217 SKUs"],
              ["Portable Air Compressors", "33 SKUs"],
              ["Oil Flooded", "165 SKUs"],
              ["Oil Free Air Compressors", "85 SKUs"],
              ["Air Compressor Accessories", "Dryers · filtration · receivers · lubricants"],
            ].map(([c, n]) => (
              <div key={c} className="bg-card border flex items-center gap-4 p-4">
                <ImgPh label="Cat. image" className="w-20 h-16 flex-none" />
                <div className="flex-1">
                  <p className="font-semibold text-[14px] leading-snug">{c}</p>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground mt-1">{n}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={5} />
          <p className="wf-kicker mb-1">Industries</p>
          <h3 className="font-bold text-xl mb-5">Engineered for your industry</h3>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
            {["Mining", "Manufacturing", "Food & Beverage", "Pharmaceutical", "Construction", "Agriculture"].map((i) => (
              <div key={i} className="border">
                <ImgPh label="Industry" className="h-20" />
                <p className="font-medium text-[13px] p-3">{i} →</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service & AirLinx */}
        <section className="relative border-b grid lg:grid-cols-2 bg-foreground text-background">
          <Note n={6} />
          <div className="px-4 lg:px-8 py-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-background/60 mb-2">
              Service &amp; support
            </p>
            <h3 className="font-bold text-2xl max-w-sm">
              24/7 nationwide service, genuine parts, planned maintenance
            </h3>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                [Headset, "24/7 breakdown response"],
                [Wrench, "Factory-trained technicians"],
                [Truck, "Genuine parts ex-stock AU"],
              ].map(([Icon, t]: any) => (
                <div key={t}>
                  <Icon className="w-5 h-5 mb-2 text-background/70" />
                  <p className="text-[13px] font-medium">{t}</p>
                </div>
              ))}
            </div>
            <span className="inline-block border border-background/40 font-medium text-sm px-6 py-3 mt-7">
              Explore service &amp; parts
            </span>
          </div>
          <div className="px-4 lg:px-8 py-10 border-t lg:border-t-0 lg:border-l border-white/15">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-background/60 mb-2">
              Digital platforms
            </p>
            <h3 className="font-bold text-2xl max-w-sm">
              AirLinx — remote compressor monitoring
            </h3>
            <p className="text-sm text-background/70 mt-3 max-w-md">
              Live performance data, fault alerts and energy reporting for your
              compressed air system.
            </p>
            <ImgPh label="AirLinx dashboard screenshot" className="h-28 mt-5 !bg-white/10 !border-white/25" />
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-5 text-primary-foreground bg-primary px-4 py-2.5">
              EXPLORE Digital Platforms <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </section>

        {/* Social proof */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={7} />
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">
            <div className="border-l-4 border-primary pl-5">
              <p className="text-lg font-medium leading-relaxed max-w-2xl">
                Case-study pull-quote — e.g. Dulux Merrifield preventative
                maintenance partnership or ITO EN nitrogen generation install.
              </p>
              <p className="font-mono text-[11px] text-muted-foreground mt-3">
                — Client name, role · from the /insights/ case-study library
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <ImgPh key={i} label="Client" className="h-12" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 border divide-x bg-card mt-8 text-center">
            {[
              ["50+", "years in Australia"],
              ["6", "branches nationwide"],
              ["150", "models in range"],
              ["24/7", "service coverage"],
            ].map(([v, l]) => (
              <div key={l} className="py-5">
                <p className="font-bold text-2xl">{v}</p>
                <p className="font-mono text-[10px] uppercase text-muted-foreground mt-1">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blogs (before final CTA per component order) */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={8} />
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="wf-kicker mb-1">Insights</p>
              <h3 className="font-bold text-xl">Latest from the knowledge hub</h3>
            </div>
            <span className="font-mono text-[11px] underline">View all insights →</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["Insights", "How does an air compressor work?"],
              ["Case Study", "Preventative maintenance at Dulux Merrifield"],
              ["News", "HGAP named in Hitachi global service awards"],
            ].map(([tag, t]) => (
              <div key={t} className="border">
                <ImgPh label="Article image" className="h-28" />
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">{tag}</p>
                  <p className="font-medium text-[14px] leading-snug">{t}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA — centred */}
        <section className="relative bg-foreground text-background px-4 py-12 text-center">
          <Note n={9} />
          <h3 className="font-bold text-2xl">
            Let us help you find the right compressor for your needs
          </h3>
          <p className="text-sm text-background/70 mt-2 max-w-md mx-auto">
            Sizing, servicing or replacing — our engineers respond within one
            business day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <span className="bg-primary text-primary-foreground font-bold text-sm px-6 py-3.5 min-h-[44px] inline-flex items-center justify-center">
              CONTACT US
            </span>
            <span className="border border-background/40 text-sm font-medium px-6 py-3.5 min-h-[44px] inline-flex items-center justify-center">
              Call 1300 266 773
            </span>
          </div>
        </section>

        <WfFooter />
      </div>
    </KitShell>
  );
}
