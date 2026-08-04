/*
 * STYLE: Blueprint Studio wireframe, Hitachi-branded (ideas.md)
 * 02 - Single Product template (example: VOC 90 V, real data from ProductList-Marketing.xlsx).
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
  ShieldCheck,
} from "lucide-react";

const NOTES: NoteDef[] = [
  { n: 1, title: "Breadcrumb from clean taxonomy", body: "Home > Products > Category > Series > Model - generated automatically from the new Product post type hierarchy using the agreed categories (Stationary / Portable / Oil Flooded / Oil Free). This model is Stationary + Oil Flooded; the breadcrumb shows its primary category and cross-lists in Oil Flooded. Today's flat root-level URLs cannot do this." },
  { n: 2, title: "Gallery from media library", body: "Main image + thumbnails drawn from the 1,395-attachment media library. Alt text migrated for SEO." },
  { n: 3, title: "Spec snapshot + conversion stack", body: "The four numbers a buyer checks first (power, flow, pressure, noise), then a clear action hierarchy: Request a Quote (primary, scrolls to the quote form) → Download Brochure (lead magnet) → Find a Branch (offline path). Request a Quote is the CTA on every template." },
  { n: 4, title: "Anchored section tabs", body: "Tab bar scrolls the page to each section (scroll effect). Not sticky - keeps the header area calm and predictable." },
  { n: 5, title: "Specifications as ACF Groups, not a matrix", body: "ACF PRO BUILD SPEC. The old layout put each variant in a COLUMN, which is awkward in ACF because the template has to transpose rows of labels against a variable number of columns. This version uses four ACF Group fields (spec_performance, spec_drive, spec_physical, spec_controls), each holding plain named sub fields (number or text or select). The editor sees an ordinary tabbed form; the template renders each group as a two column label and value list, which is a flat get_field loop with no transposition. Values map 1:1 to the columns in ProductList-Marketing.xlsx. Add an optional repeater additional_specs (label, value) for attributes only some models carry. Use an ACF Clone field so the same spec block is reused across every product post type without redefining fields. Works identically whether the product is a custom post type with ACF or a WooCommerce product in catalogue mode. GUTENBERG: this pattern is unchanged by the move to Gutenberg. ACF Blocks is a PHP framework (no React required), field groups attach to a block through Location rules, and get_field and have_rows behave exactly as in classic theme templates. Build each section as an ACF Block with its own PHP template so editors get live previews in the editor. One caveat: ACF Blocks are not compatible with the standalone Gutenberg beta plugin, so use the editor bundled with WordPress core." },
  { n: 11, title: "Variant repeater: one row per SKU", body: "ACF PRO BUILD SPEC. Repeater field variants with sub fields variant_label, part_number, max_pressure_bar, fad_ls, fad_cfm, capacity_control. Each row is one SKU, so the template is a single while (have_rows('variants')) loop writing a table row: the natural direction of an ACF loop. Because variants are rows, a model with two variants and a model with six use the same template with no conditional column logic. Enable the ACF 6.0 repeater Pagination setting if any series grows long, and do not nest repeaters (pagination is unsupported inside nested repeaters and admin load slows noticeably). Selecting a row passes its part_number into the Request a Quote form. This keeps 258 SKUs inside roughly 150 model pages instead of 258 thin pages." },
  { n: 6, title: "Applications → industry pages", body: "Chips link to the 6 industry landing pages, strengthening internal linking and helping buyers self-qualify." },
  { n: 8, title: "Related products by taxonomy", body: "Positioned below the quote form per client direction: the page drives to the quote request first, then offers sideways moves within the same series/type. Auto-queried by taxonomy (native WooCommerce related products or an ACF taxonomy query) - zero manual curation needed when new models are added. GUTENBERG: use a core Query Loop block filtered by taxonomy with a custom post template, which needs no custom code for this simple case." },
  { n: 9, title: "Salesforce-integrated quote form", body: "Request a Quote form posts to CRM and redirects to a /thank-you/ page so ad and analytics conversion tracking keeps working. The product name pre-fills from the ACF/WooCommerce product context. GUTENBERG BUILD NOTE: there is no page-builder form widget in this stack, so pick a block-native forms plugin. Recommended: Gravity Forms, WS Form or Fluent Forms, each of which ships a Gutenberg block, supports hidden fields, conditional logic and a webhook or Salesforce action for Web-to-Lead. Keeping the existing Ninja Forms plus Salesforce addon and restyling it also remains valid and avoids re-mapping CRM fields. Whichever is chosen, place the form inside an ACF Block or a synced pattern so product context pre-fills from the post, and re-test the /thank-you/ redirect and the hidden UTM and GCLID fields after migration." },
  { n: 10, title: "Sticky mobile quote bar", body: "MOBILE-FIRST: on screens below lg, a bar fixed to the bottom of the viewport keeps 'Request a Quote' + 'Call' one thumb-tap away throughout the long spec page - B2B buyers on site visits often check specs from a phone next to the machine. At least 44px tap targets; hidden on desktop where the right-column conversion stack stays visible. Uses Hitachi Red for the primary action only." },
];

/* ACF PRO FRIENDLY SHAPE (real values from ProductList-Marketing.xlsx).
   Pattern A: shared model specs as grouped label:value pairs. Each group below maps
   to one ACF Group field holding plain named sub fields, so the editor sees a normal
   form and the template renders a simple 2-column list. No matrix, no transposition. */
