/*
 * STYLE: Blueprint Studio wireframe (ideas.md)
 * 05 / Category page template. Example category: Oil Free Air Compressors.
 * Real counts from ProductList-Marketing.xlsx: 58 models, 85 SKUs, 17 series, 3 brands.
 * Grayscale, radius 0. Sits between the homepage and the filtered product list.
 * Order: content, Insights, Final CTA (centred), FAQs, Newsletter (global), Footer.
 * COPY: real English, influenced by hitachiglobalairpower.au /products/oil-free/. No em dashes.
 * BUILD: Gutenberg block theme, ACF Pro fields, Query Loop plus a faceting plugin.
 */
import {
  KitShell,
  Note,
  WfGlobalHeader,
  WfFooter,
  ImgPh,
  SheetTitle,
  type NoteDef,
} from "@/components/WireframeKit";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";

const NOTES: NoteDef[] = [
  {
    n: 1,
    title: "Category hero as SEO landing",
    body: "H1 targets the category keyword. This template serves every Products menu category. Note the taxonomy crosses two axes: Stationary or Portable (configuration) and Oil Free or Oil Flooded (air type). A model appears under both without duplicate pages because the two taxonomies handle the cross listing. Live counts read from the taxonomy, not typed by an editor.",
  },
  {
    n: 2,
    title: "Why choose this category",
    body: "Four benefit tiles as an ACF repeater. This mirrors the structure already proven on the live oil free page and is the block most likely to earn a featured snippet, so the copy should stay answer shaped.",
  },
  {
    n: 3,
    title: "Technology tiles",
    body: "Splits 58 models by the technology a buyer actually chooses between: rotary screw, scroll, piston and portable. Each tile opens the product list with the air type and technology facets pre applied. A faceting plugin is required because the core Query Loop block cannot facet on meta values by itself.",
  },
  {
    n: 4,
    title: "Series listing with real spec ranges",
    body: "Series rows show real kW, pressure and flow ranges from the client spreadsheet so buyers pick a family before a model. Data comes from the same ACF fields as the product pages, so there is no duplicate content entry.",
  },
  {
    n: 5,
    title: "Selection guide block",
    body: "Editorial guidance for unsure visitors. Oil free buyers are usually driven by a compliance or contamination requirement, so the guide leads with air quality class rather than price.",
  },
  {
    n: 6,
    title: "Industries served",
    body: "Oil free demand is industry led. Linking to the industry pages from here builds the internal linking structure between the product and industry taxonomies.",
  },
  {
    n: 7,
    title: "Insights before the final CTA",
    body: "Category relevant articles in the agreed component order: Insights, Final CTA, FAQs, Newsletter, Footer.",
  },
  {
    n: 8,
    title: "Final CTA, centred",
    body: "Standard centred conversion block. Request a Quote is always the primary CTA.",
  },
  {
    n: 9,
    title: "FAQ accordion, schema ready",
    body: "Category FAQs marked up with FAQPage schema for rich results, placed after the final CTA per the agreed order.",
  },
  {
    n: 10,
    title: "Newsletter is a global element",
    body: "The minimal subscribe strip is a template part rendered above the footer site wide, so it is not rebuilt per page.",
  },
];

const SERIES = [
  ["DSP Series", "Hitachi", "30 to 240 kW", "7 to 10 bar", "Fixed speed plant air", "14 models"],
  ["DSPV Series", "Hitachi", "37 to 240 kW", "7 to 10 bar", "Variable speed, fluctuating demand", "6 models"],
  ["SRL Scroll Series", "Hitachi", "1.5 to 33 kW", "7 to 10 bar", "Labs, dental, small clean rooms", "16 models"],
  ["DS and DSV Series", "Sullair", "55 and 75 kW", "8.5 to 10.3 bar", "Air or water cooled plant air", "16 models"],
  ["Oil Free Bebicon", "Bebicon", "Piston", "Up to 10 bar", "Intermittent light duty", "3 models"],
  ["OFE and OFD 1550", "Sullair", "298 and 403 kW", "10 bar", "Portable oil free site work", "2 models"],
];

