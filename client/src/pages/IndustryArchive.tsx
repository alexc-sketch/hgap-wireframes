/*
 * STYLE: Blueprint Studio wireframe kit (ideas.md)
 * Template 06: Industry Archive (/industries/)
 * Hub page listing all industries HGAP serves; routes buyers by application.
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
import { ArrowRight, ChevronRight, Quote } from "lucide-react";

const INDUSTRIES = [
  {
    name: "Mining & Resources",
    blurb: "Portable diesel air for drilling, blasting and remote sites; fixed plant air for processing.",
    products: "Portable / Diesel · Oil Flooded Screw",
    count: 34,
  },
  {
    name: "Manufacturing",
    blurb: "Reliable plant air for tools, actuation and production lines with energy-saving VSD options.",
    products: "Oil Flooded Screw · Air Treatment",
    count: 52,
  },
  {
    name: "Food & Beverage",
    blurb: "Oil free, contaminant-safe compressed air for processing, packaging and bottling.",
    products: "Oil Free · Air Treatment · Nitrogen",
    count: 27,
  },
  {
    name: "Pharmaceutical",
    blurb: "Validated clean air systems meeting stringent air-quality classes for critical processes.",
    products: "Oil Free · Air Treatment",
    count: 19,
  },
  {
    name: "Construction & Civil",
    blurb: "Towable diesel compressors for tools, shotcrete and pipeline testing on any site.",
    products: "Portable / Diesel",
    count: 23,
  },
  {
    name: "Agriculture",
    blurb: "Dependable air for irrigation control, grain handling and on-farm workshops.",
    products: "Oil Flooded Screw · Portable",
    count: 16,
  },
];

const NOTES: NoteDef[] = [
  { n: 1, title: "Industries page template", body: "Build as page-industries.html with the global header and footer template parts locked. The hero, process band and final CTA are registered patterns, so the approved compositions can be reused without opening the layout." },
  { n: 2, title: "Dynamic Industry term grid", body: "One server rendered dynamic block queries the Industry taxonomy. ACF term fields supply the tile image, short description and recommended product families; the product count comes from Product posts assigned to that term. The same term record powers this hub, the mega menu, homepage tiles and the Product Filter block." },
  { n: 3, title: "How we work pattern", body: "Register the audit, specify, install and maintain band as a locked block pattern. Editors can change approved copy and links while the sequence, spacing and responsive behaviour remain controlled." },
  { n: 4, title: "Featured Insight Query Loop", body: "Use a Query Loop filtered to a featured Industry Insight, with the post template registered once. This avoids a manually duplicated case study card and keeps the content source consistent." },
  { n: 5, title: "Taxonomy and filter role", body: "The Industry taxonomy creates the six crawlable landing pages and also feeds the custom ACF Product Filter block. Links use the same query parameter contract, for example /products/?industry=mining, so archive navigation and filtering cannot drift apart." },
];

export default function IndustryArchive() {
  return (
    <KitShell page="industries" notes={NOTES}>
      <SheetTitle
        code="Template 06 · /industries/"
        title="Industry Archive"
        desc="Hub page routing buyers by application. One tile per term in the shared Industry taxonomy, using the same tags that power the product filter and homepage tiles."
      />
      <div className="wf-sheet overflow-hidden">
        <WfGlobalHeader active="Industries" />

        {/* 1 · Hero */}
        <section className="relative border-b">
          <Note n={1} />
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <p className="wf-kicker mb-3">Industries we serve</p>
              <h1 className="font-bold text-3xl lg:text-4xl leading-tight">
                Compressed air, specified for your industry
              </h1>
              <p className="text-muted-foreground mt-4 max-w-md">
                Positioning line: from mine sites to bottling lines, HGAP engineers
                match Sullair, Champion and Hitachi air systems to the demands of
                each application.
              </p>
              <div className="flex gap-3 mt-6">
                <span className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-3">
                  Talk to an industry specialist
                </span>
              </div>
            </div>
            <ImgPh label="Archive hero media: split industry montage (mine site / production line)" className="min-h-[260px]" />
          </div>
        </section>

        {/* 2 · Industry tile grid */}
        <section className="relative p-8 lg:p-12 border-b">
          <Note n={2} />
          <p className="wf-kicker mb-1">Choose your industry</p>
          <h2 className="font-bold text-2xl mb-6">Six application-led entry points</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="border bg-card flex flex-col hover:border-foreground/40 transition-colors duration-150">
                <ImgPh label={`${ind.name} media (16:9)`} className="h-32" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-base">{ind.name}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground whitespace-nowrap">
                      {ind.count} products
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 flex-1">{ind.blurb}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-3">
                    {ind.products}
                  </p>
                  <span className="flex items-center gap-1.5 text-sm font-semibold mt-4">
                    View industry page <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 · How we work */}
        <section className="relative p-8 lg:p-12 border-b bg-secondary">
          <Note n={3} />
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="wf-kicker mb-1">How we work</p>
              <h2 className="font-bold text-2xl mb-5">Same process, every industry</h2>
              <div className="grid sm:grid-cols-4 gap-3">
                {["Air audit & demand analysis", "System specification", "Install & commission", "Maintain & monitor (AirLinx)"].map((s, i) => (
                  <div key={s} className="border bg-card p-4">
                    <span className="font-mono text-[10px] text-muted-foreground">STEP {i + 1}</span>
                    <p className="text-sm font-semibold mt-1.5">{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border bg-card p-6 max-w-xs">
              <p className="font-semibold text-sm">Industry not listed?</p>
              <p className="text-sm text-muted-foreground mt-1.5">
                Catch-all line: our engineers spec air systems for any application.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold mt-3">
                Contact an engineer <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </section>

        {/* 4 · Featured case study */}
        <section className="relative p-8 lg:p-12 border-b">
          <Note n={4} />
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <ImgPh label="Case study media: Dulux Merrifield facility" className="min-h-[220px]" />
            <div>
              <p className="wf-kicker mb-2">Featured case study</p>
              <Quote className="w-6 h-6 text-primary mb-3" />
              <h2 className="font-bold text-xl leading-snug">
                "Pull-quote from the Dulux Merrifield project: outcome-led, one
                sentence."
              </h2>
              <p className="text-sm text-muted-foreground mt-3">
                Supporting line: what was installed, the measurable result
                (uptime / energy saving), and the industry it belongs to.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4">
                Read the full story <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </section>

        {/* Final CTA, centred */}
        <section className="relative p-10 lg:p-14 text-center border-b">
          <Note n={5} />
          <h2 className="font-bold text-2xl">Not sure where to start?</h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Closing line: tell us your application and air demand, and we'll
            recommend the right system.
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

        <WfFooter />
      </div>
    </KitShell>
  );
}
