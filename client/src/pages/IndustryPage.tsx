/*
 * STYLE: Blueprint Studio wireframe kit (ideas.md)
 * Template 07 — Industry Page (/industries/mining/), Mining & Resources example.
 * Repeats for all 6 industry terms. Pairs the shared Industry taxonomy with
 * case studies, recommended ranges and a pre-filtered product link.
 */
import {
  KitShell,
  Note,
  type NoteDef,
  WfGlobalHeader,
  WfFooter,
  ImgPh,
  SheetTitle,
} from "@/components/WireframeKit";
import { ArrowRight, Check, ChevronRight, Quote } from "lucide-react";

const CHALLENGES = [
  ["Remote, off-grid sites", "Diesel-driven portable air rated for heat, dust and altitude."],
  ["Abrasive dust & heat", "Heavy-duty filtration and cooling packages as standard."],
  ["Downtime costs $/minute", "24/7 breakdown response from 8 branches + AirLinx remote monitoring."],
  ["Compliance & safety", "Machines specified to site safety standards, with documentation."],
];

const RANGES = [
  {
    name: "Portable / Diesel — 375–425 Series & 900H",
    spec: "375–900 cfm · towable · Tier-rated diesel",
    use: "Drilling, blasting, pipeline work on remote sites",
  },
  {
    name: "Oil Flooded Screw — Sullair fixed speed & VSD",
    spec: "5–500 kW · 6–13 bar · VSD options",
    use: "Fixed plant air for processing and workshops",
  },
  {
    name: "Air Treatment & Filtration",
    spec: "Dryers · filters · condensate management",
    use: "Protecting instruments and pneumatics from dust and moisture",
  },
];

const NOTES: NoteDef[] = [
  { n: 1, title: "Industry hero", body: "Application-specific value proposition ('air compressors for mining') targeting the exact search query this page exists to rank for. Breadcrumb ties it back to the /industries/ hub." },
  { n: 2, title: "Challenges → solutions", body: "Speaks the buyer's language before showing products: each mining pain point maps to an HGAP capability. Content differs per industry — this is what makes the template feel bespoke rather than templated." },
  { n: 3, title: "Recommended ranges", body: "Not the full catalogue — the 2–3 product families this industry actually specifies, each linking to its category page. Driven editorially per industry, so specialists curate rather than dump products." },
  { n: 4, title: "Pre-filtered product link", body: "Deep-links into the Product List with the Industry facet pre-applied (/products/?industry=mining) — the shared taxonomy at work. One tag on a product powers this page, the filter and the homepage tiles." },
  { n: 5, title: "Industry case study", body: "Proof in context: a story from THIS industry, not generic testimonials. Case studies are tagged with the same Industry taxonomy, so this block auto-populates." },
  { n: 6, title: "Explore other industries", body: "Quick links to the sibling industry pages keep buyers in the application-led journey and distribute internal link equity across all 6 pages." },
];