export default function CategoryPage() {
  return (
    <KitShell page="category" notes={NOTES}>
      <SheetTitle
        code="Template 05 / Category page, /products/oil-free/"
        title="Product Category Page"
        desc="Responsive wireframe using Oil Free Air Compressors as the worked example, with real catalogue data (58 models, 85 SKUs, 17 series across Hitachi, Sullair and Bebicon). The same structure serves every Products menu category."
      />

      <div className="wf-sheet overflow-hidden">
        <WfGlobalHeader active="All Products" />

        {/* Breadcrumb */}
        <div className="border-b px-4 lg:px-8 py-3 bg-secondary/60">
          <p className="font-mono text-[11px] text-muted-foreground" data-no-lorem>
            Home <ChevronRight className="inline w-3 h-3" /> Products{" "}
            <ChevronRight className="inline w-3 h-3" />{" "}
            <span className="text-foreground font-medium">Oil Free Air Compressors</span>
          </p>
        </div>

        {/* Category hero */}
        <section className="relative grid lg:grid-cols-[1fr_380px] gap-8 border-b bg-card px-4 lg:px-8 py-10">
          <Note n={1} />
          <div>
            <h2 className="font-bold text-3xl leading-tight">
              Oil Free Air Compressors
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed">
              Hitachi Global Air Power supplies a versatile range of oil free
              compressors engineered for industries that demand completely clean,
              contaminant free air. The range covers rotary screw, scroll and
              piston technology from 1.5 kW laboratory machines to 403 kW
              portable units, so the same air quality standard is available at
              every scale of operation.
            </p>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed">
              These machines suit food and beverage production, pharmaceuticals,
              electronics manufacturing and other critical environments where
              oil free compressed air is essential.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-3">
                View all oil free models
              </span>
              <span className="border font-medium text-sm px-6 py-3">
                Help me choose
              </span>
            </div>
            <div className="flex flex-wrap gap-6 mt-7 font-mono text-[11px] uppercase text-muted-foreground">
              <span>58 models, 85 SKUs</span>
              <span>1.5 to 403 kW</span>
              <span>7 to 10.3 bar</span>
              <span>3 brands</span>
            </div>
          </div>
          <ImgPh label="Category hero image, oil free installation" className="min-h-52" />
        </section>

        {/* Why choose oil free */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={2} />
          <p className="wf-kicker mb-1">The case for oil free</p>
          <h3 className="font-bold text-xl mb-5">Why choose an oil free air compressor</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              [
                "Zero contamination",
                "Oil free technology delivers pure, high quality air with no risk of oil carryover into the process or the product.",
              ],
              [
                "Energy efficiency",
                "Designed for lower power consumption, with variable speed options across the DSPV and DSV ranges to match fluctuating demand.",
              ],
              [
                "Compliance and safety",
                "Meets strict air purity requirements, which matters in food, pharmaceutical and medical applications where air contacts the product.",
              ],
              [
                "Low maintenance",
                "With no compressor oil to change or dispose of, oil free machines reduce routine maintenance tasks and downtime.",
              ],
            ].map(([t, s]) => (
              <div key={t} className="bg-card border p-5">
                <p className="font-semibold text-[15px]">{t}</p>
                <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology tiles */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={3} />
          <p className="wf-kicker mb-1">Narrow it down</p>
          <h3 className="font-bold text-xl mb-5">Shop by technology</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Rotary Screw", "Continuous plant air, fixed and variable speed", "36 models"],
              ["Scroll", "Quiet, compact, small clean air demands", "16 models"],
              ["Piston", "Intermittent light duty oil free supply", "3 models"],
              ["Portable", "Oil free air for site and shutdown work", "3 models"],
            ].map(([t, s, n]) => (
              <div
                key={t}
                className="border p-5 group hover:bg-secondary transition-colors duration-150"
              >
                <ImgPh label="Technology image" className="h-20 mb-4" />
                <p className="font-semibold text-[15px]">{t}</p>
                <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{s}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">{n}</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-muted-foreground mt-4">
            Split by brand: Hitachi 36 models, Sullair 19, Bebicon 3. Variable
            speed available on 14 models.
          </p>
        </section>

        {/* Series listing */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={4} />
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="wf-kicker mb-1">Ranges in this category</p>
              <h3 className="font-bold text-xl">Compare series at a glance</h3>
            </div>
            <span className="border bg-card px-3 py-1.5 text-[13px] flex items-center gap-2">
              Sort: Power <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="border divide-y bg-card">
            {SERIES.map(([series, brand, kw, bar, use, count]) => (
              <div
                key={series}
                className="grid grid-cols-2 lg:grid-cols-[210px_90px_1fr_1fr_1fr_120px] gap-3 items-center px-4 py-4 hover:bg-secondary/60 transition-colors duration-150"
              >
                <div className="flex items-center gap-3">
                  <ImgPh label="img" className="w-14 h-11 flex-none hidden lg:block" />
                  <div>
                    <p className="font-semibold text-[14px]">{series}</p>
                    <p className="font-mono text-[10px] uppercase text-muted-foreground">{count}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">{brand}</span>
                <span className="text-[13px]">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block">Power</span>
                  {kw}
                </span>
                <span className="text-[13px]">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block">Pressure</span>
                  {bar}
                </span>
                <span className="text-[13px] hidden lg:block">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block">Best for</span>
                  {use}
                </span>
                <span className="text-center border bg-card font-medium text-[12px] py-2 col-span-2 lg:col-span-1">
                  View series
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Selection guide */}
        <section className="relative border-b grid lg:grid-cols-2 gap-8 px-4 lg:px-8 py-10 bg-card">
          <Note n={5} />
          <div>
            <p className="wf-kicker mb-1">Selection guide</p>
            <h3 className="font-bold text-xl mb-3">
              Which oil free compressor do I need?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              Start with the air quality your process requires, because that
              decides the technology before anything else. From there the flow
              at your working pressure sets the model size, and how steady your
              demand is decides whether a fixed speed or a variable speed
              machine will be cheaper to run.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mt-3">
              Site conditions finish the specification. Ambient temperature and
              available water decide between air cooled and water cooled, and
              plant room noise limits often narrow the choice further.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide mt-5 text-primary">
              Read the full buying guide <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {[
              ["Air quality", "Which class your process requires"],
              ["Flow and pressure", "L/s at working bar, not peak"],
              ["Demand profile", "Steady, or variable and better on VSD"],
              ["Site conditions", "Air or water cooling, noise limits"],
            ].map(([t, s]) => (
              <div key={t} className="border p-4 bg-secondary/40">
                <p className="font-semibold text-[13px]">{t}</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industries served */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={6} />
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="wf-kicker mb-1">Where it is used</p>
              <h3 className="font-bold text-xl">Industries that specify oil free air</h3>
            </div>
            <span className="font-mono text-[11px] underline">All industries</span>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              "Food and Beverage",
              "Life Sciences",
              "General Manufacturing",
              "Chemical and Petrochemical",
              "Power Generation",
            ].map((i) => (
              <div
                key={i}
                className="bg-card border p-4 flex items-center justify-between hover:bg-card/60 transition-colors duration-150"
              >
                <p className="font-medium text-[13px]">{i}</p>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground flex-none" />
              </div>
            ))}
          </div>
        </section>

        {/* Insights */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={7} />
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="wf-kicker mb-1">Insights</p>
              <h3 className="font-bold text-xl">Guides for this category</h3>
            </div>
            <span className="font-mono text-[11px] underline">View all insights</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              "What oil free really means for air quality standards",
              "Scroll or rotary screw, choosing for smaller clean air demands",
              "Air cooled or water cooled, what suits an Australian plant room",
            ].map((t) => (
              <div key={t} className="border">
                <ImgPh label="Article image" className="h-24" />
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">Insights</p>
                  <p className="font-medium text-[13px] leading-snug">{t}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA, centred */}
        <section className="relative border-b bg-foreground text-background px-4 py-12 text-center">
          <Note n={8} />
          <h3 className="font-bold text-2xl">
            Let us help you find the right compressor for your needs
          </h3>
          <p className="text-sm text-background/70 mt-2 max-w-md mx-auto">
            Send us your air demand, working pressure and application and our
            engineers will size it for you.
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
        <section className="relative px-4 lg:px-8 py-10 bg-card">
          <Note n={9} />
          <p className="wf-kicker mb-1">FAQs</p>
          <h3 className="font-bold text-xl mb-5">Oil free air compressor questions</h3>
          <div className="border divide-y max-w-3xl">
            {[
              "What is the difference between oil free and oil flooded compressors?",
              "Do oil free compressors still need scheduled servicing?",
              "Which oil free technology suits a small clean air demand?",
              "Can an oil free compressor be monitored remotely?",
            ].map((q, i) => (
              <div key={q} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className={`text-[14px] ${i === 0 ? "font-semibold" : "font-medium"}`}>{q}</p>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground flex-none ${i === 0 ? "rotate-180" : ""}`}
                  />
                </div>
                {i === 0 && (
                  <p className="text-[13px] text-muted-foreground mt-3 leading-relaxed max-w-2xl">
                    An oil flooded machine injects oil into the compression
                    chamber for sealing and cooling, so the air needs filtration
                    afterwards. An oil free machine compresses without oil in
                    that chamber, which removes the risk of oil carryover into
                    the process entirely.
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-muted-foreground mt-2">
            FAQPage schema markup for rich results.
          </p>
        </section>

        <Note n={10} />
        <WfFooter />
      </div>
    </KitShell>
  );
}
