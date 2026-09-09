/*
 * STYLE: Blueprint Studio wireframe (ideas.md)
 * 04 / Brand page template. Example brand: Sullair. Grayscale, radius 0.
 * Global header and footer unchanged (branding only on the page body, never chrome).
 * Order: content, Insights, Final CTA (centred), Newsletter (global), Footer.
 * COPY: real English, influenced by hitachiglobalairpower.au. No em dashes.
 * DATA: real figures from ProductList-Marketing.xlsx (74 Sullair models, 91 SKUs, 18 series).
 * BUILD: taxonomy-product_brand.html, ACF Pro term fields, dynamic catalogue
 * blocks and a core Query Loop for related Insights.
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
import { ArrowRight, Award, ChevronRight, Globe, ShieldCheck } from "lucide-react";

const NOTES: NoteDef[] = [
  {
    n: 1,
    title: "Brand taxonomy template and hero",
    body: "Build once as taxonomy-product_brand.html. The current brand term supplies ACF fields brand_logo, brand_headline, brand_intro and a proof_points repeater to a server rendered hero block. The global header, footer and CTA colours remain locked; brand personality appears in the page body only.",
  },
  {
    n: 2,
    title: "Why buy the brand through HGAP",
    body: "Narrative comes from ACF term fields. The model, SKU and series figures are calculated from Product posts assigned to the current product_brand term, rather than typed by an editor, so they stay current as the catalogue changes.",
  },
  {
    n: 3,
    title: "Ranges by series, dynamic query block",
    body: "A server rendered block queries Product posts for the current product_brand term and groups them by product_series. Each tile links into the shared ACF Product Filter block with brand and series parameters already in the URL. Counts are calculated from the catalogue, not maintained in page copy.",
  },
  {
    n: 4,
    title: "Signature technology block",
    body: "A controlled ACF Block reads technology_heading, technology_copy and technology_media from the current Brand term. For Sullair it tells the airend and capacity control story. One block template serves every brand while the content remains term specific.",
  },
  {
    n: 5,
    title: "Service and parts proof",
    body: "Brand level service reassurance using the network figures published on the live site. Genuine parts, factory trained technicians and the branch network are the strongest brand page conversion levers in this category.",
  },
  {
    n: 6,
    title: "Cross brand navigation",
    body: "A small dynamic term navigation block lists the other four product_brand terms automatically, so users stay inside the catalogue and editors do not maintain sibling links manually.",
  },
  {
    n: 7,
    title: "Insights before the final CTA",
    body: "A core Query Loop returns Insights assigned to the current product_brand term. The post template is registered once and the feed remains automatic. Order stays Insights, final CTA, newsletter and footer.",
  },
  {
    n: 8,
    title: "Final CTA, centred",
    body: "Standard centred conversion block, identical on every template. Request a Quote is always the primary CTA.",
  },
];

const SERIES = [
  {
    name: "ShopTek Series",
    desc: "Workshop and light industrial oil flooded screw. Belt and direct gear drive.",
    spec: "4 to 75 kW, 8 to 10 bar",
    count: "12 models",
  },
  {
    name: "TS Two Stage Series",
    desc: "Two stage oil flooded screw for large plant air, four pressure variants per model.",
    spec: "150 to 355 kW, 7 to 13 bar",
    count: "4 models, 16 SKUs",
  },
  {
    name: "DS Oil Free Series",
    desc: "Oil free rotary screw, air cooled and water cooled, fixed and variable speed.",
    spec: "55 and 75 kW, 8.5 to 10.3 bar",
    count: "16 models",
  },
  {
    name: "Portable Diesel Range",
    desc: "Towable fleet on Caterpillar and Cummins engines, AirLinx ready across the range.",
    spec: "44 to 522 kW, 7 to 34.5 bar",
    count: "33 models",
  },
  {
    name: "OFE and OFD 1550",
    desc: "Oil free portable screw for contamination sensitive site work.",
    spec: "298 and 403 kW, 10 bar",
    count: "2 models",
  },
  {
    name: "OEM Airends",
    desc: "Bare airend supply for original equipment manufacturers and rebuild programs.",
    spec: "7 to 34 bar, to 1,274 L/s",
    count: "8 models",
  },
];

export default function BrandPage() {
  return (
    <KitShell page="brand" notes={NOTES}>
      <SheetTitle
        code="Template 04 / Brand page, /brands/sullair/"
        title="Brand Page"
        desc="Desktop wireframe using Sullair as the worked example with real catalogue data. The same structure serves the Hitachi, Champion, Bebicon and Air-One brand pages."
      />

      <div className="wf-sheet overflow-hidden">
        <WfGlobalHeader active="All Products" />

        {/* Breadcrumb */}
        <div className="border-b px-4 lg:px-8 py-3 bg-secondary/60">
          <p className="font-mono text-[11px] text-muted-foreground" data-no-lorem>
            Home <ChevronRight className="inline w-3 h-3" /> Brands{" "}
            <ChevronRight className="inline w-3 h-3" />{" "}
            <span className="text-foreground font-medium">Sullair</span>
          </p>
        </div>

        {/* Brand hero */}
        <section className="relative grid lg:grid-cols-2 border-b bg-card">
          <Note n={1} />
          <div className="px-4 lg:px-8 py-12 flex flex-col justify-center">
            <ImgPh label="Sullair brand logo" className="h-12 w-44 mb-5" />
            <h2 className="font-bold text-3xl leading-tight max-w-md">
              Durable, dependable air power since 1965
            </h2>
            <p className="text-sm text-muted-foreground mt-4 max-w-md leading-relaxed">
              Sullair rotary screw compressors are built around one of the most
              proven airends in the industry. In Australia the range is supplied
              and supported by Hitachi Global Air Power, with 74 models across
              stationary, portable and OEM airend applications.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <span className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-3.5">
                Browse the Sullair range
              </span>
              <span className="border font-medium text-sm px-6 py-3.5">
                Request a Quote
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-8 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Airends since 1965
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Genuine parts and warranty
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> A Hitachi Group brand
              </span>
            </div>
          </div>
          <ImgPh label="Brand hero image, flagship Sullair compressor" className="min-h-72" />
        </section>

        {/* Why buy through HGAP */}
        <section className="relative border-b grid lg:grid-cols-2 gap-8 px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={2} />
          <div>
            <p className="wf-kicker mb-1">Why Sullair through Hitachi Global Air Power</p>
            <h3 className="font-bold text-xl mb-3">
              Engineered for Australian conditions, supported locally
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              Every Sullair machine sold in Australia is specified for local
              duty cycles, ambient temperatures and site conditions. Over 40
              service staff across 22 locations keep the fleet running, with
              genuine parts held in country and factory trained technicians
              carrying out commissioning, servicing and airend exchange.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mt-3">
              The result is straightforward. You buy the airend on its
              reputation, and you keep it running on a service network that is
              close to the machine.
            </p>
          </div>
          <div className="grid grid-cols-3 border divide-x bg-card text-center self-center">
            {[
              ["74", "models in the AU range"],
              ["18", "series available"],
              ["45", "AirLinx ready models"],
            ].map(([v, l]) => (
              <div key={l} className="py-6">
                <p className="font-bold text-2xl">{v}</p>
                <p className="font-mono text-[10px] uppercase text-muted-foreground mt-1">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ranges by series */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={3} />
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="wf-kicker mb-1">The range</p>
              <h3 className="font-bold text-xl">Sullair series available in Australia</h3>
            </div>
            <span className="font-mono text-[11px] underline">All 74 Sullair models</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERIES.map((s) => (
              <div key={s.name} className="border group hover:bg-secondary transition-colors duration-150">
                <ImgPh label="Series image" className="h-28" />
                <div className="p-4">
                  <p className="font-semibold text-[15px]">{s.name}</p>
                  <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
                  <p className="font-mono text-[11px] mt-2">{s.spec}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">{s.count}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-primary">
                      View series <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-muted-foreground mt-4">
            Split by application: 33 stationary, 33 portable, 8 OEM airends.
          </p>
        </section>

        {/* Technology highlight */}
        <section className="relative border-b grid lg:grid-cols-2 bg-foreground text-background">
          <Note n={4} />
          <ImgPh label="Airend cutaway image" className="min-h-64 !bg-white/10 !border-white/25" />
          <div className="px-4 lg:px-8 py-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-background/60 mb-2">
              Signature technology
            </p>
            <h3 className="font-bold text-2xl max-w-sm">
              The Sullair airend, built to run for decades
            </h3>
            <p className="text-sm text-background/70 mt-3 max-w-md leading-relaxed">
              Low speed, direct drive rotors and a generously sized bearing
              package are why these machines hold their efficiency over long
              service lives. Across the Australian range that engineering is
              matched to the right capacity control for the duty, from simple
              load and unload through to variable speed and spiral valve.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm">
              {[
                ["6 control types", "matched to duty cycle"],
                ["Air, water, fluid", "cooling options"],
              ].map(([v, l]) => (
                <div key={l} className="border border-white/25 p-4">
                  <p className="font-semibold text-[14px]">{v}</p>
                  <p className="font-mono text-[10px] uppercase text-background/60 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service and parts proof */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={5} />
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-center">
            <div>
              <p className="wf-kicker mb-1">Service and parts</p>
              <h3 className="font-bold text-xl mb-3">
                Genuine Sullair parts and factory trained support
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Genuine parts protect the warranty and the airend. Service care
                plans cover scheduled maintenance, and the airend rebuild and
                service exchange program returns a machine to specification
                without the lead time of a new unit. Book a service through any
                branch, or talk to the team about a plan that suits the site.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <span className="border bg-card font-medium text-sm px-5 py-3">
                  Book a service
                </span>
                <span className="border bg-card font-medium text-sm px-5 py-3">
                  Compressor spare parts
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 border divide-x divide-y bg-card text-center">
              {[
                ["22", "locations"],
                ["40+", "service staff"],
                ["Genuine", "parts only"],
                ["Rebuild", "and exchange"],
              ].map(([v, l]) => (
                <div key={l} className="py-5">
                  <p className="font-bold text-lg">{v}</p>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-brand explore */}
        <section className="relative border-b bg-card">
          <Note n={6} />
          <div className="px-4 lg:px-8 pt-8 pb-2">
            <p className="wf-kicker mb-1">Our brands</p>
            <h3 className="font-bold text-xl">Explore the rest of the portfolio</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-x">
            {[
              ["Hitachi", "Oil free screw and scroll technology"],
              ["Champion", "Workshop and light industrial compressors"],
              ["Bebicon", "Oil free piston compressors"],
              ["Air-One", "Compact entry level air supply"],
            ].map(([b, s]) => (
              <div
                key={b}
                className="flex items-center gap-3 p-6 hover:bg-secondary transition-colors duration-150"
              >
                <ImgPh label={`${b} logo`} className="w-20 h-9 flex-none" />
                <div className="flex-1">
                  <p className="font-semibold text-[14px]">{b}</p>
                  <p className="text-[12px] text-muted-foreground leading-snug">{s}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-none" />
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
              <h3 className="font-bold text-xl">Sullair guides and technical articles</h3>
            </div>
            <span className="font-mono text-[11px] underline">View all insights</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              "How to safeguard your air supply with the upgraded 375-425 series",
              "Fixed speed or variable speed, how to choose for your duty cycle",
              "What the airend rebuild and service exchange program covers",
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
        <section className="relative bg-foreground text-background px-4 py-12 text-center">
          <Note n={8} />
          <h3 className="font-bold text-2xl">
            Let us help you find the right Sullair for your needs
          </h3>
          <p className="text-sm text-background/70 mt-2 max-w-md mx-auto">
            Talk to our engineers about sizing, energy use and the best capacity
            control for your duty cycle.
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

        <WfFooter />
      </div>
    </KitShell>
  );
}
