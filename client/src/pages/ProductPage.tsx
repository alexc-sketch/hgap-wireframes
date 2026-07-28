/*
 * STYLE: Blueprint Studio wireframe, Hitachi-branded (ideas.md)
 * 02 — Single Product template (example: VOC 90 V, real data from ProductList-Marketing.xlsx).
 * Hitachi Red #b1000e CTAs; sticky mobile quote bar (mobile-first B2B).
 * Tab bar scrolls to anchored sections (scroll effect, NOT sticky).
 * Radius 0, grayscale, amber CTAs only. Final CTA centred.
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
import {
  BadgeCheck,
  ChevronRight,
  Download,
  FileText,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
} from "lucide-react";

const NOTES: NoteDef[] = [
  { n: 1, title: "Breadcrumb from clean taxonomy", body: "Home > Products > Category > Series > Model — generated automatically from the new Product post type hierarchy using the agreed categories (Stationary / Portable / Oil Flooded / Oil Free). This model is Stationary + Oil Flooded; the breadcrumb shows its primary category and cross-lists in Oil Flooded. Today's flat root-level URLs cannot do this." },
  { n: 2, title: "Gallery from media library", body: "Main image + thumbnails drawn from the 1,395-attachment media library. Alt text migrated for SEO." },
  { n: 3, title: "Spec snapshot + conversion stack", body: "The four numbers a buyer checks first (power, flow, pressure, noise), then a clear action hierarchy: Request a Quote (primary) → Download Brochure (lead magnet) → Find a Branch (offline path)." },
  { n: 4, title: "Anchored section tabs", body: "Tab bar scrolls the page to each section (scroll effect). Not sticky — keeps the header area calm and predictable." },
  { n: 5, title: "Full specification table", body: "Powered by structured custom fields (JetEngine meta fields) populated directly from the client's spec sheet — every column here is a real field in ProductList-Marketing.xlsx (30 spec columns per SKU). The table shows the model plus its series siblings and the fixed-speed vs VSD variants, so pressure-variant SKUs live as table rows rather than separate pages (258 SKUs → ~150 model pages). DEV NOTE: render once in an Elementor Pro Theme Builder single template using dynamic tags, so all product pages share one maintained layout." },
  { n: 6, title: "Applications → industry pages", body: "Chips link to the 6 industry landing pages, strengthening internal linking and helping buyers self-qualify." },
  { n: 7, title: "Social proof", body: "Pull-quote from the 31 existing case studies plus client logo strip. Real proof, no fabricated testimonials." },
  { n: 8, title: "Related products by taxonomy", body: "Auto-queried from the same series/type — zero manual curation needed when new models are added." },
  { n: 9, title: "Salesforce-integrated enquiry form", body: "Form posts to CRM and redirects to a /thank-you/ page so ad and analytics conversion tracking keeps working. DEV NOTE: two options — (a) rebuild in Elementor Pro Forms with a webhook action to Salesforce Web-to-Lead (fewer plugins, styled natively in the builder), or (b) keep the existing Ninja Forms + Salesforce addon and restyle it. Prefer (a) unless the Salesforce field mapping proves complex; either way, re-test the /thank-you/ redirect and hidden UTM/GCLID fields after migration." },
  { n: 10, title: "Sticky mobile quote bar", body: "MOBILE-FIRST: on screens below lg, a bar fixed to the bottom of the viewport keeps 'Request a Quote' + 'Call' one thumb-tap away throughout the long spec page — B2B buyers on site visits often check specs from a phone next to the machine. ≥44px tap targets; hidden on desktop where the right-column conversion stack stays visible. Uses Hitachi Red for the primary action only." },
];

/* Real values from ProductList-Marketing.xlsx — the three VOC 90 V pressure-variant
   SKUs (rows in one table, not separate pages) plus the fixed-speed VOC 90 sibling. */
