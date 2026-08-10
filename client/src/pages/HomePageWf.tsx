/*
 * STYLE: Blueprint Studio wireframe, Hitachi-branded (ideas.md)
 * 03 - Homepage template. Hitachi Red #b1000e CTAs, Hitachi Sans headings.
 * REAL ENGLISH PLACEHOLDER COPY (client request Jul 28): no latin, NO EM DASHES.
 * Required sections: mega menu header (sitemap-driven; Gutenberg build routes in note 1),
 * hero, product range, Our Brands, dedicated AirLinx section, industries,
 * Insights (blogs), final centred CTA. Component order: Blogs -> Final CTA -> Footer.
 * No dark-blue headers, no gradients, sharp geometry (radius 0).
 */
import { useEffect, useState } from "react";
import {
  KitShell,
  Note,
  WfFooter,
  ImgPh,
  SheetTitle,
  type NoteDef,
} from "@/components/WireframeKit";
import { WfGlobalHeader } from "@/components/WfMegaMenu";
import {
  Activity,
  ArrowRight,
  BellRing,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Headset,
  MapPin,
  Play,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

/* Hero banner: FULL WIDTH (full bleed, edge to edge) carousel with the four
   client-specified destinations, in order:
     1. Products (the range)
     2. AirLinx remote monitoring
     3. Rental fleet solutions
     4. Servicing and parts solutions
   Slide copy and CTA labels are influenced by the live site (Slider Revolution
   slides and nav descriptions in the page source), with the live em dash in the
   rental headline removed per the client rule.
   NOTE: HGAP does NOT rent equipment. The rental slide targets hire and rental
   companies buying compressors for their own fleets. */
const SLIDES = [
  {
    kicker: "Products",
    headline: "Put your air compressor in expert hands",
    copy: "Designed and engineered to excel in Australian conditions. Stationary, portable, oil flooded and oil free compressors across 150 models and 258 SKUs, from Sullair, Champion, Hitachi, Bebicon and Air-One.",
    ctas: ["View all products", "CONTACT US"],
    target: "/products/",
    media: "Slide 1 media: product range hero, compressor lineup (full bleed 21:9)",
  },
  {
    kicker: "AirLinx remote monitoring",
    headline: "AirLinx real time confidence, built in",
    copy: "Catch early warning signs, prevent emergency breakdowns and lower your energy costs. 112 SKUs in the current range are AirLinx ready.",
    ctas: ["Find out more", "CONTACT US"],
    target: "/airlinx-remote-monitoring-system/",
    media: "Slide 2 media: AirLinx dashboard on tablet in plant room (full bleed 21:9)",
  },
  {
    kicker: "Rental fleet solutions",
    headline: "The right rental fleet does not just work hard, it pays back",
    copy: "Power your rental fleet with world class equipment. Portable diesel compressors from 185 to 1550 cfm, built for high utilisation and fast turnaround between hires.",
    ctas: ["Find out more", "CONTACT US"],
    target: "/hire-and-rental/",
    media: "Slide 3 media: portable fleet lined up on site (full bleed 21:9)",
  },
  {
    kicker: "Servicing and parts solutions",
    headline: "Keep your operations running with expert service and genuine parts",
    copy: "Australia wide support and 24/7 service from 6 branches. Genuine parts for Sullair, Champion and Hitachi, service care plans and airend rebuilds.",
    ctas: ["Find out more", "1300 266 773"],
    target: "/services-and-parts/",
    media: "Slide 4 media: technician servicing a compressor (full bleed 21:9)",
  },
];

const NOTES: NoteDef[] = [
  { n: 1, title: "Global header: Hitachi group standard", body: "GLOBAL ELEMENT, identical on all seven templates. Rebuilt to the Hitachi group standard shared by hitachi.com/en-au and hitachienergy.com rather than a bespoke HGAP menu. Row 1, white: brand lockup left, then the utility items right in the group order, a region and language selector with a globe, a link out to Hitachi Global, Contact Us with a mail icon, and Search which expands a full width field. Utility items are plain text links, never buttons and never red. Row 2, grey band: the site identity wordmark left, main navigation right, and only the CURRENT section takes a solid Hitachi Red fill. The mega panel is a full width two pane drilldown: a left rail of second level categories where the selected item carries a red underline and a short red rule, and a right pane with the category heading and arrow, a descriptive paragraph, then the destination links. Nothing navigates until a right pane link is chosen, which is what makes the pattern read as considered rather than a link dump. One deliberate deviation from corporate: the 1300 number sits in the utility row as plain text, because it is a genuine commercial need with no corporate equivalent, and it replaces the old red CONTACT US button that the standard does not permit inside the nav row. GUTENBERG BUILD NOTE: the core Navigation block cannot produce a two pane drilldown, its submenus are single column lists. Build a custom ACF Block header rendered inside the header template part: a top level repeater, each row holding a category repeater with title, description and links. Same PHP templating as the product spec blocks, and it reproduces this layout exactly. Escape and outside click close the panel; on mobile the same structure collapses into an accordion drawer with 44px targets." },
  { n: 2, title: "Hero banner: full width carousel, four destinations", body: "FULL BLEED: the banner runs edge to edge, breaking out of the page container, with the copy panel overlaid on the image rather than sitting beside it. Four slides in the client-specified order, each routing to one destination: (1) Products, the range, (2) AirLinx remote monitoring, (3) Rental fleet solutions, (4) Servicing and parts solutions. Functional in this prototype: auto advance every 6s, pause on hover, arrows, dot indicators and a slide counter. Copy is influenced by the live Slider Revolution slides and the nav descriptions in the current page source, with the live em dash removed from the rental headline. The live 'offers and promotions' slide is not in the requested set; it can be added later as an optional fifth slide since the repeater has no fixed count. GUTENBERG BUILD NOTE: the live site uses Slider Revolution, a licensed plugin tied to The7 that carries a real performance cost. Rebuild it as a custom ACF Block with a 'slides' repeater (image, eyebrow, headline, subcopy, CTA label, CTA link) and full bleed achieved natively with alignfull support plus the theme.json layout settings, so no slider plugin is required. Load the first slide image eagerly for LCP and the rest lazily, respect prefers-reduced-motion, and make it swipeable on mobile. Overlay text needs a scrim on the image for contrast at every breakpoint." },
  { n: 3, title: "Intent router", body: "Three self-selection doors modelled on Atlas Copco: 'I need a compressor', 'I need service or parts' and 'I run a rental fleet'. The third door targets product rental companies buying portable compressors for their own fleets (HGAP does not offer rentals)." },
  { n: 4, title: "Product range", body: "The six agreed Products menu categories link into their category landing pages, the primary SEO landing routes. Counts are real SKU counts from ProductList-Marketing.xlsx. Stationary/Portable and Oil Flooded/Oil Free are two crossing taxonomies: a product appears in one of each pair without page duplication. Accessories SKU data still to be supplied." },
  { n: 5, title: "Our Brands", body: "HGAP's differentiator is the five-brand portfolio: Hitachi, Sullair, Champion, Bebicon and Air-One, all under Hitachi Group ownership. Each tile links to its own brand page." },
  { n: 6, title: "Dedicated AirLinx section", body: "Client-requested dedicated section for the AirLinx IoT platform: live dashboard placeholder, three capability tiles (live performance, fault alerts, energy reporting) and the real figure of 112 AirLinx-ready SKUs in the current catalogue. Competitor benchmark: CompAir gives iConn equivalent homepage prominence." },
  { n: 7, title: "Industries served", body: "Six industry tiles from the sitemap (Agriculture, Construction, Food & Beverage, Manufacturing, Mining, Pharmaceutical) route buyers by application and power internal linking to the industry pages." },
  { n: 8, title: "Insights (blogs)", body: "Blog section is titled Insights per the sitemap. Three latest articles feed SEO freshness and demonstrate expertise. Positioned before the final CTA per the agreed component order." },
  { n: 9, title: "Final CTA (centred)", body: "Single centred conversion moment closing the page, using the live site's own H2 ('Let us help you find the right compressor for your needs') and phone 1300 266 773." },
  { n: 11, title: "Mailing list signup (global)", body: "Minimal newsletter strip: one email field plus SUBSCRIBE, rendered as a global element directly above the footer on every template. GUTENBERG BUILD NOTE: genuinely native now. Build it once inside the footer template part, or as a synced pattern, and it appears on every template with no plugin and no per-page copies. Wire to the email platform with double opt-in; keep the single-field pattern and enrich profiles later via a preference centre." },
  { n: 10, title: "Hitachi brand system applied", body: "Hitachi Red #b1000e for primary CTAs and active states only; HITACHI mark leads the header lockup with the 'Global Air Power' wordmark subordinate and never red; sharp geometry (radius 0). CTA labels kept identical to the live site. Mobile-first: carousel swipeable, sections stack single-column, tap targets at least 44px." },
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
        code="Template 03 / Homepage - /"
        title="Homepage"
        desc="Responsive, mobile-first wireframe with a functioning mega menu (hover or click the nav), Hitachi-branded carousel hero, dedicated AirLinx section and the agreed component order ending in a centred CTA."
      />

      <div className="wf-sheet overflow-hidden">
        <div className="relative">
          <Note n={10} />
          <Note n={1} className="!-top-1 !left-24" />
          <WfGlobalHeader />
        </div>

        {/* Hero banner: FULL WIDTH carousel, four destinations.
            Full bleed inside the wireframe sheet: no side padding, image spans
            the whole width and the copy panel is overlaid on a scrim. */}
        <section
          className="relative border-b bg-foreground"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Note n={2} />

          {/* Full width media layer */}
          <div className="relative w-full min-h-[420px] lg:min-h-[520px]">
            <ImgPh
              key={cur.media}
              label=""
              className="absolute inset-0 !border-0 animate-in fade-in duration-300"
            />
            {/* Scrim so overlaid copy keeps contrast over any image */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/30 lg:to-transparent" />
            {/* Media placeholder caption sits bottom right, clear of the copy panel */}
            <span className="absolute bottom-4 left-4 lg:left-auto lg:right-14 z-10 max-w-[46%] font-mono text-[9px] uppercase tracking-wider text-muted-foreground bg-card/90 border px-2 py-1">
              {cur.media}
            </span>
            <span className="hidden md:block absolute top-4 left-4 z-10 font-mono text-[9px] uppercase tracking-wider text-muted-foreground bg-card border px-2 py-1">
              Full width banner / full bleed edge to edge
            </span>

            {/* Overlaid copy panel, constrained to a readable measure */}
            <div className="relative z-10 px-6 lg:px-14 py-16 lg:py-24 max-w-3xl">
              <div key={slide} className="animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] bg-primary text-primary-foreground px-2.5 py-1.5 mb-5">
                  {cur.kicker}
                </span>
                <h2 className="font-bold text-4xl lg:text-5xl leading-[1.08] max-w-2xl">
                  {cur.headline}
                </h2>
                <p className="text-sm lg:text-base text-muted-foreground mt-5 max-w-xl leading-relaxed">
                  {cur.copy}
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="bg-primary text-primary-foreground font-semibold text-sm px-7 py-4">
                    {cur.ctas[0]}
                  </span>
                  <span className="border-2 border-foreground bg-card font-medium text-sm px-7 py-4">
                    {cur.ctas[1]}
                  </span>
                </div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-4">
                  Slide links to {cur.target}
                </span>
              </div>
            </div>
          </div>

          {/* Trust strip under the banner, was inside the old split hero */}
          <div className="relative z-10 border-t bg-card px-6 lg:px-14 py-3.5 flex flex-wrap items-center gap-6 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Hitachi Group company
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> 6 AU branches
            </span>
            <span className="flex items-center gap-1.5">
              <Headset className="w-4 h-4" /> 24/7 support
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5" /> Watch: inside HGAP Australia
            </span>
          </div>

          {/* Carousel controls */}
          <div className="absolute bottom-16 right-4 lg:right-14 z-20 flex items-center gap-3">
            <button
              onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
              className="border-2 border-foreground bg-card p-2 hover:bg-secondary"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 bg-card border-2 border-foreground px-3 py-2.5">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to slide ${i + 1}: ${s.kicker}`}
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
          <span className="hidden md:block absolute top-4 right-4 z-20 font-mono text-[9px] uppercase text-muted-foreground bg-card border px-2 py-1">
            Slide {slide + 1}/{SLIDES.length} · auto 6s · hover = pause
          </span>
        </section>

        {/* Intent router */}
        <section className="relative border-b grid sm:grid-cols-3 divide-x bg-secondary/40">
          <Note n={3} />
          {[
            ["I need a compressor", "Find the right model by application, air demand and power.", "Browse and filter products"],
            ["I need service or parts", "Factory-trained technicians, genuine OEM parts, maintenance plans.", "Book a service"],
            ["I run a rental fleet", "Portable diesel compressors built to earn in rental fleets, with fleet pricing available.", "Explore the portable range"],
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

        {/* Product range */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={4} />
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="wf-kicker mb-1">Product range</p>
              <h3 className="font-bold text-xl">Every compressor, one catalogue</h3>
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
              <div key={c} className="bg-card border flex items-center gap-4 p-4 hover:bg-secondary/60 transition-colors duration-150">
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

        {/* Our Brands */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={5} />
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="wf-kicker mb-1">Our brands</p>
              <h3 className="font-bold text-xl">Five brands, one standard of support</h3>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              ["Hitachi", "Oil free scroll and screw technology for precision and clean-air applications."],
              ["Sullair", "Industrial and portable air compressors with legendary airend durability since 1965."],
              ["Champion", "Reliable workshop and light-industrial compressors built for Australian trades."],
              ["Bebicon", "Compact reciprocating piston compressors for workshop and light duty air."],
              ["Air-One", "Entry-level rotary screw packages for small business and trade use."],
            ].map(([b, s]) => (
              <div key={b} className="border p-5 group hover:bg-secondary transition-colors duration-150">
                <ImgPh label={`${b} logo`} className="h-12 w-full max-w-32 mb-4" />
                <p className="font-semibold">{b}</p>
                <p className="text-sm text-muted-foreground mt-1">{s}</p>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-3 text-primary">
                  Visit brand page <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Dedicated AirLinx section */}
        <section className="relative border-b bg-foreground text-background">
          <Note n={6} />
          <div className="grid lg:grid-cols-2">
            <div className="px-4 lg:px-8 py-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-background/60 mb-2">
                AirLinx remote monitoring
              </p>
              <h3 className="font-bold text-3xl max-w-md leading-tight">
                Your whole compressed air system, live on one dashboard
              </h3>
              <p className="text-sm text-background/70 mt-4 max-w-md leading-relaxed">
                AirLinx connects your compressors to the cloud so you can see
                performance, catch faults early and cut energy waste. 112 SKUs
                in the current range ship AirLinx-ready.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-7">
                {[
                  [Activity, "Live performance data"],
                  [BellRing, "Fault alerts, 24/7"],
                  [Gauge, "Energy reporting"],
                ].map(([Icon, t]: any) => (
                  <div key={t}>
                    <Icon className="w-5 h-5 mb-2 text-background/70" />
                    <p className="text-[13px] font-medium">{t}</p>
                  </div>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-8 text-primary-foreground bg-primary px-5 py-3">
                Explore AirLinx <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="relative min-h-64 border-t lg:border-t-0 lg:border-l border-white/15">
              <ImgPh
                label="AirLinx dashboard UI (live fleet view)"
                className="absolute inset-6 !bg-white/10 !border-white/25"
              />
            </div>
          </div>
        </section>

        {/* Service band */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="wf-kicker mb-1">Service and support</p>
              <h3 className="font-bold text-xl max-w-md">
                24/7 nationwide service, genuine parts, planned maintenance
              </h3>
              <div className="flex flex-wrap gap-6 mt-5">
                {[
                  [Headset, "24/7 breakdown response"],
                  [Wrench, "Factory-trained technicians"],
                  [Truck, "Genuine parts ex-stock AU"],
                ].map(([Icon, t]: any) => (
                  <span key={t} className="flex items-center gap-2 text-[13px] font-medium">
                    <Icon className="w-4 h-4 text-primary" /> {t}
                  </span>
                ))}
              </div>
            </div>
            <span className="border-2 border-foreground font-medium text-sm px-6 py-3 whitespace-nowrap">
              Explore service and parts
            </span>
          </div>
        </section>

        {/* Industries */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={7} />
          <p className="wf-kicker mb-1">Industries</p>
          <h3 className="font-bold text-xl mb-5">Engineered for your industry</h3>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
            {["Agriculture", "Construction", "Food & Beverage", "Manufacturing", "Mining", "Pharmaceutical"].map((i) => (
              <div key={i} className="border bg-card hover:bg-secondary transition-colors duration-150">
                <ImgPh label="Industry" className="h-20" />
                <p className="font-medium text-[13px] p-3">{i} →</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust stats band */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <div className="grid grid-cols-2 lg:grid-cols-4 border divide-x bg-secondary/30 text-center">
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

        {/* Insights (blogs, before final CTA per component order) */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
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
              ["Guide", "Choosing between fixed speed and VSD compressors"],
              ["News", "HGAP named in Hitachi global service awards"],
            ].map(([tag, t]) => (
              <div key={t} className="border bg-card hover:bg-secondary/50 transition-colors duration-150">
                <ImgPh label="Article image" className="h-28" />
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">{tag}</p>
                  <p className="font-medium text-[14px] leading-snug">{t}</p>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-primary mt-3">
                    Read article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA, centred */}
        <section className="relative bg-foreground text-background px-4 py-12 text-center">
          <Note n={9} />
          <h3 className="font-bold text-2xl">
            Let us help you find the right compressor for your needs
          </h3>
          <p className="text-sm text-background/70 mt-2 max-w-md mx-auto">
            Sizing, servicing or replacing: our engineers respond within one
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

        {/* Newsletter is now a minimal GLOBAL element rendered inside WfFooter
            on every template (annotation 11). */}
        <div className="relative">
          <Note n={11} />
          <WfFooter />
        </div>
      </div>
    </KitShell>
  );
}