export default function IndustryPage() {
  return (
    <KitShell page="industry" notes={NOTES}>
      <SheetTitle
        code="Template 07 · /industries/mining/"
        title="Industry Page — Mining & Resources"
        desc="Repeats for all 6 industries. Challenges → recommended ranges → pre-filtered products → industry case study, all driven by the shared Industry taxonomy."
      />
      <div className="wf-sheet overflow-hidden">
        <WfGlobalHeader active="Industries" />

        {/* Breadcrumb */}
        <div className="px-4 lg:px-8 py-2.5 border-b font-mono text-[11px] text-muted-foreground">
          Home / Industries / <span className="text-foreground">Mining &amp; Resources</span>
        </div>

        {/* 1 · Hero */}
        <section className="relative border-b">
          <Note n={1} />
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <p className="wf-kicker mb-3">Industry · Mining &amp; Resources</p>
              <h1 className="font-bold text-3xl lg:text-4xl leading-tight">
                Air compressors for mining
              </h1>
              <p className="text-muted-foreground mt-4 max-w-md">
                Value proposition — portable diesel air for the pit, fixed plant
                air for processing, and 24/7 support wherever the site is.
              </p>
              <div className="flex gap-3 mt-6">
                <span className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-3">
                  Talk to a mining specialist
                </span>
                <span className="border text-sm font-semibold px-5 py-3">
                  View mining products
                </span>
              </div>
            </div>
            <ImgPh label="Industry hero media — portable compressor on mine site (video slot)" className="min-h-[260px]" />
          </div>
        </section>

        {/* 2 · Challenges → solutions */}
        <section className="relative p-8 lg:p-12 border-b">
          <Note n={2} />
          <p className="wf-kicker mb-1">Why mining is different</p>
          <h2 className="font-bold text-2xl mb-6">
            Built for the conditions your site throws at it
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {CHALLENGES.map(([challenge, solution]) => (
              <div key={challenge} className="border bg-card p-5 flex gap-4">
                <span className="flex-none w-8 h-8 border flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </span>
                <div>
                  <h3 className="font-semibold text-sm">{challenge}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 · Recommended ranges */}
        <section className="relative p-8 lg:p-12 border-b bg-secondary">
          <Note n={3} />
          <p className="wf-kicker mb-1">Recommended for mining</p>
          <h2 className="font-bold text-2xl mb-6">The ranges mine sites specify</h2>
          <div className="space-y-3">
            {RANGES.map((r) => (
              <div key={r.name} className="border bg-card grid md:grid-cols-[160px_1fr_auto] gap-4 items-center p-4">
                <ImgPh label="Range media" className="h-24" />
                <div>
                  <h3 className="font-bold text-base">{r.name}</h3>
                  <p className="font-mono text-[11px] text-muted-foreground mt-1">{r.spec}</p>
                  <p className="text-sm text-muted-foreground mt-1.5">{r.use}</p>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap pr-2">
                  View range <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
          {/* 4 · Pre-filtered link */}
          <div className="relative border border-dashed border-primary/60 bg-card mt-6 p-5 flex flex-wrap items-center justify-between gap-4">
            <Note n={4} />
            <div>
              <p className="font-semibold text-sm">See all 34 products tagged Mining</p>
              <p className="font-mono text-[11px] text-muted-foreground mt-1">
                → /products/?industry=mining (Industry facet pre-applied)
              </p>
            </div>
            <span className="bg-foreground text-background text-sm font-semibold px-5 py-2.5">
              Browse mining products
            </span>
          </div>
        </section>

        {/* 5 · Industry case study */}
        <section className="relative p-8 lg:p-12 border-b">
          <Note n={5} />
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="wf-kicker mb-2">Mining case study</p>
              <Quote className="w-6 h-6 text-primary mb-3" />
              <h2 className="font-bold text-xl leading-snug">
                "Outcome-led pull quote from a mining client — uptime, fuel
                saving or response time."
              </h2>
              <p className="text-sm text-muted-foreground mt-3">
                Supporting line — site, equipment installed, measurable result.
                Auto-populated from case studies tagged 'Mining' in the shared
                Industry taxonomy.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4">
                Read the full story <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <ImgPh label="Case study media — site photo" className="min-h-[220px]" />
          </div>
        </section>

        {/* Final CTA — centred */}
        <section className="relative p-10 lg:p-14 text-center border-b">
          <h2 className="font-bold text-2xl">Spec air for your site</h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Closing line — tell us the application, duty cycle and location;
            we'll recommend and price the right system.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <span className="bg-primary text-primary-foreground text-sm font-semibold px-6 py-3">
              Request a quote
            </span>
            <span className="border text-sm font-semibold px-6 py-3">
              Call 1300 266 773
            </span>
          </div>
        </section>

        {/* 6 · Explore other industries */}
        <section className="relative px-8 lg:px-12 py-6 border-b bg-secondary">
          <Note n={6} />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="wf-kicker">Explore industries</span>
            {["Manufacturing", "Food & Beverage", "Pharmaceutical", "Construction & Civil", "Agriculture"].map((i) => (
              <span key={i} className="flex items-center gap-1 text-sm font-medium">
                {i} <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              </span>
            ))}
          </div>
        </section>

        <WfFooter />
      </div>
    </KitShell>
  );
}