const SPECS: Array<[string, string, string, string, string]> = [
  ["Model / variant", "VOC 90 V · 7.5 bar (this page)", "VOC 90 V · 10 bar", "VOC 90 V · 13 bar", "VOC 90 (fixed speed)"],
  ["Part number", "1004-3878", "1004-3888", "1004-3879", "1004-3885 / -3887"],
  ["Motor power (kW / HP)", "90 / 125", "90 / 125", "90 / 125", "90 / 125"],
  ["Free air delivery (L/s · cfm)", "279 · 591", "239 · 505", "206 · 437", "206–279 · 437–591"],
  ["Max pressure (bar)", "7.5", "10", "13", "7.5 / 10 / 13"],
  ["Capacity control", "VSD", "VSD", "VSD", "Spiral Valve"],
  ["Start type", "VSD", "VSD", "VSD", "Wye-Delta"],
  ["IP rating / ambient", "IP54 · 50°C", "IP54 · 50°C", "IP54 · 50°C", "IP65 · 50°C"],
  ["Noise level dB(A)", "73", "73", "73", "73"],
  ["Dimensions L×W×H (mm)", "1995×1300×1970", "1995×1300×1970", "1995×1300×1970", "1995×1300×1970"],
  ["Weight (kg)", "1,950", "1,950", "1,950", "1,850"],
  ["Air outlet", "2\" BSP", "2\" BSP", "2\" BSP", "2\" BSP"],
  ["Lubrication / cooling", "Sullube · Air cooled", "Sullube · Air cooled", "Sullube · Air cooled", "Sullube · Air cooled"],
  ["Controller / connectivity", "Colour touchscreen · AirLinx", "Colour touchscreen · AirLinx", "Colour touchscreen · AirLinx", "Colour touchscreen · AirLinx"],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ProductPage() {
  return (
    <KitShell page="product" notes={NOTES}>
      <SheetTitle
        code="Template 02 / Single Product — /products/stationary/vocv-45-90/voc-90-v/"
        title="Single Product Page"
        desc="Responsive wireframe using a real model (Champion VOC 90 V, part 1004-3878) from the client's product list. Section tabs scroll to their anchors; on mobile a sticky quote bar keeps the CTA one tap away."
      />

      <div className="wf-sheet overflow-hidden">
        <WfUtilityBar />
        <WfHeader active="products" />

        {/* Breadcrumb */}
        <div className="relative border-b px-4 lg:px-8 py-3 bg-secondary/60">
          <Note n={1} className="!-top-1" />
          <p className="font-mono text-[11px] text-muted-foreground" data-no-lorem>
            Home <ChevronRight className="inline w-3 h-3" /> Products{" "}
            <ChevronRight className="inline w-3 h-3" /> Stationary Air Compressors{" "}
            <ChevronRight className="inline w-3 h-3" /> VOCV 45-90 Series{" "}
            <ChevronRight className="inline w-3 h-3" />{" "}
            <span className="text-foreground font-medium">VOC 90 V</span>{" "}
            <span className="text-muted-foreground">· also in: Oil Flooded</span>
          </p>
        </div>

        {/* Product hero */}
        <section className="grid lg:grid-cols-2 gap-8 px-4 lg:px-8 py-8 bg-card">
          {/* Gallery */}
          <div className="relative">
            <Note n={2} />
            <ImgPh label="Main product image (1200×900)" className="h-80" />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {["Angle 2", "Controls", "Open panel", "In situ"].map((t) => (
                <ImgPh key={t} label={t} className="h-16" />
              ))}
            </div>
          </div>

          {/* Buy panel */}
          <div className="relative flex flex-col">
            <Note n={3} />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground" data-no-lorem>
              Champion · VOCV 45-90 Series · Part 1004-3878
            </span>
            <h2 className="font-bold text-3xl mt-1 leading-tight" data-no-lorem>
              VOC 90 V Oil Flooded Screw Compressor
            </h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Value proposition — variable speed drive matches output to demand,
              cutting energy costs by up to 35% for variable-load plants.
            </p>

            <div className="grid grid-cols-4 border divide-x text-center mt-5" data-no-lorem>
              {[
                ["90", "kW power"],
                ["591", "cfm FAD"],
                ["7.5", "bar"],
                ["73", "dB(A)"],
              ].map(([v, u]) => (
                <div key={u} className="py-3">
                  <p className="font-bold text-lg">{v}</p>
                  <p className="font-mono text-[9px] uppercase text-muted-foreground">
                    {u}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 5-year airend warranty
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4" /> In stock — AU warehouse
              </span>
            </div>

            <div className="mt-6 space-y-2.5">
              <span className="block text-center bg-primary text-primary-foreground font-semibold text-sm py-3.5">
                Request a Quote
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <span className="flex items-center justify-center gap-2 border font-medium text-[13px] py-3">
                  <Download className="w-4 h-4" /> Download Brochure
                </span>
                <span className="flex items-center justify-center gap-2 border font-medium text-[13px] py-3">
                  <MapPin className="w-4 h-4" /> Find nearest branch
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section tabs — scroll to anchors, NOT sticky */}
        <nav className="relative border-y bg-secondary px-4 lg:px-8">
          <Note n={4} className="!-top-1" />
          <div className="flex gap-0 overflow-x-auto">
            {[
              ["Overview", "wf-overview"],
              ["Specifications", "wf-specs"],
              ["Features", "wf-features"],
              ["Downloads", "wf-downloads"],
              ["Related", "wf-related"],
            ].map(([label, id], i) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className={`font-medium text-[13px] px-5 py-3.5 whitespace-nowrap border-b-2 transition-colors duration-150 hover:bg-card ${
                  i === 0 ? "border-primary" : "border-transparent"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Overview */}
        <section id="wf-overview" className="grid lg:grid-cols-2 gap-8 px-4 lg:px-8 py-10 bg-card scroll-mt-16">
          <div>
            <p className="wf-kicker mb-1">Overview</p>
            <h3 className="font-bold text-xl mb-3">
              Built for continuous duty in Australian conditions
            </h3>
            <div className="space-y-2">
              {[100, 95, 88, 92, 60].map((w, i) => (
                <div key={i} className="h-3 bg-secondary" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="mt-5 space-y-2">
              {[90, 84, 96].map((w, i) => (
                <div key={i} className="h-3 bg-secondary" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
          <ImgPh label="Lifestyle / cutaway image" className="min-h-56" />
        </section>

        {/* Specs */}
        <section id="wf-specs" className="relative border-t px-4 lg:px-8 py-10 bg-secondary/40 scroll-mt-16">
          <Note n={5} />
          <p className="wf-kicker mb-1">Specifications</p>
          <h3 className="font-bold text-xl mb-5">VOCV 45-90 series — full specification</h3>
          <div className="overflow-x-auto" data-no-lorem>
            <table className="w-full border bg-card text-[13px]">
              <tbody>
                {SPECS.map((row, ri) => (
                  <tr key={ri} className={ri === 0 ? "bg-foreground text-background" : ri % 2 ? "bg-secondary/50" : ""}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`border px-4 py-2.5 ${ci === 0 ? "font-medium w-56" : "text-center"} ${
                          ri === 0 ? "font-mono text-[11px] uppercase tracking-wide" : ""
                        } ${ci === 1 && ri !== 0 ? "bg-primary/10 font-semibold" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-mono text-[10px] text-muted-foreground mt-2">
            Highlighted column = SKU being viewed. All values are real, from ProductList-Marketing.xlsx (JetEngine meta fields); the three pressure-variant SKUs of the VOC 90 V live as columns in one table — not separate pages — with the fixed-speed sibling for comparison.
          </p>
        </section>

        {/* Features */}
        <section id="wf-features" className="border-t px-4 lg:px-8 py-10 bg-card scroll-mt-16">
          <p className="wf-kicker mb-1">Features &amp; benefits</p>
          <h3 className="font-bold text-xl mb-5">Why the VOC 90 V</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Variable speed drive efficiency",
              "Direct drive — no belt losses",
              "IP54 motor · 50°C ambient rated",
              "Colour touchscreen controller",
              "Sullube fluid · air cooled",
              "AirLinx remote monitoring included",
            ].map((t) => (
              <div key={t} className="border p-4 flex gap-3">
                <span className="wf-img w-9 h-9 flex-none">
                  <span className="wf-img-label">icon</span>
                </span>
                <div>
                  <p className="font-semibold text-[13px]">{t}</p>
                  <div className="h-2 bg-secondary mt-2 w-11/12" />
                  <div className="h-2 bg-secondary mt-1 w-3/4" />
                </div>
              </div>
            ))}
          </div>

          {/* Applications */}
          <div className="relative border-t mt-8 pt-6">
            <Note n={6} />
            <p className="wf-kicker mb-3">Typical applications</p>
            <div className="flex flex-wrap gap-2">
              {["Mining", "Manufacturing", "Food & Beverage", "Pharmaceutical", "Drilling", "Agriculture"].map((c) => (
                <span key={c} className="border px-3.5 py-2 text-[13px] bg-secondary">
                  {c} →
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section id="wf-downloads" className="border-t px-4 lg:px-8 py-10 bg-secondary/40 scroll-mt-16">
          <p className="wf-kicker mb-1">Downloads</p>
          <h3 className="font-bold text-xl mb-5">Technical documents</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["Product brochure", "PDF · 2.4 MB"],
              ["Technical datasheet", "PDF · 640 KB"],
              ["Installation guide", "PDF · 1.1 MB"],
            ].map(([t, m]) => (
              <div key={t} className="bg-card border p-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium text-[13px]">{t}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{m}</p>
                </div>
                <Download className="w-4 h-4" />
              </div>
            ))}
          </div>
        </section>

        {/* Social proof */}
        <section className="relative border-t px-4 lg:px-8 py-10 bg-card">
          <Note n={7} />
          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-center">
            <div className="border-l-4 border-primary pl-5">
              <Quote className="w-5 h-5 text-muted-foreground mb-2" />
              <p className="text-lg font-medium leading-relaxed">
                Pull-quote from an existing HGAP case study — e.g. the Dulux
                Merrifield preventative maintenance story or ITO EN nitrogen
                generation install.
              </p>
              <p className="font-mono text-[11px] text-muted-foreground mt-3">
                — Source: /insights/ case study library (31 available)
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Client", "Client", "Client", "Client", "Client", "Client"].map((c, i) => (
                <ImgPh key={i} label={c} className="h-12" />
              ))}
            </div>
          </div>
        </section>

        {/* Related products */}
        <section id="wf-related" className="relative border-t px-4 lg:px-8 py-10 bg-secondary/40 scroll-mt-16">
          <Note n={8} />
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="wf-kicker mb-1">Related products</p>
              <h3 className="font-bold text-xl">More from the VOC / VOCV range</h3>
            </div>
            <span className="font-mono text-[11px] underline">View series →</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-no-lorem>
            {["VOC 45 V", "VOC 55 V", "VOC 75 V", "VOC 90 (fixed speed)"].map((m) => (
              <div key={m} className="bg-card border">
                <ImgPh label="Product image" className="h-28" />
                <div className="p-3">
                  <p className="font-semibold text-[13px]">{m} Oil Flooded Screw</p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-1">
                    Champion · Stationary
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enquiry form */}
        <section className="relative border-t px-4 lg:px-8 py-12 bg-card">
          <Note n={9} />
          <div className="max-w-2xl mx-auto">
            <h3 className="font-bold text-2xl text-center">
              Get a quote for the VOC 90 V
            </h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Form pre-fills the product name. Submissions sync to Salesforce and
              redirect to a thank-you page for conversion tracking.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {["Full name*", "Company", "Email*", "Phone*", "Postcode*", "Industry (select)"].map((f) => (
                <div key={f} className="border px-3 py-3 text-[13px] text-muted-foreground bg-secondary/50">
                  {f}
                </div>
              ))}
            </div>
            <div className="border px-3 py-3 text-[13px] text-muted-foreground bg-secondary/50 mt-3 h-20">
              Message / requirements
            </div>
            <div className="text-center mt-5">
              <span className="inline-block bg-primary text-primary-foreground font-semibold text-sm px-10 py-3.5">
                Submit enquiry →
              </span>
              <p className="font-mono text-[10px] text-muted-foreground mt-2">
                → redirects to /thank-you-voc/ (tracked conversion)
              </p>
            </div>
          </div>
        </section>

        <WfFooter />

        {/* Sticky mobile quote bar — wireframe representation (annotation 10).
            In production: position:fixed bottom bar < lg breakpoint. */}
        <div className="lg:hidden sticky bottom-0 z-30 border-t-2 border-foreground bg-card">
          <Note n={10} className="!-top-2 !left-2" />
          <div className="grid grid-cols-2">
            <span className="bg-primary text-primary-foreground font-bold text-[13px] min-h-[48px] flex items-center justify-center">
              Request a Quote
            </span>
            <span className="font-semibold text-[13px] min-h-[48px] flex items-center justify-center gap-1.5">
              <Phone className="w-4 h-4" /> 1300 266 773
            </span>
          </div>
        </div>
      </div>
    </KitShell>
  );
}