const SPEC_GROUPS: Array<{ group: string; acf: string; rows: Array<[string, string]> }> = [
  {
    group: "Performance",
    acf: "spec_performance",
    rows: [
      ["Motor power (kW / HP)", "90 / 125"],
      ["Free air delivery (L/s)", "279"],
      ["Free air delivery (cfm)", "591"],
      ["Max pressure (bar)", "7.5"],
      ["Noise level dB(A)", "73"],
    ],
  },
  {
    group: "Motor and drive",
    acf: "spec_drive",
    rows: [
      ["Capacity control", "VSD"],
      ["Start type", "VSD"],
      ["Drive type", "Direct drive"],
      ["IP rating", "IP54"],
      ["Max ambient", "50 degrees C"],
    ],
  },
  {
    group: "Physical",
    acf: "spec_physical",
    rows: [
      ["Length (mm)", "1995"],
      ["Width (mm)", "1300"],
      ["Height (mm)", "1970"],
      ["Weight (kg)", "1,950"],
      ["Air outlet", '2" BSP'],
    ],
  },
  {
    group: "Controls and fluids",
    acf: "spec_controls",
    rows: [
      ["Controller", "Colour touchscreen"],
      ["Connectivity", "AirLinx remote monitoring"],
      ["Lubricant", "Sullube"],
      ["Cooling", "Air cooled"],
      ["Warranty", "5 year airend"],
    ],
  },
];

/* Pattern B: the pressure variants as an ACF Repeater. ONE ROW PER VARIANT, so the
   template is a single `while (have_rows('variants'))` loop writing <tr> elements.
   Only the attributes that actually differ between variants live here. */
const VARIANT_COLUMNS = ["Variant", "Part number", "Max pressure (bar)", "FAD (L/s)", "FAD (cfm)", "Capacity control"];
const VARIANTS: Array<{ cells: string[]; current?: boolean }> = [
  { cells: ["VOC 90 V", "1004-3878", "7.5", "279", "591", "VSD"], current: true },
  { cells: ["VOC 90 V", "1004-3888", "10", "239", "505", "VSD"] },
  { cells: ["VOC 90 V", "1004-3879", "13", "206", "437", "VSD"] },
  { cells: ["VOC 90 (fixed speed)", "1004-3885", "7.5", "279", "591", "Spiral Valve"] },
  { cells: ["VOC 90 (fixed speed)", "1004-3887", "10", "239", "505", "Spiral Valve"] },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ProductPage() {
  return (
    <KitShell page="product" notes={NOTES}>
      <SheetTitle
        code="Template 02 / Single Product - /products/stationary/vocv-45-90/voc-90-v/"
        title="Single Product Page"
        desc="Responsive wireframe using a real model (Champion VOC 90 V, part 1004-3878) from the client's product list. Section tabs scroll to their anchors; on mobile a sticky quote bar keeps the CTA one tap away. Related products sit below the quote form."
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
              Value proposition - variable speed drive matches output to demand,
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
                <BadgeCheck className="w-4 h-4" /> In stock - AU warehouse
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

        {/* Section tabs - scroll to anchors, NOT sticky */}
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
          <h3 className="font-bold text-xl mb-1">VOC 90 V specifications</h3>
          <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
            Grouped label and value pairs. Each panel is one ACF Group field holding plain
            named sub fields, so editors fill in an ordinary form and the template renders a
            simple two column list.
          </p>

          <div className="grid md:grid-cols-2 gap-4" data-no-lorem>
            {SPEC_GROUPS.map((g) => (
              <div key={g.group} className="border bg-card">
                <div className="flex items-baseline justify-between gap-3 border-b px-4 py-2.5 bg-secondary/60">
                  <p className="font-semibold text-[13px]">{g.group}</p>
                  <code className="font-mono text-[10px] text-muted-foreground">{g.acf}</code>
                </div>
                <dl className="divide-y">
                  {g.rows.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 px-4 py-2.5 text-[13px]">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div className="relative mt-8 pt-6 border-t">
            <Note n={11} />
            <p className="wf-kicker mb-1">Variants in this series</p>
            <h4 className="font-bold text-lg mb-1">Compare pressure variants</h4>
            <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
              One row per variant instead of one column. This is exactly how an ACF Repeater
              loops, so the build is a single loop and the number of variants can differ from
              model to model without touching the template.
            </p>
            <div className="overflow-x-auto" data-no-lorem>
              <table className="w-full border bg-card text-[13px]">
                <thead>
                  <tr className="bg-foreground text-background">
                    {VARIANT_COLUMNS.map((c) => (
                      <th
                        key={c}
                        className="border px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-wide font-normal whitespace-nowrap"
                      >
                        {c}
                      </th>
                    ))}
                    <th className="border px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-wide font-normal">
                      Quote
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {VARIANTS.map((v) => (
                    <tr key={v.cells[1]} className={v.current ? "bg-primary/10 font-semibold" : ""}>
                      {v.cells.map((cell, ci) => (
                        <td key={ci} className="border px-4 py-2.5 whitespace-nowrap">
                          {cell}
                          {ci === 0 && v.current ? (
                            <span className="font-mono text-[10px] text-primary ml-2">this page</span>
                          ) : null}
                        </td>
                      ))}
                      <td className="border px-4 py-2.5">
                        <span className="font-mono text-[10px] text-primary underline whitespace-nowrap">Select</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground mt-2">
              Highlighted row = the SKU being viewed. Selecting a variant carries its part number into the quote form. All values real, from ProductList-Marketing.xlsx.
            </p>
          </div>

          <div className="mt-6 border bg-card p-4" data-no-lorem>
            <p className="font-semibold text-[13px] mb-1">Additional specifications (optional repeater)</p>
            <p className="text-[13px] text-muted-foreground">
              A simple ACF Repeater of label and value pairs catches the long tail of attributes
              that only some models carry, so content entry is never blocked by a field that does
              not exist yet.
            </p>
          </div>
        </section>

        {/* Features */}
        <section id="wf-features" className="border-t px-4 lg:px-8 py-10 bg-card scroll-mt-16">
          <p className="wf-kicker mb-1">Features &amp; benefits</p>
          <h3 className="font-bold text-xl mb-5">Why the VOC 90 V</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Variable speed drive efficiency",
              "Direct drive - no belt losses",
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

        {/* Enquiry form */}
        <section className="relative border-t px-4 lg:px-8 py-12 bg-card">
          <Note n={9} />
          <div className="max-w-2xl mx-auto">
            <h3 className="font-bold text-2xl text-center">
              Request a quote for the VOC 90 V
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
                Request a Quote →
              </span>
              <p className="font-mono text-[10px] text-muted-foreground mt-2">
                → redirects to /thank-you-voc/ (tracked conversion)
              </p>
            </div>
          </div>
        </section>

        {/* Related products - below the enquiry form per client direction */}
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

        <WfFooter />

        {/* Sticky mobile quote bar - wireframe representation (annotation 10).
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
